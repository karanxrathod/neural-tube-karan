
# YouTube Downloader Backend

This FastAPI backend provides YouTube video download functionality using yt-dlp.

## Features

- Download YouTube videos in MP4 format
- CORS enabled for frontend integration
- Automatic file cleanup after 1 hour
- 60-second download timeout
- Health check endpoint

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Install yt-dlp system dependencies:
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# macOS
brew install ffmpeg
```

3. Run the server:
```bash
python main.py
# or
uvicorn main:app --reload
```

## Deployment Options

### Railway (Recommended)
1. Connect your GitHub repo to Railway
2. Railway will auto-detect the Dockerfile
3. Set environment variables if needed
4. Deploy automatically

### Heroku
1. Install Heroku CLI
2. Create new app:
```bash
heroku create your-app-name
```

3. Add buildpacks:
```bash
heroku buildpacks:add heroku/python
heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
```

4. Deploy:
```bash
git push heroku main
```

### Docker
```bash
docker build -t youtube-downloader .
docker run -p 8000:8000 youtube-downloader
```

## API Endpoints

- `POST /download` - Download YouTube video
- `GET /health` - Health check
- `GET /downloads/{filename}` - Serve downloaded files

## Frontend Integration

Update your frontend environment variable:
```env
REACT_APP_API_URL=https://your-deployed-backend-url.com
```

## Security Notes

- Configure CORS origins for production
- Add rate limiting for production use
- Consider authentication for sensitive deployments
- Files are automatically deleted after 1 hour
