# Bash
alias ssb="source ~/.bash_profile"

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
alias branch="git branch"
alias status="git status"
alias add="git add"

commit() {
  git commit -m "$*"
}

alias diff="git diff"
alias push-all="git push --all"

merge() {
  git merge -b "$1"
}
