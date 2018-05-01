#!/usr/bin/env bash
TIMESTAMP=$(date +%s)
echo $TIMESTAMP

mkdir -p ./migrations
touch ./migrations/$TIMESTAMP.$1.js