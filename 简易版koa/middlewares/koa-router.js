class Layer {
  constructor(path, method, route) {
    this.path = path
    this.method = method
    this.route = route
  }

  match(curPath, curMehtod) {
    return curPath === this.path && (this.method === curMehtod || this.method === 'all')
  }
}



class KoaRouter {
  constructor() {
    this.routeStack = []
  }

  all(path, route) {
    const layer = new Layer(path, 'all', route)
    this.routeStack.push(layer)
  }

  getMatchRoutes(curPath, curMehtod) {
    return this.routeStack.filter((item) => {
      return item.match(curPath, curMehtod)
    }).map(({ route }) => route)
  }

  compose(routes, ctx) {
    return dispatch(0)
    function dispatch(i) {
      const route = routes[i]
      if (!route) return Promise.resolve()
      return route(ctx, () => {
        dispatch(i + 1)
      })
    }
  }

  routes() {
    return async (ctx, next) => {
      let routes = this.getMatchRoutes(ctx.path, ctx.method)
      if (!routes.length) return next()
      let fnRouters = this.compose(routes, ctx)
      fnRouters.catch(e => {
        console.error(e)
      })
    }
  }
}

module.exports = KoaRouter
