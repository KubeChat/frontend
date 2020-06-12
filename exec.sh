#!/usr/bin/env bash

docker build -t kubechat .
docker run -p 3000:3000 --init kubechat