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

npm install --save webpack webpack-dev-server
npm install --save babel-loader react-hot-loader
npm install --save react react-dom react-router
npm install --save redux react-redux react-router-redux redux-thunk
npm install --save react-helmet

@ src/reducers/App.js
@ src/reducers/HackerNews.js
@ src/reducers/index.js
@ src/store.js

@ src/components/MainLayout.js
@ src/components/App.js
@ src/components/TopStories.js
@ src/components/Story.js
@ src/components/NoMatch.js

@ src/routes.js
@ src/index.js

@ index.html
@ webpack.config.js
@ server.hot.js

node server.hot.js
