<template>
	<view class="work-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<tui-dropdown-list :show="dropdownShow" :top="94" :height="400">
					<template v-slot:selectionbox>
						<view class="work-search">
							<uni-search-bar
								@confirm="handleSearch"
								v-model="searchValue"
								placeholder="搜索订单编号或者客户名称"
								class="work-search-input"
							></uni-search-bar>
							<tui-button
								class="work-search-category"
								width="90rpx"
								shape="rightAngle"
								:size="24"
								@click="dropdownShow = !dropdownShow"
							>
								<tui-icon name="category" color="#ffffff" :size="24"></tui-icon>
							</tui-button>
						</view>
					</template>
					<template v-slot:dropdownbox>
						<view class="work-search-panel">
							<uni-data-checkbox
								mode="button"
								v-model="value"
								:localdata="range"
								@change="change"
							></uni-data-checkbox>
						</view>
					</template>
				</tui-dropdown-list>
			</template>
		</tui-sticky>
		<view class="work-list">
			<template v-for="item in workList">
				<view class="work-list-item">
					<tui-card :title="item.title" :tag="item.tag">
						<template v-slot:body>
							<view class="work-list-item-content">
								<uni-row>
									<uni-col :span="20">
										<view>工单编号：111112232324234</view>
										<view>客户：广州梵软</view>
										<view>处理人：张三</view>
										<view>创建时间：2020-04-23</view>
										<view>更新时间：2020-04-23</view>
									</uni-col>
									<uni-col :span="4">
										<tui-button :size="24" height="60rpx">打包</tui-button>
									</uni-col>
								</uni-row>
							</view>
						</template>
					</tui-card>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data: () => ({
		searchValue: "",
		scrollTop: 0,
		dropdownShow: false,
		value: 0,
		range: [
			{ value: 0, text: "全部" },
			{ value: 1, text: "打包" },
			{ value: 2, text: "运输" },
			{ value: 3, text: "过磅" },
			{ value: 4, text: "入库" },
			{ value: 5, text: "出库" },
			{ value: 6, text: "销毁" },
			{ value: 7, text: "完成" }
		],
		workList: [
			{
				title: {
					text: "涉敏销毁订单"
				},
				tag: {
					text: "已接单"
				}
			}
		]
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		},
		change(e) {
			console.log("e:", e);
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
	onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	onPageScroll({ scrollTop }) {
		this.scrollTop = scrollTop;
	}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.work-wrap {
	.work-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
		display: flex;
		.work-search-input {
			flex-grow: 1;
		}
	}
	.work-search-panel {
		background-color: #ffffff;
		border: 1px solid #eeeeee;
		padding: 20rpx;
	}
	.work-list {
		padding-bottom: 20rpx;
		&-item {
			margin-top: 20rpx;
			&-content {
				padding: 20rpx;
				font-size: 24rpx;
				line-height: 36rpx;
			}
		}
	}
}
</style>
