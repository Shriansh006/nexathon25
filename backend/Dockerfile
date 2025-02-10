FROM manimcommunity/manim:stable

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

USER root
# Copy the project into the image
ADD . /app

# Sync the project into a new environment, using the frozen lockfile
WORKDIR /app

RUN uv sync --frozen

RUN uv pip install jupyter

ENV PATH="/app/.venv/bin:$PATH"

CMD ["fastapi", "run", "main.py", "--port", "8000"]
