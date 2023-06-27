#!/bin/sh

esbuild --bundle ./styles/style.css --outfile=style.min.css --minify --watch