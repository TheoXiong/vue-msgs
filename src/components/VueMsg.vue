<template>
  <transition
    name="toggle-msg"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div class="vue-msg"
         v-show="isShowMsg"
         :style="{ top: top + 'px', right: right + 'px' }"
    >
      <div class="vue-msg-main"
           :class="[
             {
               'is-success': msgType === 'success',
               'is-info': msgType === 'info',
               'is-warning': msgType === 'warning',
               'is-error': msgType === 'error'
             }
           ]"
      >
        {{ msgData }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VueMsg',
  data () {
    return {
      isShowMsg: false,
      timer: null,
      msgType: '',
      msgData: '',
      msgQueue: [],
      watchTimer: null,
      pending: false
    }
  },
  props: {
    timeout: { type: Number, default: 3000 },
    top: { type: Number, default: 64 },
    right: { type: Number, default: 8 }
  },
  mounted () {
    this.startWatch()
  },
  beforeDestroy () {
    this.stopWatch()
  },
  methods: {
    showMsg (type = '', info = '') {
      if (!['success', 'info', 'warning', 'error'].includes(type)) {
        throw new Error('type is invalid!')
      }
      this.msgQueue.push({ type, info })
    },
    startWatch () {
      this.watchTimer = setInterval(() => {
        if (this.pending) return
        if (this.msgQueue.length > 0) {
          this.pending = true
          let msg = this.msgQueue.shift()
          this.close()
            .then(() => {
              this.timer = setTimeout(() => { this.isShowMsg = false }, this.timeout)
              this.msgType = msg.type
              this.msgData = msg.info
              this.isShowMsg = true
              setTimeout(() => { this.pending = false }, 1300)
            })
        }
      }, 100)
    },
    stopWatch () {
      this.watchTimer ? clearInterval(this.watchTimer) : ''
    },
    close () {
      return new Promise((resolve, reject) => {
        if (this.isShowMsg) {
          this.timer ? clearTimeout(this.timer) : ''
          this.isShowMsg = false
          setTimeout(() => { resolve() }, 300)
        } else {
          return resolve()
        }
      })
    },
    afterEnter () {
      this.$emit('afterEnter')
    },
    afterLeave () {
      this.$emit('afterLeave')
      this.msgType = ''
      this.msgData = ''
    }
  }
}
</script>

<style scoped>
.vue-msg{
  margin: 0;
  padding: 0;
  position: fixed;
  max-height: 64px;
  max-width: 342px;
  overflow: hidden;
  z-index: 9999;
}
.vue-msg-main{
  font-size: 14px;
  font-family: inherit;
  border: 1px solid rgba(153, 217, 226, 0.7);
  border-radius: 4px;
  width: 320px;
  max-height: 64px;
  padding: 10px;
  word-wrap:break-word;
  overflow: hidden;
}
.is-success{
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.is-info{
  color: #909399;
  background-color: #edf2fc;
  border-color: #ebeef5;
}
.is-warning{
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.is-error{
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.toggle-msg-enter-active,
.toggle-msg-leave-active{
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}
.toggle-msg-enter,
.toggle-msg-leave-to{
  transform: translateX(120%);
  -webkit-transform: translateX(120%);
  -moz-transform: translateX(120%);
  -ms-transform: translateX(120%);
  -o-transform: translateX(120%);
  opacity: 0;
}
</style>
