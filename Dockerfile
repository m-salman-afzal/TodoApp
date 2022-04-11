FROM node:16.14.0

WORKDIR /TodoApi
COPY package*.json ./
RUN npm install
COPY . .
CMD ["tail","-f","/dev/null"]