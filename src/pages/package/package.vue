<template>
	<div class="package-wrap">
		<tui-sticky :scrollTop="scrollTop" stickyHeight="90rpx">
			<template v-slot:header>
				<uni-search-bar
					@confirm="handleSearch"
					v-model="searchValue"
					placeholder="搜索订单编号或者客户名称"
					class="package-search"
				></uni-search-bar>
			</template>
		</tui-sticky>
		<view class="package-list">
			<template v-for="item in packageList">
				<view class="package-list-item" @click="handleItemClick()">
					<tui-card :title="item.title" :tag="item.tag">
						<template v-slot:body>
							<view class="package-list-item-content">
								<view class="package-list-item-text">
									<text>工单编号：{{ item.id }}</text>
									<text class="link" @click.stop="handleCopy(item.id)"
										>复制</text
									>
								</view>
								<view class="package-list-item-text">
									<text>客户：{{ item.realName }}</text>
								</view>
								<view class="package-list-item-text">
									<text>处理人：{{ item.handleUsername }}</text>
								</view>
								<view class="package-list-item-text">
									<text>创建时间：{{ item.createTime }}</text>
								</view>
                <view class="package-list-item-text">
									<text>更新时间：{{ item.updateTime }}</text>
								</view>
							</view>
						</template>
					</tui-card>
				</view>
			</template>
		</view>
	</div>
</template>

<script>
import { getList } from "@/api/work";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		scrollTop: 0,
		packageList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
		query: {
			status: 1
		}
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
					item.tag = { color: "#268efb" };
					switch (item.status) {
						case 1:
							item.tag.text = "上门打包";
							break;
						case 2:
							item.tag.text = "搬运";
							break;
						case 3:
							item.tag.text = "过磅卸车";
							break;
						case 4:
							item.tag.text = "入库";
							break;
						case 5:
							item.tag.text = "出库";
							break;
						case 6:
							item.tag.text = "销毁";
							break;
						case 7:
							item.tag.text = "已完成";
							break;
						default:
							item.tag.text = "";
							break;
					}
					item.title = { text: "涉敏销毁订单" };
				});
				this.packageList = this.packageList.concat(records);
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
		this.packageList = [];
		this.getList(this.page);
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
.package-wrap {
	.package-search {
		background-color: #ffffff;
		box-shadow: 0 0 5px #ccc;
	}
	.package-list {
		padding-bottom: 20rpx;
		&-item {
			margin-top: 20rpx;
			&-content {
				padding: 20rpx;
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
