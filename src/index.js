import VueMsg from './components/VueMsg.vue'

VueMsg.install = function (Vue, options) {
  options = options || {}
  let props = {}
  if (VueMsg && VueMsg.props) {
    Object.keys(VueMsg.props).forEach(key => {
      options[key] ? props[key] = options[key] : ''
    })
  }
  
  const VueMsgConstructor = Vue.extend(VueMsg)
  let instance = new VueMsgConstructor({ propsData: props })
  instance.$mount()
  document.body.appendChild(instance.$el)

  if (options.mount !== false && !Vue.prototype.$showMsg) {
    Vue.prototype.$showMsg = (...args) => {
      return instance.showMsg(...args)
    }
  }

  if (options.register !== false) {
    Vue.component('VueMsg', VueMsg)
  }
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(VueMsg)
}

export default VueMsg

