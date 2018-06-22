import vuexResolve from './'
import vuexKeg, {keg} from 'vuex-keg'
import Vue from 'vue'
import Vuex from 'vuex'
describe('vuex-keg-resolve', () => {
  Vue.config.productionTip = false
  Vue.config.devtools = false
  Vue.use(Vuex)
  let store
  store = new Vuex.Store({
    state: {
      test: null,
    },
    actions:{
    ...keg({
        test({resolve}) {
          return resolve(new Promise((resolve) => {
            setTimeout(() => {
              resolve('testDone')
            }, 30)
          }))
        }
      })
    },
    mutations:{
      testSuccess(state, payload) {
        console.log('workign!')
        state.test = payload
      },
    },
    plugins: [
      vuexKeg({
        plugins: {
          resolve: vuexResolve({promise: true})
        }
      })
    ]
  })
  it('should resolve this', (done) => {
    store.dispatch('test').then(() => {
      expect(store.state.test).to.equal('testDone')
      done()
    }).catch((error) => {
      done(error)
    })
  })
})
