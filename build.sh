#!/bin/bash
# GrowZen build script — downloads the correct Hugo version before building.
# Cloudflare Pages doesn't support pinning Hugo version via a repo file,
# so we fetch the binary ourselves.

set -euo pipefail

HUGO_VERSION="${HUGO_VERSION:-0.128.0}"
HUGO_BINARY="/tmp/hugo-${HUGO_VERSION}"

if [ ! -f "$HUGO_BINARY" ]; then
  echo "Downloading Hugo ${HUGO_VERSION}..."
  ARCHIVE="hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  curl -fsSL -o /tmp/hugo.tar.gz \
    "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${ARCHIVE}"
  tar -xzf /tmp/hugo.tar.gz -C /tmp hugo
  mv /tmp/hugo "$HUGO_BINARY"
  rm /tmp/hugo.tar.gz
  echo "Hugo ${HUGO_VERSION} ready."
fi

"$HUGO_BINARY" version
"$HUGO_BINARY" --minify
