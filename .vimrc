" Jordan Bayles (not copyrighted, feel free to steal any of it)
" Targets Vim 9.1+.

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM-PLUG PLUGIN MANAGER
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Auto-install vim-plug if not present
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Plugin list (:PlugInstall to install, :PlugUpdate to update)
call plug#begin('~/.vim/plugged')
Plug 'tpope/vim-sensible'       " Common-sense defaults
Plug 'tpope/vim-fugitive'       " Git wrapper (:Git, :Git blame, ...)
Plug 'tpope/vim-commentary'     " gcc / gc{motion} to toggle comments
Plug 'tpope/vim-surround'       " cs\"' ds( ysiw] ...
Plug 'tpope/vim-repeat'         " Make . work with the above
Plug 'airblade/vim-gitgutter'   " Git diff markers in the sign column
Plug 'preservim/nerdtree'       " File tree
Plug 'junegunn/fzf'             " Fuzzy finder (uses the brew-installed binary)
Plug 'junegunn/fzf.vim'
Plug 'yegappan/lsp'             " Native Vim9 LSP client, no Node needed
Plug 'vim-airline/vim-airline'  " Status/tab line
Plug 'sainnhe/gruvbox-material' " Theme; has light and dark variants
call plug#end()
" plug#end() turns on `filetype plugin indent on` and `syntax enable`.

" vim-airline configuration
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1
let g:airline_theme = 'gruvbox_material'

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" BASIC EDITING CONFIGURATION
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Toggle line counter on/off
set number

" Keeps vim from redrawing unnecessarily
set lazyredraw

" Highlight bracket pairs
set showmatch

" Highlight search matches
set hlsearch

" Mouse support everywhere
set mouse=a

" allow unsaved background buffers and remember marks/undo for them
set hidden

" remember more commands and search history
set history=10000

" make searches case-sensitive only if they contain upper-case characters
set ignorecase smartcase

" Global tab and indent settings
set tabstop=4 shiftwidth=4 expandtab

" Show tabs, trailing whitespace and non-breaking spaces
set list listchars=tab:»\ ,trail:·,nbsp:␣

" Mark column 80
set colorcolumn=80

" keep more context when scrolling off the end of a buffer
set scrolloff=3

" Open splits to the right/below, like most other tools
set splitright splitbelow

" Always show the sign column so git/LSP markers don't shift the text
set signcolumn=yes

" Faster gitgutter/LSP updates
set updatetime=300

" Yank to and paste from the system clipboard
set clipboard=unnamed

" Persistent undo, kept out of the dotfiles repo
let s:undo_dir = expand('~/.vim/undo')
if !isdirectory(s:undo_dir)
  call mkdir(s:undo_dir, 'p', 0700)
endif
let &undodir = s:undo_dir
set undofile

"Spell check!! On for prose, F6/F7 toggle it anywhere.
autocmd FileType markdown,text,gitcommit,tex setlocal spell spelllang=en_us
map <F6> <Esc>:setlocal spell spelllang=en_us<CR>
map <F7> <Esc>:setlocal nospell<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" FINDING THINGS
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <C-p> :Files<CR>
nnoremap <leader>b :Buffers<CR>
nnoremap <leader>g :Rg<CR>
nnoremap <leader>n :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" LSP
" Servers are only registered if their binary is on $PATH, so installing one
" (e.g. `rustup component add rust-analyzer`) is all it takes to turn it on.
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let s:lsp_servers = [
  \ #{name: 'clangd', filetype: ['c', 'cpp', 'objc', 'objcpp'], path: 'clangd',
  \   args: ['--background-index']},
  \ #{name: 'rust-analyzer', filetype: ['rust'], path: 'rust-analyzer', args: [],
  \   syncInit: v:true},
  \ #{name: 'pyright', filetype: ['python'], path: 'pyright-langserver',
  \   args: ['--stdio'], workspaceConfig: #{python: #{pythonPath: 'python3'}}},
  \ #{name: 'gopls', filetype: ['go', 'gomod'], path: 'gopls', args: ['serve']},
  \ #{name: 'tsserver', filetype: ['javascript', 'typescript'],
  \   path: 'typescript-language-server', args: ['--stdio']},
  \ #{name: 'bashls', filetype: ['sh', 'zsh'], path: 'bash-language-server',
  \   args: ['start']},
  \ ]

function! s:LspSetup() abort
  call LspOptionsSet(#{
    \ autoComplete: v:true,
    \ showDiagWithVirtualText: v:true,
    \ diagVirtualTextAlign: 'after',
    \ })
  call LspAddServer(filter(copy(s:lsp_servers), {_, s -> executable(s.path)}))
endfunction
autocmd User LspSetup call s:LspSetup()

nnoremap gd :LspGotoDefinition<CR>
nnoremap gr :LspShowReferences<CR>
nnoremap K  :LspHover<CR>
nnoremap <leader>r :LspRename<CR>
nnoremap <leader>a :LspCodeAction<CR>
nnoremap [d :LspDiag prev<CR>
nnoremap ]d :LspDiag next<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Find file word count
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! WC()
    let filename = shellescape(expand("%"))
    let filter = &filetype ==# 'tex' && executable('detex') ? "detex " . filename : "cat " . filename
    let result = system(filter . " | wc -w | tr -d [:space:]")
    echo result . " words"
endfunction

command WC call WC()
map <F10> <Esc>:WC<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" ARROW KEYS ARE UNACCEPTABLE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Left> <Nop>
map <Right> <Nop>
map <Up> <Nop>
map <Down> <Nop>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" COLOR
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enable true color support
set termguicolors

" Vim asks the terminal for its background, so 'background' follows Ghostty's
" light/dark theme; gruvbox-material picks the matching variant.
let g:gruvbox_material_background = 'medium'
silent! color gruvbox-material

" Let the terminal's own background show through
hi Normal guibg=NONE ctermbg=NONE
set cursorline

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" OPEN FILES IN DIRECTORY OF CURRENT FILE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
cnoremap %% <C-R>=expand('%:h').'/'<cr>
map <leader>e :edit %%
map <leader>v :view %%

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Md5 COMMAND
" Show the MD5 of the current buffer
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
command! -range Md5 :echo system('echo '.shellescape(join(getline(<line1>, <line2>), '\n')) . '| md5')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" InsertTime COMMAND
" Insert the current time
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
command! InsertTime :normal a<c-r>=strftime('%F %H:%M:%S.0 %z')<cr>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" (Re?)map Ctrl+S
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
command -nargs=0 -bar Update if &modified
			\|	if empty(bufname('%'))
			\|		browse confirm write
			\|	else
			\|		confirm write
			\|	endif
			\|  endif

nnoremap <silent> <C-S> :<C-u>Update<CR>
