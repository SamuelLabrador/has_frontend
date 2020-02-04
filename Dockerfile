# Import necessary software
FROM node:12.14.1

# Create and set working directory for our source code
RUN mkdir /frontend/src -p -v
WORKDIR /frontend

# COPY all files to working directory
COPY . .

# Install necessary packages
RUN npm install 
RUN npm install react-scripts react



