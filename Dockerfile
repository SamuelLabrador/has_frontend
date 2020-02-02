# Import necessary software
FROM node:13.7.0

# Create and set working directory for our source code
RUN mkdir /code
WORKDIR /code

# Add node modules to path
ENV PATH /app/node-modules/.bin:$PATH

# Install necessary packages.
RUN npm install --silent
RUN npm install react
COPY . /code/