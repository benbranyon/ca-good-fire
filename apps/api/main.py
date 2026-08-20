from fastapi import FastAPI

app = FastAPI(title="fire-api")


@app.get("/health")
def health():
    return {"status": "ok"}
