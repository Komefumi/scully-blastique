# FZF

export FZF_DEFAULT_COMMAND='fd --type f'

vf() {
  output=$(fzf)
  if [ -n "$output" ]; then
    vim $output
  fi
}

alias o="open"

alias list="tree -I 'node_modules|dist'"
alias l="list"
alias t="touch"
search() {
  ag "$*"
}
alias s="search"


# NOTE ! When searching for anything with quotes, remember to escape them as bash won't pass in the quotes directly otherwise
# `search import React from "react";` won't work
# `search import React from \"react\";` will work


# Git helpers

alias checkout="git checkout"
alias gk="checkout"
alias branch="git branch"
alias gb="branch"
alias status="git status"
alias gs="git status"

commit() {
  git commit -m "$*"
}

alias gm="commit"

alias diff="git diff"
alias gd="git diff"
