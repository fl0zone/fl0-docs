---
title: Python
---

# Python

Below is an example Dockerfile based off a Python application using FastAPI and Poetry.

:::info
Keep in mind you'll need to alter this to work with your specific file structure.
Exposed Port must match PORT variable defined in enviroment varibles, here it's 8080.
:::

```bash title="/Dockerfile"
FROM python:3.9 as requirements-stage
WORKDIR /tmp
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.11
WORKDIR /code
COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8080"]
```
