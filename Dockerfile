# Import necessary software
FROM node:12.14.1

# Create and set working directory for our source code
RUN mkdir /frontend
WORKDIR /frontend

# Install necessary packages.
COPY . /frontend
RUN ls

RUN npm install 
RUN npm install react-scripts


