Deploying a Python web service on FL0 is straightforward, as it supports most Python packaging tools and all web frameworks natively. Here are the essential details and steps you need to follow to set up your application on FL0.

## Listening to the Right Port

FL0 supports common ASGI/WSGI tools natively. You need to provide a `Procfile` in the root directory of your project to define the correct configuration for your ASGI/WSGI tool. FL0 injects an environment variable called `PORT` into your application's container, and your app must listen on this port. Below are examples for different frameworks.

## Supported Build Tools

FL0 supports the following build tools:
- Pip
- Conda
- Pipenv
- Poetry

## Template Repository

A working template repository using FastAPI and Uvicorn is available [here](https://github.com/fl0zone/template-python-fastapi). You can use this template directly on FL0.

### FastAPI / Starlette / etc.

For web frameworks that automatically hook into an ASGI provider (such as Uvicorn), you need to provide a `Procfile` in the root directory of your project to define your ASGI startup details. For example, if you wish to use Uvicorn, your `Procfile` might look like this:

```
web: uvicorn main:app --proxy-headers --host=0.0.0.0 --port=${PORT}
```

Refer to your web framework's documentation for additional configuration details.

### Flask / etc.

For web frameworks using Gunicorn as the WSGI provider, your `Procfile` will be even simpler:

```
web: gunicorn server:app
```

You can also pass any other Gunicorn configurations you need.

## ASGI Option Considerations

FL0 performs TLS termination for you, so you will need to add the `--proxy-headers` flag to your `Procfile`:

```
web: uvicorn main:app --proxy-headers ...
```

## Specifying Your Python Version

FL0 auto-detects the version of Python you are using based on your package management tool. MiniConda, Poetry, and Pipenv allow you to set the Python version in their respective configuration files, and these configurations will be automatically detected and used by FL0.
