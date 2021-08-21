<template>
	<div class="feedback-wrap">
		<uni-card :title="info.auditType" :isFull="true">
			<view class="feedback-info">
				<view class="feedback-info-item">
					<text>工单编号：{{ info.workId }}</text>
					<text class="link" @click.stop="handleCopy(item.workId)">复制</text>
				</view>
				<view class="feedback-info-item">
					是否反馈：
					<template v-if="info.evaluateStatus === 1">已反馈</template>
					<template v-else>未反馈</template>
				</view>
				<view class="feedback-info-item"
					>反馈时间：{{ info.evaluateTime }}</view
				>
				<view class="feedback-info-item"
					>反馈内容：{{ info.evaluateComment }}</view
				>

				<view class="feedback-info-item">
					是否回访：
					<template v-if="info.returnStatus === 1">已回访</template>
					<template v-else>未回访</template>
				</view>

				<template v-if="info.returnStatus === 1">
					<view class="feedback-info-item"
						>回访时间：{{ info.returnTime }}</view
					>
					<view class="feedback-info-item"
						>回访内容：{{ info.returnComment }}</view
					>
				</template>
				<template v-else>
					<view class="feedback-info-form">
						<textarea
							class="feedback-info-form-textarea"
							v-model="returnComment"
							placeholder="请输入回访内容"
						></textarea>
						<view class="feedback-info-form-button">
							<tui-button @click="handleSubmit(true)">提交</tui-button>
						</view>
					</view>
				</template>
			</view>
		</uni-card>
	</div>
</template>

<script>
import { submitReview } from "@/api/feedback";

export default {
	components: {},
	data: () => ({
		info: {},
		returnComment: ""
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
				content: "确认提交？",
				success: res => {
					if (res.confirm) {
						submitReview({
							id: this.info.id,
							returnComment: this.returnComment,
							returnStatus: 1
						}).then(res => {
							let { code, msg } = res.data;
							if (code === 200) {
								uni.showToast({
									title: msg,
									icon: "success",
									mask: true
								});
								uni.$emit("feedback");
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
		this.info = this.$store.state.feedback.feedbackItem;
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
.feedback-wrap {
	.feedback-info {
		font-size: 26rpx;
		&-item {
			height: 50rpx;
		}
	}
	.feedback-info-form {
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
