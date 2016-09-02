import { injectReducer } from '../../store/reducers'
import indexRoute from './indexRoute'
import ProjectRoute from './projectRoute'

export default (store) => ({
  path: '/projects',
  indexRoute: indexRoute(store),
  childRoutes: [
    ProjectRoute(store),
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Projects = require('./containers/ProjectsContainer').default
      // const reducer = require('./modules/tasks').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'tasks', reducer })

      /*  Return getComponent   */
      cb(null, Projects)

    /* Webpack named bundle   */
    }, 'projects')
  }
})
