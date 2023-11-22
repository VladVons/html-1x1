#!/bin/bash
# VladVons@gmail.com


#File=$(ls *.log)
File="2a.log"

HttpRoot="http://1x1.lan/"
Src="/var/www/html/multikart"

cat $File |\
grep 404 |\
awk '{print $2}' | sed 's#http://1x1\.lan/##' |\
xargs -I{} install -D $Src/"{}" "{}"
