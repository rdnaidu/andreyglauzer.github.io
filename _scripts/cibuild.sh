#!/bin/bash

if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

set -e

rm -rf _site
mkdir _site

$DATA = 'date +%d/%m/%Y'


git clone https://${GH_TOKEN}@github.com/andreyglauzer/andreyglauzer.github.io.git --branch master _site

bundle exec jekyll build

cd _site
git config --global user.email "nglauzer@gmail.com"
git config --global user.name "Andrey Glauzer"
git add -A
git commit -m "Commit feito pelo Travis #$TRAVIS_BUILD_NUMBER em $DATA"
git push origin master --force
