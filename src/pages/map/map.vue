// map
<template>
	<div class="map-wrap">
		<map
			class="map-container"
			:longitude="longitude"
			:latitude="latitude"
			:show-compass="true"
			:enable-poi="true"
			:enable-building="true"
			:polyline="polyline"
			:markers="markers"
		/>
		<div class="panel">
			<!-- <uni-datetime-picker
				v-model="datetimerange"
				type="datetimerange"
				rangeSeparator="至"
				@change="handleTimeChange"
			/> -->
			<!-- <picker
				mode="selector"
				:range="handlerList"
				:value="handlerIndex"
				range-key="name"
				@change="handlerChange"
			>
				<tui-button type="white"
					>选择接单人员：{{
						handlerList.length > 0 ? handlerList[handlerIndex].name : ""
					}}</tui-button
				>
			</picker> -->
			<picker
				mode="selector"
				:range="userList"
				:value="userIndex"
				range-key="name"
				@change="userChange"
			>
				<tui-button type="white"
					>当前定位人员：{{
						userList.length > 0 ? userList[userIndex].realName : ""
					}}</tui-button
				>
			</picker>
		</div>
	</div>
</template>

<script>
import { getHandlers } from "@/api/order";
import { getPosition, getUsers, getLocation } from "@/api/device";

export default {
	components: {},
	data: () => ({
		longitude: null,
		latitude: null,
		polyline: [],
		markers: [],
		// page: {
		// 	pageSize: 200,
		// 	currentPage: 1,
		// 	total: 0,
		// 	totalPages: 1
		// },
		// query: {
		// 	startDate: "",
		// 	endDate: "",
		// 	userId: null
		// },
		// datetimerange: [],
		// handlerList: [],
		// handlerIndex: 0,

		interval: null,
		userList: [],
		userIndex: 0,
		controlForm: {
			userId: ""
		},
		positionList: []
	}),
	computed: {},
	methods: {
		setCenter() {
			uni.getLocation({
				type: "gcj02",
				success: res => {
					this.longitude = res.longitude;
					this.latitude = res.latitude;
				}
			});
		},
		// getHandlers() {
		// 	getHandlers().then(res => {
		// 		let { code, data, msg } = res.data;
		// 		if (code === 200) {
		// 			this.handlerList = data;
		// 			this.query.userId = data[0].id;
		// 		} else {
		// 			uni.showToast({
		// 				title: msg,
		// 				icon: "error",
		// 				mask: true
		// 			});
		// 		}
		// 		this.getPosition(this.page);
		// 	});
		// },
		getUserList() {
			getUsers().then(res => {
				let { code, data } = res.data;
				if (code === 200) {
					this.userList = data;
					this.controlForm.userId = data[0].id;
					this.getLocation(this.controlForm.userId);
				}
			});
		},
		userChange(e) {
			this.userIndex = e.detail.value;
			this.getLocation(this.userList[this.userIndex].id, true);
		},
		getLocation(id, setFitView = false) {
			if (this.interval) {
				clearInterval(this.interval);
			}

			getLocation({ userId: id, limitSize: 10 }).then(res => {
				let { code, data } = res.data;
				if (code === 200) {
					if (data.length === 0) {
						uni.showToast({
							title: "当前所选人员暂无定位信息",
							icon: "none"
						});
					}
					// data.reverse();
					this.positionList = data;
					// if (AMAP) this.initPathSimplifier();
					this.initMarker(true);
				}
			});

			this.interval = setInterval(() => {
				getLocation({ userId: id, limitSize: 10 }).then(res => {
					let { code, data } = res.data;
					if (code === 200) {
						// data.reverse();
						this.positionList = data;
						// if (AMAP) this.initPathSimplifier();
						this.initMarker(setFitView);
					}
				});
			}, 60000);
		},
		initMarker(setFitView = false) {
			if (this.positionList.length == 0) {
				if (this.markers.length > 0) this.markers = [];
				return false;
			}

			this.markers = [
				{
					id: 1,
					latitude: this.positionList[0].latitude,
					longitude: this.positionList[0].longitude,
					title: `定位时间： ${this.positionList[0].createTime}`,
					iconPath: "/static/icon/truck-icon-web-small.png",
					width: 30,
					height: 30,
					anchor: { x: 0.5, y: 0.5 }
				}
			];
			if (setFitView) {
				this.longitude = this.positionList[0].longitude;
				this.latitude = this.positionList[0].latitude;
			}
		}
		// getPosition(page, params = {}) {
		// 	getPosition(
		// 		page.currentPage,
		// 		page.pageSize,
		// 		Object.assign(params, this.query)
		// 	).then(res => {
		// 		let { code, data } = res.data;
		// 		if (code == 200) {
		// 			let points = [];
		// 			if (data.records[0]) {
		// 				this.longitude = data.records[0].longitude;
		// 				this.latitude = data.records[0].latitude;
		// 			}
		// 			data.records.forEach(item => {
		// 				points.push({
		// 					latitude: parseFloat(item.latitude),
		// 					longitude: parseFloat(item.longitude)
		// 				});
		// 			});
		// 			let arr = [
		// 				{
		// 					points,
		// 					color: "#00ff7f",
		// 					width: 16,
		// 					arrowLine: true
		// 				}
		// 			];
		// 			this.polyline = [...arr];
		// 			console.log(this.polyline);
		// 			console.log(this.polyline[0].points);
		// 			uni.showToast({
		// 				title: "已获取定位",
		// 				icon: "success",
		// 				mask: true
		// 			});
		// 		} else {
		// 			uni.showToast({
		// 				title: "定位获取失败",
		// 				icon: "error",
		// 				mask: true
		// 			});
		// 		}
		// 	});
		// },
		// handleTimeChange() {
		// 	this.query.startDate = this.datetimerange[0];
		// 	this.query.endDate = this.datetimerange[1];
		// 	this.getPosition(this.page);
		// }
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		// this.setCenter();
		// this.getHandlers();
		this.getUserList();
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
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {}
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style scoped>
.map-wrap {
	position: relative;
}

.map-container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 300rpx;
	left: 0;
	width: 750rpx;
	height: calc(100% - 300rpx);
}

.panel {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	height: 300rpx;
	background: #ffffff;
}
</style>
