"Set color syntax highlighting on
syntax on
" Toggle line counter on/off
set number
" Don't allow mouse to select line numbers when copying
se mouse+=a

"Set tab size and smart tabbing
set noet sts=0 sw=4 ts=4 expandtab
set cinoptions=(0,u0,U0

"Autocommand for indent settings
augroup indent_settings
  au!
  au BufEnter *.m setl tabstop=2 shiftwidth=2 expandtab
augroup END

"Mark lines over 80 columns
if exists('+colorcolumn')
  set colorcolumn=80
else
  au BufWinEnter * let w:m2=matchadd('ErrorMsg', '\%>80v.\+', -1)
endif

"Highlight tabs
autocmd syntax * SpaceHi

"Coloring!
set t_Co=256

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

"if v:version >= 700
"  set omnifunc=syntaxcomplete#Complete " override built-in C omnicomplete with C++ OmniCppComplete plugin
"  let OmniCpp_GlobalScopeSearch   = 1
"  let OmniCpp_DisplayMode         = 1
"  let OmniCpp_ShowScopeInAbbr     = 0 "do not show namespace in pop-up
"  let OmniCpp_ShowPrototypeInAbbr = 1 "show prototype in pop-up
"  let OmniCpp_ShowAccess          = 1 "show access in pop-up
"  let OmniCpp_SelectFirstItem     = 1 "select first item in pop-up
"  set completeopt=menuone,menu,longest
"endif

"Super tab completion instead of C-X C-O
"if version >= 700
"  let g:SuperTabDefaultCompletionType = "<C-X><C-O>"
"  highlight   clear
"  highlight   Pmenu         ctermfg=0 ctermbg=2
"  highlight   PmenuSel      ctermfg=0 ctermbg=7
"  highlight   PmenuSbar     ctermfg=7 ctermbg=0
"  highlight   PmenuThumb    ctermfg=0 ctermbg=7
"endif

" Configure tags - add additional tags here or comment out not-used ones
"set tags+=~/.vim/tags/cpp
"set tags+=~/.vim/tags/gl
"set tags+=~/.vim/tags/sdl
"set tags+=~/.vim/tags/qt4
" Build tags of your own project with Ctrl-F12
"map <C-F12> :!ctags -R --sort=yes --c++-kinds=+p --fields=+iaS --extra=+q .<CR>
" Update tags (more efficient method)
"map <F4> :!ctags -R -languages=C++ --c++-kinds=+p --fields=+iaS --extra=+q ./

function! WC()
    let filename = expand("%")
    let cmd = "detex " . filename . " | wc -w | tr -d [:space:]"
    let result = system(cmd)
    echo result . " words"
endfunction

command WC call WC()

" Color has to be last for some reason
color xoria256
