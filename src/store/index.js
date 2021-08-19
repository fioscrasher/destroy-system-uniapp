import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import approve from "./modules/approve";

Vue.use(Vuex);
const store = new Vuex.Store({
	modules: {
		user,
		approve
	}
});

export default store;
