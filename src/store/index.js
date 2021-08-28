import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import approve from "./modules/approve";
import feedback from "./modules/feedback";
import order from "./modules/order";
import device from "./modules/device";

Vue.use(Vuex);
const store = new Vuex.Store({
	modules: {
		user,
		approve,
		feedback,
		order,
		device
	}
});

export default store;
