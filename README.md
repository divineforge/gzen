# 🎮 GZen Gaming

> A cross-platform gaming playground for hosting and showcasing games built with Flutter and Godot.

**Live Site:** [gzen.io](https://gzen.io)

## 🚀 Overview

GZen Gaming is a modern web platform designed to host and showcase cross-platform games. Whether you're building with Flutter Web or Godot HTML5 exports, this platform provides fast, global hosting powered by Cloudflare Pages.

## ✨ Features

- **Cross-Platform Games** - Play on web, mobile, or desktop
- **Modern Stack** - Built with Astro for fast, SEO-friendly pages
- **Global CDN** - Lightning-fast delivery via Cloudflare Pages
- **Easy Hosting** - Simply drop your game builds into `/public/games/`
- **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Hosting & CDN
- **Flutter Web** - Game framework (client side)
- **Godot Engine** - Game framework (client side)

## 🎯 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321`

## 🎮 Adding Your Game

### For Flutter Web Games:

1. Build your Flutter game:
   ```bash
   flutter build web
   ```

2. Copy the build output to a new game directory:
   ```bash
   cp -r build/web/ public/games/your-game-name/
   ```

3. Your game will be accessible at `https://gzen.io/games/your-game-name/`

### For Godot HTML5 Games:

1. Export your Godot game as HTML5 (Project → Export)

2. Copy the exported files:
   ```bash
   cp -r godot-export/ public/games/your-game-name/
   ```

3. Ensure `index.html` is the main file

4. Your game will be accessible at `https://gzen.io/games/your-game-name/`

### Update the Games Gallery

Edit `src/pages/games.astro` to add your game to the gallery:

```javascript
const games = [
  {
    id: 'your-game-name',
    title: 'Your Game Title',
    description: 'Brief description of your game',
    thumbnail: '/games/your-game-name/thumbnail.png',
    platform: 'Flutter Web', // or 'Godot'
    status: 'Live' // or 'Coming Soon'
  }
];
```

## 📦 Project Structure

```
gzen/
├── .github/workflows/    # GitHub Actions for deployment
├── public/               # Static assets
│   ├── games/           # Game builds go here
│   │   └── example-game/
│   └── favicon.svg
├── src/
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/           # Routes
│   │   ├── index.astro  # Homepage
│   │   ├── games.astro  # Games gallery
│   │   └── about.astro  # About page
│   └── components/      # Reusable components
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS config
└── package.json
```

## 🚢 Deployment

The site automatically deploys to Cloudflare Pages when you push to the `main` branch.

### Required GitHub Secrets

Configure these in your repository settings (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages write permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `CLOUDFLARE_PROJECT_NAME` - Your Cloudflare Pages project name

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy using Wrangler (if configured)
npx wrangler pages deploy dist
```

## 🤝 Contributing

We welcome game submissions and contributions!

1. Fork the repository
2. Add your game following the guidelines above
3. Test locally
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [gzen.io](https://gzen.io)
- **Repository:** [github.com/divineforge/gzen](https://github.com/divineforge/gzen)
- **Issues:** [Report bugs or request features](https://github.com/divineforge/gzen/issues)

---

Built with ❤️ using Astro and Cloudflare Pages
