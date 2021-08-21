const order = {
	state: {
		orderItem: {}
	},
	mutations: {
		SET_ORDER_ITEM: (state, item) => {
			state.orderItem = item;
		}
	}
};

export default order;
