FROM node 

WORKDIR /mist_frontend 

COPY package.json . 
RUN npm i 
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]