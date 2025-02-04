npx http-server ./public -o -p 9999 &
poetry run fastapi dev backend/main.py --port 9998 -C backend &
& ngrok start --all
