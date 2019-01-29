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
      msgData: ''
    }
  },
  props: {
    timeout: { type: Number, default: 3000 },
    top: { type: Number, default: 64 },
    right: { type: Number, default: 8 }
  },
  methods: {
    showMsg (type = '', info = '') {
      if (!['success', 'warning', 'error'].includes(type)) {
        throw new Error('type is invalid!')
      }
      if (this.timer && this.isShowMsg) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.isShowMsg = false
      }, this.timeout)

      this.msgType = type
      this.msgData = info
      this.isShowMsg = true
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
  max-width: 320px;
  overflow: hidden;
  z-index: 9999;
}
.vue-msg-main{
  font-size: 14px;
  font-family: inherit;
  border: 1px solid rgba(153, 217, 226, 0.7);
  border-radius: 4px;
  box-shadow: 1px 1px 1px 0 rgba(200, 200, 200, 0.7);
  width: 320px;
  max-height: 64px;
  padding: 12px;
  word-wrap:break-word;
  overflow: hidden;
}
.is-success{
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
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
}
.toggle-msg-enter{
  transform: translateX(150%);
  opacity: 0;
}
.toggle-msg-leave-to{
  transform: translateX(150%);
  opacity: 0;
}
</style>