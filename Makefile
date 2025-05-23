setup:
	[ -d quartz ] || git clone --depth=1 https://github.com/jackyzha0/quartz quartz
	mkdir -p quartz/content
	ln -sfn $(PWD)/content quartz/content # Create a soft link to the content directory
	cd quartz && pnpm install



build:
	cd quartz && npx quartz build

serve: setup
	cd quartz && npx quartz build --serve

clean:
	rm -rf quartz

publish:
	pwd
	CLOUDFLARE_API_TOKEN=$(CLOUDFLARE_API_TOKEN)
	cd quartz && pnpm add @cloudflare/wrangler # Ensure wrangler is installed globally
	npx wrangler pages deploy quartz/public \
			--project-name $(CLOUDFLARE_PROJECT_NAME)

deploy: build publish
	@echo "Deploying to Cloudflare Pages..."
	@echo "Project Name: $(CLOUDFLARE_PROJECT_NAME)"
	@echo "API Token: $(CLOUDFLARE_API_TOKEN)"
	@echo "Deployment complete!"
