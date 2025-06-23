
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

app = FastAPI(title="YouTube Downloader API", version="1.0.0")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create downloads directory
downloads_dir = Path("downloads")
downloads_dir.mkdir(exist_ok=True)

# Serve static files for downloads
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")

class DownloadRequest(BaseModel):
    url: str

@app.post("/download")
async def download_video(request: DownloadRequest):
    """Download YouTube video and return download URL"""
    try:
        # Validate URL
        if not request.url or "youtube" not in request.url:
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())
        filename = f"{unique_id}.mp4"
        filepath = downloads_dir / filename
        
        # Download using yt-dlp with best quality MP4
        cmd = [
            "yt-dlp",
            "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
            "-o", str(filepath),
            "--no-playlist",
            "--extract-flat", "false",
            request.url
        ]
        
        # Run download with timeout
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        try:
            stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=60.0)
        except asyncio.TimeoutError:
            process.kill()
            raise HTTPException(status_code=408, detail="Download timeout after 60 seconds")
        
        if process.returncode != 0:
            error_msg = stderr.decode() if stderr else "Download failed"
            raise HTTPException(status_code=400, detail=f"Download failed: {error_msg}")
        
        # Check if file exists
        if not filepath.exists():
            raise HTTPException(status_code=500, detail="File was not created")
        
        # Schedule file deletion after 1 hour
        asyncio.create_task(delete_file_after_delay(filepath, 3600))
        
        # Return download URL
        download_url = f"/downloads/{filename}"
        return {"downloadUrl": download_url, "filename": filename}
        
    except HTTPException:
        raise
    except Exception as e:
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

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "YouTube Downloader API is running"}

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "YouTube Downloader API",
        "version": "1.0.0",
        "endpoints": {
            "download": "POST /download - Download YouTube video",
            "health": "GET /health - Health check"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
