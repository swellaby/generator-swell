FROM alpine:3.3

RUN apk add --update nodejs &&\
    rm -rf /go /var/cache/apk/* &&\
    mkdir /app

ADD . /app

WORKDIR /app

CMD npm start