setup:
	cd $(PWD)
	[ -d quartz ] || git clone --depth=1 https://github.com/jackyzha0/quartz quartz
	rm -rf quartz/content # Remove the existing content directory
	ln -sfn $(PWD)/content quartz/content # Create a soft link to the content directory
	cd quartz && pnpm install && cd ..

update:
	# Replace the configuration files
	cp quartz.config.ts quartz/quartz.config.ts

build: update
	cd quartz && npx quartz build

serve: setup update
	pwd
	cd quartz && npx quartz build --serve

clean:
	rm -rf quartz

publish:
	@echo "Publishing to Cloudflare Pages..."
	@if [ -z "$(CLOUDFLARE_API_TOKEN)" ]; then \
		echo "Error: CLOUDFLARE_API_TOKEN is not set"; \
		exit 1; \
	fi
	@if [ -z "$(CLOUDFLARE_PROJECT_NAME)" ]; then \
		echo "Error: CLOUDFLARE_PROJECT_NAME is not set"; \
		exit 1; \
	fi
	cd quartz && CLOUDFLARE_API_TOKEN=$(CLOUDFLARE_API_TOKEN) pnpm dlx wrangler pages deploy public \
			--branch=main \
			--project-name=$(CLOUDFLARE_PROJECT_NAME)

deploy: build publish
	@echo "Deploying to Cloudflare Pages..."
	@echo "Project Name: $(CLOUDFLARE_PROJECT_NAME)"
	@echo "API Token: $(CLOUDFLARE_API_TOKEN)"
	@echo "Deployment complete!"
