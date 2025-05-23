setup:
	git clone --depth=1 https://github.com/jackyzha0/quartz quartz
	mkdir -p quartz/content
	cp -r content/* quartz/content/
	cd quartz && pnpm install
	pnpm add -g @cloudflare/wrangler # Ensure wrangler is installed globally

build:
	cd quartz && npx quartz build

serve: setup
	cd quartz && npx quartz build --serve

clean:
	rm -rf quartz

deploy: build
	pnpm add -g @cloudflare/wrangler # Ensure wrangler is installed globally
	cd quartz/public && wrangler pages publish . \
		--project-name $(CLOUDFLARE_PROJECT_NAME) \
		--api-token $(CLOUDFLARE_API_TOKEN)

