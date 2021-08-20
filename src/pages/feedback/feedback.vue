<template>
	<view class="feedback-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索订单编号或者客户名称"
					class="feedback-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="feedback-list">
			<template v-for="item in feedbackList">
				<view class="feedback-list-item">
					<uni-card :title="item.title" @click="handleItemClick()">
						<template v-slot:header>
							<view class="feedback-list-item-header">
								<text>{{ item.title }}</text>
								<!-- <tui-tag size="20rpx" padding="12rpx">{{ item.tag }}</tui-tag> -->
							</view>
						</template>
						<view class="feedback-list-item-content">
							<view class="feedback-list-item-text">
								<text
									>工单编号：{{ item.workId > 0 ? item.workId : "暂无" }}</text
								>
								<text
									class="link"
									@click.stop="handleCopy(item.workId)"
									v-if="item.workId > 0"
									>复制</text
								>
							</view>
							<view class="feedback-list-item-text">
								<text>
									是否反馈：
									<template v-if="item.evaluateStatus === 1">已反馈</template>
									<template v-else>未反馈</template>
								</text>
							</view>
							<view class="feedback-list-item-text">
								<text>反馈时间：{{ item.evaluateTime }}</text>
							</view>
              <view class="feedback-list-item-text">
								<text>
									是否回访：
									<template v-if="item.returnStatus === 1">已回访</template>
									<template v-else>未回访</template>
								</text>
							</view>
							<view class="feedback-list-item-text">
								<text>反馈时间：{{ item.returnTime }}</text>
							</view>
						</view>
					</uni-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage === page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
		</view>
	</view>
</template>

<script>
import { getList } from "@/api/feedback";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		feedbackList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
		query: {}
	}),
	computed: {},
	methods: {
		handleSearch(e) {
			console.log(e);
		},
		handleCopy(text) {
			uni.setClipboardData({
				data: text,
				success: function() {
					uni.showToast({
						title: "已复制"
					});
				}
			});
		},
		handleItemClick() {
			console.log(123);
		},
		getList(page, params = {}) {
			this.loading = true;
			getList(
				page.currentPage,
				page.pageSize,
				Object.assign(params, this.query)
			).then(res => {
				const data = res.data.data;
				this.page.total = data.total;
				this.page.totalPages = data.pages;
				let records = data.records;
				records.forEach(item => {
					item.title = "涉敏销毁订单";
				});
				this.feedbackList = this.feedbackList.concat(records);
				this.loading = false;
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getList(this.page);
	},
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
		this.page = {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		};
		this.feedbackList = [];
		this.getList(this.page);
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {
		if (!this.loading)
			if (this.page.currentPage < this.page.totalPages) {
				this.page.currentPage++;
				this.getList(this.page);
			}
	},
	// 页面处理函数--监听页面滚动(not-nvue)
	onPageScroll({ scrollTop }) {
		this.scrollTop = scrollTop;
	}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.feedback-wrap {
	background-color: #eeeeee;
	.feedback-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.feedback-list {
		padding-bottom: 20rpx;
		&-item {
			margin-top: 20rpx;
			&-header {
				color: #666666;
				font-size: 34rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			&-content {
				font-size: 24rpx;
				line-height: 36rpx;
			}
			&-text {
				display: flex;
				align-items: center;
				height: 50rpx;
			}
		}
	}
}

.link {
	color: #268efb;
	margin-left: 30rpx;
	&:active {
		background-color: #eeeeee;
	}
}
</style>
