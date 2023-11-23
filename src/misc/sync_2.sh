#copy only main files to vDhops project

rsync -av \
    --exclude=cgi/ \
    --exclude=css/*/root.css \
    --exclude=css/fonts.css \
    --exclude=img/{blog,catalog,contact,goods} \
    --exclude=js/conf.js \
    --exclude=js/jmagic/conf.js \
    --exclude=tmp/ \
    --exclude=xml/ \
    --exclude=*.shtml \
    src/ ~/Projects/py/py-vShops/src/MVC/catalog/view/default


