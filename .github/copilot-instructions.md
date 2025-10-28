# GitHub Copilot Custom Instructions for GZen

## Project Overview
GZen (俱ZEN) is a Quartz-based static website that curates and spreads positivity, motivation, and wisdom from across the internet. The project evolved from GoZen (a Golang resource collection) to a broader mission of capturing goodness, zen moments, and positive vibes.

## Purpose
- Share motivational quotes and positive content
- Maintain a knowledge garden using Obsidian and Quartz
- Provide an uplifting space for visitors seeking inspiration

## Tech Stack
- **Node.js**: Version 22.x (LTS)
- **Quartz**: Latest version (cloned from GitHub)
- **Package Manager**: pnpm (latest)
- **Content Management**: Obsidian (latest)
- **Deployment**: CloudFlare Pages
- **CI/CD**: GitHub Actions

## Project Structure
```
.
├── .github/           # GitHub workflows and configurations
├── content/           # Markdown content files (Obsidian vault)
├── static/            # Static assets
├── quartz/            # Quartz framework (git cloned, not committed)
├── quartz.config.ts   # Quartz configuration
├── Makefile           # Build and deployment scripts
└── CONTRIBUTING.md    # Development guidelines
```

## Build & Deployment Process

### Setup
```bash
make setup  # Clones Quartz, links content, installs dependencies
```

### Development
```bash
make serve  # Build and serve locally
```

### Production Build
```bash
make build  # Builds the site
```

### Deployment
- Automated via GitHub Actions on push to `main` branch
- Manually via `make deploy` (requires CloudFlare credentials)
- Uses CloudFlare Pages for hosting

## Content Guidelines

### Markdown Syntax
- Use standard markdown syntax compatible with both Obsidian and GitHub
- Internal links: Use Obsidian wikilinks `[[PageName]]`
- External links: Use standard markdown `[text](url)`

### Image Handling
**Important**: Images must use standard markdown syntax for compatibility:
```markdown
![optional alt text](./images/image.png)
```
This ensures images work in both GitHub and Obsidian.

### File Organization
- All content goes in the `content/` directory
- Images should be stored in `content/images/`
- Use lowercase filenames with hyphens for new files

### Frontmatter
Use YAML frontmatter for metadata:
```yaml
---
title: Page Title
created: YYYY-MM-DDTHH:MM:SS+08:00
modified: YYYY-MM-DDTHH:MM:SS+08:00
draft: false
tags:
  - tag1
  - tag2
---
```

## Coding Standards

### TypeScript/JavaScript
- Follow Quartz configuration patterns in `quartz.config.ts`
- Use TypeScript types from Quartz when extending functionality
- Keep configuration clean and well-commented

### Makefile
- Commands should be idempotent where possible
- Include comments for complex operations
- Use variables for configuration that might change

## Quartz Configuration

### Important Patterns
- Configuration is in `quartz.config.ts`
- Plugins are organized into: transformers, filters, and emitters
- Current plugins include:
  - ObsidianFlavoredMarkdown
  - GitHubFlavoredMarkdown
  - SyntaxHighlighting
  - TableOfContents
  - Custom OG Images (can be commented out for faster builds)

### Ignored Patterns
- `private/` - Private content not for publication
- `templates/` - Template files
- `.obsidian/` - Obsidian configuration

## GitHub Actions

### Workflows
- `deploy.yml`: Main deployment workflow
  - Triggers on push to `main`
  - Manual trigger with branch selection option
  - Supports dry-run mode for build-only testing
  - Uses pnpm caching for faster builds

### Environment Variables
- `CLOUDFLARE_API_TOKEN`: Required for deployment
- `CLOUDFLARE_PROJECT_NAME`: Target CloudFlare Pages project

## Testing & Quality

### No Automated Tests
- This is a content-focused static site
- No unit tests or integration tests required
- Manual verification by building and previewing locally

### Linting
- Follow existing code style in TypeScript files
- No formal linter configured currently

## Security Considerations
- Never commit CloudFlare API tokens or secrets to the repository
- Use GitHub Secrets for sensitive deployment credentials
- The `quartz/` directory is gitignored as it's cloned during build

## Documentation Standards
- Keep README.md updated with major changes
- Update CONTRIBUTING.md for development workflow changes
- Document any new Makefile targets
- Comment complex configuration changes in quartz.config.ts

## Dependencies
- Do not add dependencies directly (project uses Quartz's dependencies)
- If Quartz needs updating, modify the git clone command in Makefile
- Keep Node.js version aligned with workflow configuration (22.x)

## Common Tasks

### Adding New Content
1. Create markdown file in `content/` directory
2. Add proper frontmatter
3. Use standard markdown image syntax
4. Test locally with `make serve`
5. Commit and push to trigger deployment

### Modifying Theme/Styling
- Edit `quartz.config.ts` color schemes (lightMode/darkMode)
- Modify typography settings if needed
- Consider build time impact of plugin changes

### Troubleshooting Build Issues
- Check Quartz is properly cloned: `ls quartz/`
- Verify content symlink: `ls -la quartz/content`
- Ensure pnpm is installed: `corepack enable`
- Review GitHub Actions logs for deployment issues

## Additional Notes
- The site uses Google Fonts: Schibsted Grotesk, Source Sans Pro, IBM Plex Mono
- Analytics via Plausible
- Base URL: gzen.app
- Obsidian configuration in `.obsidian/` is preserved for local editing
