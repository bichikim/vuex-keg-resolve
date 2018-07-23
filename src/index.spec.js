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
          return resolve(Promise.resolve('test'))
        },
        testChange({resolve}) {
          return resolve(
            Promise.resolve('testChange'),
            'testChangeSuccess1'
          )
        },
        testChangeError({resolve}) {
          return resolve(
            Promise.reject('testChangeError'),
            'testChangeErrorSuccess' , 'testChangeErrorFailure1'
          )
        },
        testChangeWithObject({resolve}) {
          return resolve(
            Promise.resolve('testChangeWithObject'),
            {
              success: 'testChangeWithObjectSuccess1',
              failure: 'testChangeWithObjectFailure1',
            }
          )
        },
      }),
    },
    mutations:{
      testSuccess(state, payload) {
        state.test = payload
      },
      testChangeSuccess1(state, payload) {
        state.test = payload
      },
      testChangeErrorFailure1(state, payload) {
        state.test = payload
      },
      testChangeWithObjectSuccess1(state, payload) {
        state.test = payload
      },
      reset(state) {
        state.test = null
      },
    },
    plugins: [
      vuexKeg({
        plugins: {
          resolve: vuexResolve({
            failure: 'error',
          }),
        },
      }),
    ],
  })
  afterEach(async () => {
    await store.commit('reset')
  })
  it('should resolve test', async () => {
    await store.dispatch('test')
    expect(store.state.test).to.equal('test')
  })
  it('should resolve testChange', async () => {
    await store.dispatch('testChange')
    expect(store.state.test).to.equal('testChange')
  })
  it('should resolve testChangeError', async () => {
    try{
      await store.dispatch('testChangeError')
    }catch(e){
      expect(store.state.test).to.equal('testChangeError')
    }
  })
  it('should resolve testChangeWithObject', async () => {
    await store.dispatch('testChangeWithObject')
    expect(store.state.test).to.equal('testChangeWithObject')
  })
})
