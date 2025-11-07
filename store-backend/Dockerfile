FROM python:3.12-slim AS base

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

ENV PATH="/root/.local/bin:$PATH"
COPY ./pyproject.toml /app/pyproject.toml
COPY ./poetry.lock /app/poetry.lock

RUN poetry install --no-root

FROM base AS local_development_base
COPY ./alembic.ini /app/alembic.ini
COPY ./alembic /app/alembic
COPY ./src /app/src

#FROM local_development_base AS makemigration
#CMD ["sh", "-c", "poetry run alembic revision --autogenerate -m 'First Migration' && poetry run alembic upgrade head"]

FROM local_development_base AS migration
CMD ["sh", "-c", "poetry run alembic upgrade head"]

FROM local_development_base AS dev
CMD ["poetry", "run", "sh", "-c", "uvicorn src.main:app --reload --host 0.0.0.0"]

