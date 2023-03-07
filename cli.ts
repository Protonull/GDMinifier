import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
const { options } = await new Command()
    .name("GDMinifier")
    .description("Consolidates and minifies a given HTML file.")
    .option("--input=<input:string>", "The HTML file to minify.", { required: true })
    .option("--output=<output:string>", "Where to save the minified file.", { required: true })
    .option("--ensureOut", "Whether to 'ensure' the output location.", { default: false })
    .parse(Deno.args);

import minify from "./minifier.ts";
await minify(options.input, options.output, options.ensureOut);
