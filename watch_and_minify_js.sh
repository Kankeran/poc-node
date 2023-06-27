#!/bin/sh

# esbuild --bundle ./scripts/dest/main.js --outfile=main.min.js --minify --watch
esbuild --bundle ./scripts/dest/main.js --outfile=main.min.js --watch