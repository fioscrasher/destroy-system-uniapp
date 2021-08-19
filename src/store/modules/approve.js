const approve = {
	state: {
		approveItem: {}
	},
	mutations: {
		SET_APPROVE_ITEM: (state, item) => {
			state.approveItem = item;
		}
	}
};

export default approve;
