


## changing your project's remote url to include your username
```
$ git remote set-url origin https://martinjackson@github.com/martinjackson/mbs-electron-react.git
```

**/home/mjackson/git-check.sh**
```sh
#!/bin/bash


if [ -n "$1" ]; then
   cd $1
fi

DIR=$(pwd)

git remote update

#
# taken from Neil Mayhew's answer and Adrien Be's edit
# http://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
#  

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "${DIR} Up-to-date"
elif [ $LOCAL = $BASE ]; then
    echo "${DIR} Need to pull"
elif [ $REMOTE = $BASE ]; then
    echo "${DIR} Need to push"
else
    echo "${DIR} Diverged"
fi

```
