---
---

# Ruby

Deploying your Ruby app on FL0 is easy. Follow this guide to configure your codebase correctly.

## Built-in Language Support

You can build and deploy a Ruby application without a Dockerfile using FL0's built-in automatic builds.

### Specifying a Ruby Version

FL0's build system will attempt to automatically detect the correct version of Ruby to install. We support the following versions of Ruby:
1. 3.2.2
2. 3.2.1
3. 3.1.4
4. 3.1.3
5. 3.0.6
6. 3.0.5

## Listening to the Right Port

FL0 injects an environment variable called `PORT` into your application's container. Your app must listen on this port.

### Rails

```config/puma.rb
# Specifies the `port` that Puma will listen on to receive requests; default is 3000.
port ENV.fetch("PORT") { ENV['PORT'] }
```

## Setting the Production Master Key

### Rails

To create credentials for your production environment, run the following command in terminal:

```
EDITOR="mate --wait" bin/rails credentials:edit
```
This will generate the following files:
1. `config/cretentials.yml.enc`; and
2. `config/master.key`

Add the key `RAILS_MASTER_KEY` as an Environment Variable in FL0, with the content of your `master.key` file as its corresponding value.

## Dockerfile Support

Instead of relying on FL0's [built-in language support](#built-in-language-support) you can provide your own Dockerfile in the root of your repository. FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below is an example of a Dockerfile designed to work well locally and on FL0. 

### Ruby
Add the following to a Dockerfile in the root of your app:
```
FROM ruby:3.2.2

RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD ["./your-daemon-or-script.rb"]
```
To build and run the Ruby image, run:
```
$ docker build -t my-ruby-app .
$ docker run -it --name my-running-script my-ruby-app
```
To add a `Gemfile.lock` file in your app directory (required for the above Dockerfile), run the following in the root of your app:
```
$ docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:3.0 bundle install
```

### Rails
Add the following to a Dockerfile in the root of your app:
```
# Use the official Ruby image with version 3.2.2 as the base image
FROM ruby:3.2.2

# Set an environment variable for Rails to run in production mode
ENV RAILS_ENV production

# Install essential dependencies
RUN apt-get update -qq && apt-get install -y nodejs npm

# Set up the working directory in the container
WORKDIR /app

# Install Rails dependencies first to leverage Docker cache
COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v '2.2.22' && bundle install --jobs 4

# Copy the rest of the application's code to the container
COPY . .

# Precompile assets
RUN bundle exec rake assets:precompile

# Expose the port your Rails app will listen on (assuming it's 3000)
EXPOSE 3000
EXPOSE $PORT

# Start the Rails server when the container is run
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "$PORT"]
```
To build and run the Docker container, run:
```
# Build the Docker image (don't forget the dot at the end)
docker build -t your_app_image .

# Run the Docker container, mapping the desired port to the PORT environment variable
docker run -d -p 3000:8080 -e PORT=8080 your_app_image
```
