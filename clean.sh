#!/bin/bash

rm -rf ./contracts/*
rm -rf ./deploy/*
rm -rf ./scripts/*
rm -rf ./tasks/api-consumer
rm -rf ./tasks/keepers
rm -rf ./tasks/price-consumer
rm -rf ./tasks/random-number-consumer
rm -f ./tasks/withdraw-link.ts
head -3 tasks/index.ts >> tasks/index.ts
rm -f ./test/staging/*
rm -f ./test/unit/*
rm -f clean.sh