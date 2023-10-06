---
---

# Python

Deploying a Python web service on FL0 is straightforward - most Python packaging tools are supported, and all web-frameworks are supported.
FL0 has built-in language support for Python, so you don't need to provide a Dockerfile.

## Listening to the Right Port

The most common ASGI/WSGI tools are supported natively by FL0, you need only provide a `Procfile` in the root of your directory that defines the correct configuration for your ASGI/WSGI tool.
FL0 injects an environment variable called `PORT` into your application's container. Your app must listen on this port. Below are some examples of how to do this for a number of common frameworks and

## Supported Build Tools

We currently support plain Pip, Conda, Pipenv, and Poetry.

## Template Repo

A working template repo using FastAPI and Uvicorn that you can use directly from FL0 can be found [here](https://github.com/fl0zone/template-python-fastapi)

### FastAPI / Starlette / etc

For web-frameworks that automatically hook into an ASGI provider (such as Uvicorn), to configure your application, you need to provide a file in the root of your directory called `Procfile` that defines your ASGI startup details.
For example, if you wish to use Uvicorn, your `Procfile` might look like this:
`web: uvicorn main:app --proxy-headers --host=0.0.0.0 --port=${PORT}`
Refer to your web-frameworks documentation for

### Flask / etc

If you are using these web-frameworks with Gunicorn as your WSGI provider, the setup is even easier, your `Procfile` will simply be:

```
web: gunicorn server:app
```

Along with any other Gunicorn configs you wish to pass.

## ASGI Option considerations

FL0 currently performs TLS termination for you, so you will need to add the
``--proxy-headers` flag to your Procfile:

```
web: uvicorn main:app --proxy-headers ...
```

## Specifying your Python version

Depending on your package management tool, FL0 will auto-detect the version of Python you are using. MiniConda, Poetry and Pipenv allow you to set the Python version in their respective config-files, these configs will be automatically detected and used.
