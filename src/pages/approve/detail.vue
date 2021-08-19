<template>
	<div class="approve-wrap">
		<uni-card :title="info.auditType" :isFull="true">
			<view class="approve-info">
				<view class="approve-info-item">
					<text>工单编号：{{ info.workId }}</text>
					<text class="link" @click.stop="handleCopy(item.workId)">复制</text>
				</view>
				<view class="approve-info-item">
					审核状态：
					<template v-if="info.auditStatus === -1">审核不通过</template>
					<template v-else-if="info.auditStatus === 0">未审核</template>
					<template v-else-if="info.auditStatus === 1">已审核</template>
				</view>
				<view class="approve-info-item">提交人：{{ info.submitUser }}</view>
				<view class="approve-info-item">提交时间 ：{{ info.submitTime }}</view>
				<template v-if="info.auditStatus !== 0">
					<view class="approve-info-item">审核人：{{ info.auditUser }}</view>
					<view class="approve-info-item">审核时间 ：{{ info.auditTime }}</view>
				</template>
				<template v-else>
					<view class="approve-info-form">
						<textarea
							class="approve-info-form-textarea"
							v-model="auditRemark"
							placeholder="请输入审批备注"
						></textarea>
						<view class="approve-info-form-button">
							<tui-button @click="handleSubmit(true)">通过</tui-button>
							<tui-button type="danger" @click="handleSubmit(false)"
								>不通过</tui-button
							>
						</view>
					</view>
				</template>
			</view>
		</uni-card>
	</div>
</template>

<script>
import { approveSubmit } from "@/api/approve";

export default {
	components: {},
	data: () => ({
		info: {},
		auditRemark: ""
	}),
	computed: {},
	methods: {
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
		handleSubmit(e) {
			console.log(e);
			uni.showModal({
				title: "提示",
				content: e ? "确认审核通过？" : "确认审核不通过？",
				success: res => {
					if (res.confirm) {
						approveSubmit({
							id: this.info.id,
							auditRemark: this.auditRemark,
							auditRet: e ? 1 : 0
						}).then(res => {
							let { code, msg } = res.data;
							if (code === 200) {
								uni.showToast({
									title: msg,
									icon: "success",
									mask: true
								});
								uni.$emit("approve");
								setTimeout(() => {
									uni.navigateBack();
								}, 1500);
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
	onLoad() {
		this.info = this.$store.state.approve.approveItem;
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
	onPullDownRefresh() {},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll({ scrollTop }) {}
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.approve-wrap {
	.approve-info {
		font-size: 26rpx;
		&-item {
			height: 50rpx;
		}
	}
	.approve-info-form {
		margin-top: 30rpx;
		&-textarea {
			border: 1px solid #eeeeee;
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx;
		}
		&-button {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
		}
	}
}

.link {
	color: #268efb;
	margin-left: 30rpx;
	white-space: nowrap;
	&:active {
		background-color: #eeeeee;
	}
}
</style>
