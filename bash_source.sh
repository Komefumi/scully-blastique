# FZF

export FZF_DEFAULT_COMMAND='fd --type f'

open() {
  vim $(fzf)
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
