# 观禅 GZen - Observing Zen

A digital sanctuary for Buddhist wisdom and mindful living. Spreading positivity, wisdom, and mindfulness on the internet.

## Build & Deploy Approach

This site uses **Quartz 4** static site generator and deploys to **Cloudflare Pages** via GitHub Actions.

### Deployment Process
- Custom GitHub Actions workflow builds and deploys to Cloudflare Pages
- Build happens on GitHub (not on Cloudflare directly)
- See `.github/workflows/deploy.yml` for workflow details

### Required GitHub Secrets
Configure these in your repository settings (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token with Pages write permissions
- `CLOUDFLARE_PROJECT_NAME` - Your Cloudflare Pages project name (e.g., `gzen-app`)

### Local Development
```bash
make setup    # Clone Quartz, link content, install dependencies
make serve    # Build and serve locally with live reload
make build    # Build static site
make clean    # Remove Quartz directory
```

### Manual Deployment
```bash
make deploy   # Build and deploy to Cloudflare Pages
```
