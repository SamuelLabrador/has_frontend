# Import necessary software
FROM node:12.14.1

# Create and set working directory for our source code
RUN mkdir /frontend
WORKDIR /frontend/

# Add node modules to path
ENV PATH /frontend/node-modules/.bin:$PATH

# Install necessary packages.
RUN npm install --silent
RUN npm install react --silent

COPY . /frontend