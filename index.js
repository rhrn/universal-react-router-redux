'use strict'

const ENV = process.env.NODE_ENV || 'development';

require('babel-core/register')({
  only: '/src/'
})

const Path = require('path')
const Boom = require('boom')
const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 3012
})

const React = require('react')
const ReactDOM = require('react-dom/server')

const match = require('react-router').match
const RouterContext = React.createFactory(require('react-router').RouterContext)
const createMemoryHistory = require('react-router').createMemoryHistory

const configureStore = require('./src/store').configureStore
const routes = require('./src/routes').default

const Provider = React.createFactory(require('react-redux').Provider)
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore

const Helmet = require('react-helmet')

if (ENV !== 'production') {

  server.register(require('h2o2'), err => {

    server.route({
      method: 'GET',
      path: '/static/{p*}',
      handler: {
        proxy: {
          passThrough: true,
          host: 'localhost',
          port: 3011
        }
      }
    })

  })

}

server.register(require('inert'), err => {

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function (request, reply) {
      reply.file('./static/favicon.ico')
    }
  })

  if (ENV === 'production') {

    server.route({
      method: 'GET',
      path: '/static/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'static')
        }
      }
    })

  }

})

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: function (request, reply) {

    const memoryHistory = createMemoryHistory(request.url.path)
    const store = configureStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    match({ history, routes, location: request.url.path }, (err, redirect, props) => {

      if (err) {
        return reply(Boom.badImplementation(err.message))
      }

      if (redirect) {
        return reply.redirect(redirect.pathname + redirect.search)
      }

      if (!props) {
        return reply(Boom.notFound())
      }

      request.raw.res.setHeader('Content-Type', 'text/html; charset=utf-8')
      request.raw.res.write(`<!doctype html>\n<html>`)

      const routerContext = RouterContext(props)

      const actions = routerContext.props.components
        .filter(component => {
          return component.WrappedComponent && component.WrappedComponent.dispatchActions
        })
        .map(component => {
          return component.WrappedComponent.dispatchActions(store, routerContext.props)
        })

      Promise.all(actions)
        .then(() => {

          const provider = Provider({ store }, routerContext)
          const content = ReactDOM.renderToString(provider)
          const head = Helmet.rewind()

          request.raw.res.write(`<head>
            <meta charset="utf-8" />
            ${ head.title.toString() }
          </head>`)

          request.raw.res.write(`<body>
            <div id="root">${ content }</div>
            <script>window.__INITIAL_STATE__ = ${ JSON.stringify(store.getState()) }</script>
            <script src="/static/bundle.js"></script>
          </body>`)

          request.raw.res.end(`</html>`)
        })
        .catch(err => {
          console.log(err)
          request.raw.res.write(`<div>Has Error</div>`)
          request.raw.res.end(`</html>`)
        })
    })
  }
})

server.start(err => {

  if (err) {
    console.log('error', err)
  }

  console.log('Server running at:', server.info.uri)
})
