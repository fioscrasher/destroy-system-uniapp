<template>
	<view class="subtitle-wrap">
		<view class="icon" :style="{ backgroundColor: iconColor }"></view>
		<text class="text">{{ text }}</text>
	</view>
</template>

<script>
export default {
	props: {
		iconColor: {
			type: String,
			default: "#ff9115"
		},
		text: {
			type: String,
			default: ""
		}
	}
};
</script>

<style lang="scss" scoped>
.subtitle-wrap {
	height: 50rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;

	.icon {
		width: 6rpx;
		height: 16rpx;
    border-radius: 3rpx;
	}
  .text{
    color: #666666;
    font-size: 24rpx;
    margin-left: 11rpx;
  }
}
</style>
