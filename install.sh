#!/bin/sh
deno install \
    --allow-read \
    --allow-write \
    --allow-net \
    --allow-env \
    -n gdminify \
    https://raw.githubusercontent.com/Protonull/GDMinifier/master/cli.ts
