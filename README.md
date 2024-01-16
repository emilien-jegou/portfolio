# Portfolio

A minimalist portfolio using the qwik framework and tailwind css library.



# Snippets


## woff2 conversion
```bash
nix-shell -p woff2
for i in *.ttf; do woff2_compress "$i"; done
```

## woff conversion
```bash
cd /tmp
npm i ttf2woff
cd -
for i in *.ttf; do node /tmp/node_modules/ttf2woff/ttf2woff.js "$i" "$(echo "$i" | cut -d '.' -f 1).woff"; done
```

