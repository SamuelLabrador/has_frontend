FROM node:12.14.1

RUN mkdir /frontend/src -p -v
WORKDIR /frontend

COPY . /frontend

RUN npm install
RUN npm install react-scripts react
RUN ls