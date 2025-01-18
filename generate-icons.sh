#!/usr/bin/env sh

set -ex

inkscape -w 16 -h 16 public/favicon.svg --export-filename=public/icons/icon-16.png
inkscape -w 32 -h 32 public/favicon.svg --export-filename=public/icons/icon-32.png
inkscape -w 48 -h 48 public/favicon.svg --export-filename=public/icons/icon-48.png
inkscape -w 120 -h 120 public/favicon.svg --export-filename=public/icons/icon-120.png
inkscape -w 152 -h 152 public/favicon.svg --export-filename=public/icons/icon-152.png
inkscape -w 180 -h 180 public/favicon.svg --export-filename=public/icons/icon-180.png
inkscape -w 192 -h 192 public/favicon.svg --export-filename=public/icons/icon-192.png
inkscape -w 512 -h 512 public/favicon.svg --export-filename=public/icons/icon-512.png
