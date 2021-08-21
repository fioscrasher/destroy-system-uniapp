const feedback = {
	state: {
		feedbackItem: {}
	},
	mutations: {
		SET_FEEDBACK_ITEM: (state, item) => {
			state.feedbackItem = item;
		}
	}
};

export default feedback;
