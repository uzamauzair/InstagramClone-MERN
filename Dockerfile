FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

RUN mkdir -p /usr/src/app/client
COPY client/package*.json /usr/src/app/client/
RUN cd /usr/src/app/client/ && \
    npm install

COPY . /usr/src/app/

RUN cd /usr/src/app/client/ && \
    npm run build

ENV NODE_ENV=production
ENV PORT=8080

ARG SENDGRID_API
ENV SENDGRID_API=$SENDGRID_API
ARG JWT_SEC
ENV JWT_SEC=$JWT_SEC
ENV EMAIL=usama19026@gmail.com
ARG MONGOURI
ENV MONGOURI=$MONGOURI

EXPOSE 8080

CMD ["npm", "start"]