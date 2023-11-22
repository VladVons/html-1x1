#!/bin/bash
# VladVons, 2023.11.19


DirDst="build/css"
mkdir -p $DirDst


Purge() {
    DirSrc="../assets/vendor/css"

    purgecss \
    --css $DirSrc/bootstrap.css $DirSrc/fontawesome.css \
    --content ../*.html \
    --output $DirDst
}

Combine()
{
    DirSrc="../assets/css"
    FileSrc="$DirSrc/styles.css"
    FileDst="$DirDst/styles.all.css"

    echo > $FileDst
    grep -o '".*"' $FileSrc | sed 's/"//g' |\
    while read x; do
        echo $x
        echo -e "\n/* file: $x */" >> $FileDst
        cat $DirSrc/$x >> $FileDst
    done
}

Purge
Combine
