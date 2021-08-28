import { setStore, getStore } from "@/util/store";

const device = {
	state: {
		positionAvailable: getStore({ name: "positionAvailable" }) || false,
		positionData: []
	},
	actions: {},
	mutations: {
		SET_POSITION_AVAILABLE: (state, item) => {
			state.positionAvailable = item;
			setStore({ name: "positionAvailable", content: item });
		},
		SET_POSITION_DATA: (state, item) => {
			state.positionData = item;
		}
	}
};

export default device;
