import Vue from 'vue'
import { Button, Input, Form, FormItem, Message } from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.prototype.$message = Message