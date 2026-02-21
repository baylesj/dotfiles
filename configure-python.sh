#!/usr/bin/env sh

# Install uv package manager
curl -LsSf https://astral.sh/uv/install.sh | sh

uv tool install ruff
uv tool install ty
uv tool install python-lsp-server
uv tool install jedi-language-server
