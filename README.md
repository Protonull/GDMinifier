# GDMinifier

A tool written in Deno to consolidate and minify the assets of exported documents.

## Installation

```sh
deno install \
    --allow-read \
    --allow-write \
    --allow-net \
    --allow-env \
    -n gdminify \
    https://deno.land/x/gdminifier@v0.1.2/cli.ts
```

## Usage

`gdminify --input=./path/to/file.html --output=./rendered.html`
