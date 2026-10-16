# ──────────────────────────────────────────────────────────────────────────────
# Personal ~/.zshenv
# By Jordan Bayles (bayles.jordan@gmail.com)
#
# Environment variables loaded before .zshrc
# This file is sourced for all shell sessions (login, interactive, non-interactive)
# ──────────────────────────────────────────────────────────────────────────────

# ──────────────────────────────────────────────────────────────────────────────
# Editor and Terminal
# ──────────────────────────────────────────────────────────────────────────────
export EDITOR="vim"
export VISUAL="vim"
# Over SSH, fall back to xterm-256color if this host has no terminfo for the
# client's TERM (e.g. xterm-ghostty), and assume truecolor since ssh doesn't
# forward COLORTERM by default. Locally, keep what the terminal sets.
if [[ -n "$SSH_CONNECTION" ]]; then
  infocmp "$TERM" &>/dev/null || export TERM=xterm-256color
  export COLORTERM="${COLORTERM:-truecolor}"
fi

# ──────────────────────────────────────────────────────────────────────────────
# Google/Chromium Development
# ──────────────────────────────────────────────────────────────────────────────

# Skip GCE authentication for git if on a Cloudtop.
if hostname | grep -q -- '\.c\.googlers\.com$'; then
  export SKIP_GCE_AUTH_FOR_GIT=1
fi

if [ -f /usr/local/src/ ]; then
  export REPO_DIR="/usr/local/src/"
fi

if [ -f ~/.zshenv.local ]; then
  source ~/.zshenv.local
else
  echo "No ~/.zshenv.local file found. You can create one to set local environment variables, such as API keys."
fi
