#!/bin/bash

echo "‣ Deploying updates"

echo "‣ Cloning Theme"
git clone https://github.com/jnjosh/internet-weblog.git themes/internet-weblog

echo "‣ Building Output"
hugo -t internet-weblog
