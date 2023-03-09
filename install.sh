#!/bin/sh
deno install \
    --allow-read \
    --allow-write \
    --allow-net \
    --allow-env \
    -n gdminify \
    https://deno.land/x/gdminifier@v0.1.1/cli.ts
