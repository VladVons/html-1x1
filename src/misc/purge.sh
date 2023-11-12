#!/bin/bash

DirSrc="../assets/css"
DirDst="build/css"
mkdir -p $DirDst

purgecss \
--css $DirSrc/bootstrap.min.css $DirSrc/font-awesome.min.css \
--content ../*.html \
--output $DirDst
