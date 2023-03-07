import inlineAssets from "npm:inline-assets@1.4.8";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import postcssImporter from "npm:postcss-import-url@7.2.0";
import { ensureFile } from "https://deno.land/std@0.178.0/fs/mod.ts";

export default async function minify(
    inputFilePath: string,
    outputFilePath: string,
    ensureOutput: boolean
) {
    let content: string = await Deno.readTextFile(inputFilePath);

    // Put all assets (images, css, etc) inside the HTML itself
    content = inlineAssets(outputFilePath, inputFilePath, content, {
        verbose: true,
        htmlmin: true,
        cssmin: true,
        jsmin: false
    });

    const parsedDocument = (new DOMParser().parseFromString(content, "text/html"))!;

    // Recursively inline all stylesheets (mostly targeting remote fonts)
    for (const styleTag of parsedDocument.querySelectorAll("style")) {
        styleTag.textContent = await postcss([
            postcssImporter({
                recursive: true,
                // Set user-agent string, which is useful for fetching remote fonts
                modernBrowser: true,
                dataUrls: true
            })
        ]).process(styleTag.textContent, { from: undefined });
    }

    // Convert document back into raw HTML plaintext
    // @ts-ignore (TypeScript thinks parsedDocument is null...)
    content = parsedDocument.documentElement.outerHTML;

    if (ensureOutput === true) {
        await ensureFile(outputFilePath);
    }

    // Save the resulting fat-html to the output location
    await Deno.writeTextFile(outputFilePath, content);
}
