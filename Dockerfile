FROM node:10

WORKDIR /home/node/app

ADD src ./src
ADD package.json .

RUN npm install

RUN pwd
RUN ls -la
EXPOSE 3082

CMD ["npm", "start"]