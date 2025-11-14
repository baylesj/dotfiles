" Jordan Bayles (not copyrighted, feel free to steal any of it)

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM-PLUG PLUGIN MANAGER
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Auto-install vim-plug if not present
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Plugin list (run :PlugInstall to install)
call plug#begin('~/.vim/plugged')
" Essential Plugins
Plug 'tpope/vim-sensible' " A collection of common-sense Vim defaults
Plug 'tpope/vim-fugitive' " The best Git wrapper for Vim
Plug 'preservim/nerdtree' " A file system explorer
Plug 'vim-airline/vim-airline' " Lean & mean status/tabline
Plug 'Yggdroot/indentLine' " Displays indent levels with thin vertical lines
Plug 'jiangmiao/auto-pairs' " Insert or delete brackets, parens, quotes in pairs
Plug 'neoclide/coc.nvim', {'branch': 'release'} " Intelligent autocompletion & language server protocol client
Plug 'sainnhe/gruvbox-material' " Gruvbox theme for Vim
call plug#end()

" vim-airline configuration
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1
let g:airline_theme = 'gruvbox_material'

" indentLine configuration
let g:indentLine_char = '┆'
let g:indentLine_enabled = 1

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" BASIC EDITING CONFIGURATION
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Set color syntax highlighting on
syntax on

" Toggle line counter on/off
set number

" Enable visual autocomplete
set wildmenu

" Keeps vim from redrawing unnecessarily
set lazyredraw

" Highlight bracket pairs
set showmatch

" Change search settings
set incsearch
set hlsearch

" Don't allow mouse to select line numbers when copying
se mouse+=a

" allow unsaved background buffers and remember marks/undo for them
set hidden

" remember more commands and search history
set history=10000

" make searches case-sensitive only if they contain upper-case characters
set ignorecase smartcase

" This makes RVM work inside Vim. I have no idea why.
set shell=bash

" Global tab and indent settings
set tabstop=4 shiftwidth=4 expandtab

"Mark lines over 80 columns
if exists('+colorcolumn')
  set colorcolumn=80
else
  au BufWinEnter * let w:m2=matchadd('ErrorMsg', '\%>80v.\+', -1)
endif

" Enable true color support
set termguicolors

" keep more context when scrolling off the end of a buffer
set scrolloff=3

"Spell check!!
setlocal spell spelllang=en_us
map <F6> <Esc>:setlocal spell spelllang=en_us<CR>
map <F7> <Esc>:setlocal nospell<CR>

" Plug in enabling
if v:version >= 600
  filetype plugin on
  filetype indent on
else
  filetype on
endif

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Find file word count
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! WC()
    let filename = expand("%")
    let cmd = "detex " . filename . " | wc -w | tr -d [:space:]"
    let result = system(cmd)
    echo result . " words"
endfunction

command WC call WC()
map <F10> <Esc>:WC<CR>

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" CUSTOM AUTOCMDS
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Highlight tabs (commented out as SpaceHi is undefined)
"autocmd syntax * SpaceHi

"Autocommand for indent settings (removed redundant and specific filetype settings)


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
"Coloring!
set t_Co=256

color gruvbox-material
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
