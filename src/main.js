import Vue from "vue";
import App from "./App";
import Notify from "./wxcomponents/vant/notify/notify";

Vue.config.productionTip = false;
Vue.prototype.$notify = Notify;

App.mpType = "app";

const app = new Vue({
	...App
});
app.$mount();
