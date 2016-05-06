mkdir universal-react-router-redux

cd universal-react-router-redux

git init

@ .gitignore

npm init -y

npm install --save isomorphic-fetch es6-promise

mkdir -p src/{actions,reducers,components}

@ src/actions/HackerNews.js
@ src/reducers/HackerNews.js

mkdir -p test/actions

npm install --save-dev chai

@ test/actions/HackerNews.js

npm install --save babel-core babel-preset-es2015 babel-preset-react

@ .babelrc

node test/actions/HackerNews.js
