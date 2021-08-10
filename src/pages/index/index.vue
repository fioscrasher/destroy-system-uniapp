<template>
	<view class="index-wrap">
		<image
			class="title-image"
			src="/static/images/background_index.jpg"
			mode="aspectFill"
			fade-show="false"
			draggable="false"
		></image>
		<view class="index-container">
			<text class="welcome">欢迎回来，{{ username }}！</text>
			<van-tag type="success">管理员</van-tag>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: "李立强"
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.index-wrap {
	position: relative;

	.title-image {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 369rpx;
	}
	.index-container {
		position: relative;
		z-index: 5;
		padding: 129rpx 30rpx 0 30rpx;

		.welcome {
			font-size: 40rpx;
			color: #ffffff;
		}
	}
}
</style>
