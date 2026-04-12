Build the GrowZen site and report any errors.

Steps:
1. Run `npm run build:css` first to compile Tailwind CSS
2. Run `hugo --minify` to build the site
3. Check the output for errors or warnings
4. If build fails, read the error, identify the cause (broken template, missing i18n key, front matter issue), and fix it
5. Report: total pages built, any warnings, build time

If there are Hugo module errors (missing go.sum, module not found), run `hugo mod download` first then retry.

Do NOT start a dev server — only build once and report.
