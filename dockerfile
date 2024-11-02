FROM node:22.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

ENV PORT=${PORT}

EXPOSE 3306

CMD ["npm", "run", "dev"]
