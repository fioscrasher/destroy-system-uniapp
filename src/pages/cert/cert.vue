<template>
	<view class="cert-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索工单编号"
					class="cert-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="cert-list">
			<template v-for="item in certList">
				<view class="cert-list-item">
					<uni-card :title="item.handleType" @click="handleItemClick(item)">
						<template v-slot:header>
							<view class="cert-list-item-header">
								<text>{{ item.handleType }}</text>
								<tui-tag size="20rpx" padding="12rpx">{{
									item.dataType
								}}</tui-tag>
							</view>
						</template>
						<view class="cert-list-item-content">
							<view class="cert-list-item-text">
								<text>销毁证明编号：{{ item.id }}</text>
								<text class="link" @click.stop="handleCopy(item.id)">复制</text>
							</view>
							<view class="cert-list-item-text">
								<text
									>订单编号：{{
										item.orderId > 0 ? item.orderId : "暂无"
									}}</text
								>
								<text
									class="link"
									@click.stop="handleCopy(item.orderId)"
									v-if="item.orderId > 0"
									>复制</text
								>
							</view>
							<view class="cert-list-item-text">
								<text class="overlong-text"
									>销毁人员：{{ item.destroyUsers }}</text
								>
							</view>
							<view class="cert-list-item-text">
								<text>下单时间：{{ item.createTime }}</text>
							</view>
							<view class="cert-list-item-text">
								<text
									>状态：{{
										item.generateOrPreview == 1 ? "已生成" : "未生成"
									}}</text
								>
							</view>
						</view>
					</uni-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage >= page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
		</view>
	</view>
</template>

<script>
import { getList, update } from "@/api/cert";
import { baseUrl } from "@/config/env";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		certList: [],
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
			this.certList = [];
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
		handleItemClick({ id, orderId, generateOrPreview }) {
			if (generateOrPreview == 0) {
				uni.showModal({
					title: "提示",
					content: "该销毁证明未生成，是否生成？",
					success: res => {
						if (res.confirm) {
							update({
								id,
								generateOrPreview: 1
							}).then(res => {
								let { code } = res.data;
								if (code === 200) {
									uni.showToast({
										title: "生成成功",
										icon: "success",
										mask: true
									});
									this.page = {
										pageSize: 10,
										currentPage: 1,
										total: 0,
										totalPages: 1
									};
									this.certList = [];
									this.getList(this.page);
								}
							});
						}
					}
				});
			} else {
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				uni.downloadFile({
					url: baseUrl + "/certificate/pdfPreview?orderId=" + orderId,
					success: function(res) {
						if (res.statusCode === 200) {
							let filePath = res.tempFilePath;
							uni.openDocument({
								filePath: filePath,
								success: function(res) {
									console.log("打开文档成功");
								}
							});
						} else {
							uni.showToast({
								title: res.errMsg,
								icon: "error",
								mask: true
							});
						}
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			}
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
				this.certList = this.certList.concat(records);
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
		this.certList = [];
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
.cert-wrap {
	background-color: #eeeeee;
	.cert-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.cert-list {
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
