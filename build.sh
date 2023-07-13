#!/bin/bash

if [ "$#" -ne 5 ]; then
    echo "Usage: $0 <AWS_ACCESS_KEY_ID> <AWS_SECRET_ACCESS_KEY> <DB_HOST> <DB_USER> <DB_PASSWORD>"
    exit 1
fi

AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2
DB_HOST=$3
DB_USER=$4
DB_PASSWORD=$5

docker build -t db-connector .

docker run -p 1337:1337 -d -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} -e DB_HOST=${DB_HOST} -e DB_USER=${DB_USER} -e DB_PASSWORD=${DB_PASSWORD} --name connector db-connector
