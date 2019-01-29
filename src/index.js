import VueMsg from './components/VueMsg.vue'

VueMsg.install = function (Vue, opt = {}) {
  Vue.component('VueMsg', VueMsg)
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(VueMsg)
}

export default VueMsg

