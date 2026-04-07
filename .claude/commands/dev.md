Start the GrowZen local development server.

Run the following in order:
1. Check if node_modules exists; if not, run `npm ci` first
2. Check if Hugo modules are initialized; if go.sum is missing, run `hugo mod download`
3. Start the dev server with both CSS watching and Hugo server:
   `npm run dev`

This runs:
- Tailwind CSS in watch mode (rebuilds static/css/main.css on changes)  
- Hugo server with live reload at http://localhost:1313

Note: Hugo server defaults to serving zh (Chinese) at /. English is at /en/, Japanese at /ja/.

If port 1313 is in use, Hugo will automatically pick another port — check the terminal output.
