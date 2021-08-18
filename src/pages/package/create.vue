<template>
	<div class="package-wrap">
		<view class="package-list">
			<template v-for="item in packageList">
				<view class="package-list-item">
					<uni-card note="true">
						<view class="package-list-item-content">
							<view class="package-list-item-text">
								<text>子包编号：{{ item.id }}</text>
							</view>
							<view class="package-list-item-text">
								<text>工单编号：{{ item.workId }}</text>
							</view>
							<view class="package-list-item-text">
								<text>客户：{{ item.realName }}</text>
							</view>
							<view class="package-list-item-text">
								<text>处理人：{{ item.handleUser }}</text>
							</view>
							<view class="package-list-item-text">
								<text>创建时间：{{ item.createTime }}</text>
							</view>
						</view>
						<template v-slot:footer>
							<view class="package-list-item-footer">
								<tui-button
									type="danger"
									:size="24"
									height="42rpx"
									width="90rpx"
									@click="handleDelete(item.id)"
									>删除</tui-button
								>
							</view>
						</template>
					</uni-card>
				</view>
			</template>
			<tui-loadmore text="加载中..." v-if="loading"></tui-loadmore>
			<tui-nomore
				v-if="page.currentPage === page.totalPages && !loading"
				backgroundColor="#eeeeee"
			></tui-nomore>
			<tui-fab :btnList="[]" @click="handleAdd"></tui-fab>
		</view>
	</div>
</template>

<script>
import { getList, add, remove } from "@/api/package";

export default {
	components: {},
	data: () => ({
		loading: false,
		searchValue: "",
		packageList: [],
		page: {
			pageSize: 10,
			currentPage: 1,
			total: 0,
			totalPages: 1
		},
		query: {
			workId: null
		}
	}),
	computed: {},
	methods: {
		getList(page, params = {}) {
			this.loading = true;
			getList(
				page.currentPage,
				page.pageSize,
				Object.assign(params, this.query)
			).then(res => {
				const data = res.data.data;
				uni.setNavigationBarTitle({
					title: `子包数量：${data.total}`
				});
				this.page.total = data.total;
				this.page.totalPages = data.pages;
				let records = data.records;
				records.forEach(item => {
					item.title = { text: "子包编号：" + item.id };
				});
				this.packageList = this.packageList.concat(records);
				this.loading = false;
			});
		},
		handleAdd() {
			add({
				workId: this.query.workId
			}).then(res => {
				let { code, msg } = res.data;
				if (code === 200) {
					uni.showToast({
						title: "生成子包成功！",
						icon: "success"
					});
					this.page = {
						pageSize: 10,
						currentPage: 1,
						total: 0,
						totalPages: 1
					};
					this.packageList = [];
					this.getList(this.page);
				} else {
					uni.showToast({
						title: msg,
						icon: "error"
					});
				}
			});
		},
		handleDelete(id) {
			uni.showModal({
				title: "提示",
				content: "确认删除该子包？",
				success: e => {
					if (e.confirm) {
						remove(id).then(res => {
							let { code, msg } = res.data;
							if (code === 200) {
								uni.showToast({
									title: msg,
									icon: "success"
								});
								this.page = {
									pageSize: 10,
									currentPage: 1,
									total: 0,
									totalPages: 1
								};
								this.packageList = [];
								this.getList(this.page);
							} else {
								uni.showToast({
									title: msg,
									icon: "error"
								});
							}
						});
					}
				}
			});
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(e) {
		this.query.workId = e.id;
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
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll({ scrollTop }) {}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.package-wrap {
	.package-list {
		&-item {
			&-content {
				font-size: 24rpx;
				line-height: 36rpx;
			}
			&-text {
				display: flex;
				align-items: center;
				height: 50rpx;
			}
			&-footer {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
