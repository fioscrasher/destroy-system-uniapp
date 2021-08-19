<template>
	<div class="approve-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索工单编号"
					class="approve-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="approve-list">
			<template v-for="item in approveList">
				<view class="approve-list-item">
					<uni-card :title="item.auditType" @click="handleItemClick(item)">
						<template v-slot:header>
							<view class="approve-list-item-header">
								<text>{{ item.auditType }}</text>
								<tui-tag size="20rpx" padding="12rpx">{{ item.tag }}</tui-tag>
							</view>
						</template>
						<view class="approve-list-item-content">
							<view class="approve-list-item-text">
								<text>工单编号：{{ item.workId }}</text>
								<text class="link" @click.stop="handleCopy(item.workId)"
									>复制</text
								>
							</view>
							<view class="approve-list-item-text">
								<text>提交人：{{ item.submitUser }}</text>
							</view>
							<view class="approve-list-item-text">
								<text>处理人：{{ item.auditUser }}</text>
							</view>
							<view class="approve-list-item-text">
								<text>提交时间：{{ item.submitTime }}</text>
							</view>
							<view class="approve-list-item-text">
								<text>审核时间：{{ item.auditTime }}</text>
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
	</div>
</template>

<script>
import { getList } from "@/api/approve";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		approveList: [],
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
		handleSearch() {
			this.query.workId = this.searchValue;
			this.page = {
				pageSize: 10,
				currentPage: 1,
				total: 0,
				totalPages: 1
			};
			this.approveList = [];
			this.getList(this.page);
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
		handleItemClick(item) {
			this.$store.commit("SET_APPROVE_ITEM", item);
			uni.navigateTo({
				url: `detail`
			});
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
					switch (item.auditStatus) {
						case -1:
							item.tag = "审批不通过";
							break;
						case 0:
							item.tag = "待审批";
							break;
						case 1:
							item.tag = "已审批";
							break;
						default:
							item.tag = "";
							break;
					}
				});
				this.approveList = this.approveList.concat(records);
				this.loading = false;
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getList(this.page);
		uni.$on("approve", () => {
			this.page = {
				pageSize: 10,
				currentPage: 1,
				total: 0,
				totalPages: 1
			};
			this.approveList = [];
			this.getList(this.page);
		});
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
		this.approveList = [];
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
.approve-wrap {
	.approve-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.approve-list {
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
