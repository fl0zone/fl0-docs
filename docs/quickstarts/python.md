---
---

# Python

Deploying a Python web service on FL0 is straightforward - most Python packaging tools are supported, and all web-frameworks are supported.
FL0 has built-in language support for Python, so you don't need to provide a Dockerfile, but if you have one already you can [skip to the relevant section](#dockerfile).
## Listening to the Right Port

The most common ASGI/WSGI tools are supported natively by FL0, you need only provide a `procfile` in the root of your directory that defines the correct configuration for your ASGI/WSGI tool.
FL0 injects an environment variable called `PORT` into your application's container. Your app must listen on this port. Below are some examples of how to do this for a number of common frameworks and

## Supported Build Tools
We currently support plain Pip, Conda, Pipenv, and Poetry.

## Template Repo
A working template repo using FastAPI and Uvicorn that you can use directly from FL0 can be found [here](https://github.com/fl0zone/template-python-fastapi)

### FastAPI / Starlette / etc
For web-frameworks that automatically hook into an ASGI provider (such as Uvicorn), to configure your application, you need to provide a file in the root of your directory called `procfile` that defines your ASGI startup details.
For example, if you wish to use Uvicorn, your `procfile` might look like this:
`web: uvicorn main:app --proxy-headers --host=0.0.0.0 --port=${PORT}`
Refer to your web-frameworks documentation for

### Flask / etc
If you are using these web-frameworks with Gunicorn as your WSGI provider, the setup is even easier, your `procfile` will simply be:
```
web: gunicorn server:app
```
Along with any other Gunicorn configs you wish to pass.


## ASGI Option considerations
FL0 currently performs TLS termination for you, so you will need to add the
``--proxy-headers` flag, for example:

```Dockerfile
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", $PORT]

```
for docker and
```
web: uvicorn main:app --proxy-headers ...
```
for the procfile.

## Dockerfile

Instead of relying on FL0's built-in language support you can provide your own Dockerfile in the root of your repository. FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below is an example Dockerfile based off a Python application using FastAPI and Poetry:
```Dockerfile
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

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]
```

## Specifying your Python version
Depending on your package management tool, FL0 will auto-detect the version of Python you are using. MiniConda, Poetry and Pipenv allow you to set the Python version in their respective config-files, these configs will be automatically detected and used.
