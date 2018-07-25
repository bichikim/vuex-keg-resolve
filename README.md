# Vuex-keg-resolve
> a keg to resolve Promise

## How to Use
````typescript
import vuexKeg, {keg, IKegContext as IKegContextPre} from 'vuex-keg'
import vuexKegResolve, {TKegResolvePluginRunner} from './src'

interface IRootState {
  test: null | string
  error: null | any
}

interface IKegContext<S> extends IKegContextPre<S, IRootState>{
  resolve: TKegResolvePluginRunner
}

export const state = (): IRootState => ({
  test: null,
  error: null
})

export const actions = {
  ...keg({
    login({resolve}, {id, password}) {
      return resolve(
        fetch('https://api.com/login', {body: JSON.stringify({id, password})}),
        'storeUserInfo',
      )
    }, // it will call commit('error') when it got failure
    // it will call commit('storeUserInfo') when it got success
    join({resolve}, {id, password, email}) {
      return resolve(
        fetch('https://api.com/join', {body: JSON.stringify({id, password, email})}),
      )
    }
  })
}

export const mutations = {
  error(state: IRootState, error){
    // login -> failure -> error
    // join -> failure -> error
    state.error = error
  },
  storeUserInfo(state, payload /*result*/){
    // login -> success -> storeUserInfo
    // doing things
    state.test = payload
  },
  joinSuccess(state, payload /*result*/){
    // join -> success -> joinSuccess
    // doing things
    state.test = payload
  }
}

export const plugins = [
  vuexKeg<IKegContext<any>, any>({
    afterHook: 'resolve', // <-- you can use "auto calling resolve after an action"
    plugins: {
      resolve: vuexKegResolve({
        success: (name) => (`${name}Success`),
        failure: 'error',
      }),
    },
  }),
]
````