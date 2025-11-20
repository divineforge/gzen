# Example Game Directory

This is a placeholder directory for hosting your first game.

## How to Add Your Game

### For Flutter Web Games:
1. Build your Flutter game for web: `flutter build web`
2. Copy the contents of `build/web/` into this directory
3. Your game will be accessible at `https://gzen.io/games/example-game/`

### For Godot HTML5 Games:
1. Export your Godot game as HTML5
2. Copy the exported files into this directory
3. Ensure your main HTML file is named `index.html`
4. Your game will be accessible at `https://gzen.io/games/example-game/`

## Directory Structure

```
example-game/
├── index.html          # Main entry point
├── main.dart.js        # (Flutter) or game.wasm (Godot)
├── assets/             # Game assets
└── README.md           # This file
```

## Testing Locally

Before deploying, test your game locally:
- Navigate to this directory
- Start a local server: `python -m http.server 8000`
- Open `http://localhost:8000` in your browser

## Important Notes

- Keep file sizes reasonable for web delivery
- Test on multiple browsers and devices
- Optimize assets for web (compress images, audio)
- Consider adding a loading screen for better UX
