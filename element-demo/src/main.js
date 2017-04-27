import vue from 'vue'
// import ElementUI from 'element-ui'           // 完整引入
import {Button, Select} from 'element-ui'
// import 'element-ui/lib/theme/default/index.css' // 样式文件单独引入
import App from './App.vue'

// Vue.use(ElementUI)

Vue.component(myButton, Button)
Vue.component(mySelect, Select)
/**
 * 或是
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
    el: '#app',
    render: h => h(App)
})

