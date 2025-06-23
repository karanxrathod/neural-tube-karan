
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import subprocess
import uuid
import os
import asyncio
from pathlib import Path
import time

app = FastAPI(title="YouTube Downloader API", version="1.0.0")

# Configure CORS - Allow all origins for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Include OPTIONS for preflight
    allow_headers=["*"],
)

# Create downloads directory
downloads_dir = Path("downloads")
downloads_dir.mkdir(exist_ok=True)

# Serve static files for downloads
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")

class DownloadRequest(BaseModel):
    url: str

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "YouTube Downloader API is running!",
        "version": "1.0.0",
        "status": "healthy",
        "endpoints": {
            "download": "POST /download - Download YouTube video",
            "health": "GET /health - Health check"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "YouTube Downloader API is running"}

@app.post("/download")
async def download_video(request: DownloadRequest):
    """Download YouTube video and return download URL"""
    try:
        # Validate URL
        if not request.url or ("youtube.com" not in request.url and "youtu.be" not in request.url):
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())
        filename = f"youtube_video_{unique_id}.%(ext)s"
        output_path = downloads_dir / filename
        
        # Download using yt-dlp with best quality MP4
        cmd = [
            "yt-dlp",
            "-f", "best[ext=mp4]/best",
            "-o", str(output_path),
            "--no-playlist",
            "--extract-flat", "false",
            "--max-filesize", "100m",  # Limit file size to 100MB
            request.url
        ]
        
        print(f"Starting download with command: {' '.join(cmd)}")
        
        # Run download with timeout
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        try:
            stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=120.0)
        except asyncio.TimeoutError:
            process.kill()
            raise HTTPException(status_code=408, detail="Download timeout after 2 minutes")
        
        if process.returncode != 0:
            error_msg = stderr.decode() if stderr else "Download failed"
            print(f"yt-dlp error: {error_msg}")
            raise HTTPException(status_code=400, detail=f"Download failed: {error_msg}")
        
        # Find the downloaded file (yt-dlp may change the extension)
        downloaded_files = list(downloads_dir.glob(f"youtube_video_{unique_id}.*"))
        if not downloaded_files:
            raise HTTPException(status_code=500, detail="Downloaded file not found")
        
        actual_file = downloaded_files[0]
        final_filename = f"youtube_video_{unique_id}.mp4"
        final_path = downloads_dir / final_filename
        
        # Rename to .mp4 if needed
        if actual_file != final_path:
            actual_file.rename(final_path)
        
        print(f"File downloaded successfully: {final_path}")
        
        # Schedule file deletion after 1 hour
        asyncio.create_task(delete_file_after_delay(final_path, 3600))
        
        # Return download URL
        download_url = f"/downloads/{final_filename}"
        return {"downloadUrl": download_url, "filename": final_filename}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

async def delete_file_after_delay(filepath: Path, delay: int):
    """Delete file after specified delay in seconds"""
    await asyncio.sleep(delay)
    try:
        if filepath.exists():
            filepath.unlink()
            print(f"Deleted file: {filepath}")
    except Exception as e:
        print(f"Error deleting file {filepath}: {e}")

# Clean up old files on startup
@app.on_event("startup")
async def startup_event():
    """Clean up old files on startup"""
    try:
        current_time = time.time()
        for file_path in downloads_dir.glob("*"):
            if file_path.is_file():
                file_age = current_time - file_path.stat().st_mtime
                if file_age > 3600:  # Delete files older than 1 hour
                    file_path.unlink()
                    print(f"Cleaned up old file: {file_path}")
    except Exception as e:
        print(f"Error during startup cleanup: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
