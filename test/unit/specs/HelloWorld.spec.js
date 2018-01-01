import Vue from 'vue'
import OverView from '@/components/OverView'

describe('OverView.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(OverView)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App')
  })
})
