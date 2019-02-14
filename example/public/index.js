import Vue from 'vue'
import VueMsg from '../../src/index.js'
import './index.css'

Vue.use(VueMsg)

const vm = new Vue({
  el: '#app',
  data: {
      msg: 'app'
  },
  mounted: function() {
  },
  computed: {
  },
  methods: {
    show (type) {
      if (type === 'success') {
        this.$refs.vueMsgSuccess.showMsg('success', 'vue-msgs is a component of message show.')
      } else if (type === 'info') {
        this.$refs.vueMsgInfo.showMsg('info', 'vue-msgs is a component of message show.')
      } else if (type === 'warning') {
        this.$refs.vueMsgWarning.showMsg('warning', 'vue-msgs is a component of message show.')
      } else if (type === 'error') {
        this.$refs.vueMsgError.showMsg('error', 'vue-msgs is a component of message show.')
      }
    }
  },
 
})