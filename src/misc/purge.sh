#!/bin/bash

DirSrc="../assets/vendor/css"
DirDst="build/css"
mkdir -p $DirDst

purgecss \
--css $DirSrc/bootstrap.min.css $DirSrc/font-awesome.min.css \
--content ../*.html \
--output $DirDst
