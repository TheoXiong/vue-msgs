# vue-msgs

## Introduction
 [vue-msgs](https://theoxiong.github.io/vue-msgs) is a vue component of message, you can show message by call the method of showMsg, and it will hidden when timeout.

## Install
``` 
$   npm install vue-msgs --save
```

## Usage

#### import with ES6
```
import VueMsg from 'vue-msgs'
```

#### or commonJs 
```
const VueMsg = require('vue-msgs').default
```

#### global registration
1. used by default
```
Vue.use(VueMsg)
Vue.prototype.$showMsg('success', 'this is a message')  // in app
this.$showMsg('success', 'this is a message')  // in component
```
2. change props
```
Vue.use(VueMsg, {
  timeout: 2000,  // duration of message view
  top: 100, // offset to top of document
  right: 20 // offset to right of document
})
```
3. diable register
```
Vue.use(VueMsg, {
  register: false,  // will not call Vue.component('VueMsg', VueMsg)
})
```

#### local registration
```
<vue-msg ref="vueMsg"></vue-msg>
components: { VueMsg }
this.$refs.vueMsg.showMsg('success', 'this is a message')
```


#### there is a simply demo
```
npm install
npm run dev

```

## Methods
name | brief |  param   
-|-|-   
showMsg | open the message interface | type: the type of message, support 'success'/'info'/'warning'/'error', info: the content of message |   
  