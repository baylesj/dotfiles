# Fonts

Installed on macOS via Homebrew casks (`configure.sh` installs these). Cask name
is `font-<slug>`; family name is what goes in `ghostty/config.ghostty`
(`font-family = ...`) or editor settings.

## Reading / UI

| Family | Cask slug | Notes |
| --- | --- | --- |
| Atkinson Hyperlegible | `atkinson-hyperlegible` | Braille Institute; built to tell confusable glyphs apart |
| Atkinson Hyperlegible Next | `atkinson-hyperlegible-next` | 2025 refresh: 7 weights + italics, more languages |
| Atkinson Hyperlegible Mono | `atkinson-hyperlegible-mono` | Monospace version, a good pick for code if legibility is the goal |

## Programming

Ligatures: "yes" = ships programming ligatures (`=>`, `!=`, `->`); blank = none or unverified.

| Family | Cask slug | Ligatures | Notes |
| --- | --- | --- | --- |
| Fira Code | `fira-code` | yes | The old kitty font |
| JetBrains Mono | `jetbrains-mono` | yes | Ghostty's default. Tall x-height, readable at small sizes |
| Cascadia Code | `cascadia-code` | yes | Microsoft; has a cursive italic. `Cascadia Mono` = no ligatures |
| Monaspace (Neon/Argon/Xenon/Radon/Krypton) | `monaspace` | yes | GitHub; 5 styles that can be mixed, texture healing |
| Iosevka | `iosevka` | yes | Narrow; fits lots of columns. Highly configurable |
| Victor Mono | `victor-mono` | yes | Narrow, with a cursive italic |
| Maple Mono | `maple-mono` | yes | Rounded, with a cursive italic |
| Recursive Mono | `recursive` | yes | Variable font: linear ↔ casual axis |
| Lilex | `lilex` | yes | IBM Plex Mono with ligatures |
| Hasklig | `hasklig` | yes | Source Code Pro with ligatures |
| Commit Mono | `commit-mono` |  | Neutral; smart kerning |
| Geist Mono | `geist-mono` |  | Vercel; clean, modern |
| Intel One Mono | `intel-one-mono` |  | Designed with low-vision developers |
| 0xProto | `0xproto` | yes | Very clear distinctions between similar glyphs |
| Martian Mono | `martian-mono` |  | Wide, geometric |
| IBM Plex Mono | `ibm-plex-mono` |  | Readable, with a good italic |
| Source Code Pro | `source-code-pro` |  | Adobe; a classic |
| Hack | `hack` |  | Based on DejaVu Sans Mono |
| Meslo LG | `meslo-lg` |  | Menlo variant; the p10k-recommended base |
| Ubuntu Mono | `ubuntu-mono` |  | Compact, humanist |
| Inconsolata | `inconsolata` |  | Older but still popular |
| Roboto Mono | `roboto-mono` |  | Google |
| Red Hat Mono | `red-hat-mono` |  | |
| Space Mono | `space-mono` |  | Unusual retro look; better for display than long sessions |
| Anonymous Pro | `anonymous-pro` |  | Bitmap-era feel |
| Mononoki | `mononoki` |  | |
| Fantasque Sans Mono | `fantasque-sans-mono` |  | Handwritten, playful |
| Comic Mono | `comic-mono` |  | Comic Sans, monospaced. Yes really |
| SF Mono | `sf-mono` |  | Apple's. The cask runs a .pkg, so it needs sudo |

## Icons

Ghostty has Nerd Font and Powerline symbols built in, so the fonts above work
unpatched with the p10k prompt and vim-airline. `symbols-only-nerd-font`
(`Symbols Nerd Font Mono`) is installed as a fallback for other apps.

## Trying fonts

- `ghostty +list-fonts` shows family names; `ghostty +show-face --string=x`
  shows which font renders a glyph.
- Set `font-family = JetBrains Mono` in `ghostty/config.ghostty`, then reload
  the config with cmd+shift+, (no restart needed).
