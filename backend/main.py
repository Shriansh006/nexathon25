from os import getenv, makedirs, path
from pathlib import Path
from shutil import rmtree

from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, HTTPException, UploadFile
from fastapi.staticfiles import StaticFiles

from utils import export_notebook_as_html

load_dotenv()

app = FastAPI()

OUTPUT_DIR = Path(getenv("DATA_DIR", "data/renders"))
PUBLIC_URL = getenv("PUBLIC_URL", "http://localhost:8000")
if not path.isdir(OUTPUT_DIR):
    makedirs(OUTPUT_DIR)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.put("/render/{book_id}")
async def render(book_id: str, file: UploadFile, background_tasks: BackgroundTasks):
    contents = await file.read()
    if path.isdir(OUTPUT_DIR / book_id):
        rmtree(OUTPUT_DIR / book_id)
    makedirs(OUTPUT_DIR / book_id)
    if not file.filename:
        raise HTTPException(status_code=400, detail="Invalid file name")
    name, _ = path.splitext(file.filename)
    filename = name + ".html"
    background_tasks.add_task(
        export_notebook_as_html, contents, filename, OUTPUT_DIR / book_id
    )
    return {
        "message": "File uploaded successfully",
        "id": book_id,
        "url": f"{PUBLIC_URL}/static/{book_id}/{filename}",
    }


app.mount("/static", StaticFiles(directory="data/renders"), name="static")
