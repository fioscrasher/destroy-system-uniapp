<template>
	<view class="order-wrap">
		<uni-search-bar
			@confirm="handleSearch"
			v-model="searchValue"
      placeholder="搜索订单编号或者客户名称"
		></uni-search-bar>
	</view>
</template>

<script>
export default {
	components: {},
	data: () => ({
		searchValue: ""
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style></style>
