<template>
	<view>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator hover-class="none" class="nav-li" navigateTo v-for="(item, index) in sortList" :url="'../add-form/add?index=' + index" :key="index" :class="'bg-' + item.color">
					<view class="nav-title">{{ item.date }} - {{ item.name }}</view>
					<view class="nav-name">{{ item.desc }}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<!-- 避免覆盖 tab 栏 -->
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import { COLOR_LIST } from '../../utils/config.js';
export default {
	data() {
		return {
			list: [],
			colorList: COLOR_LIST
		};
	},
	computed: {
		sortList() {
			return this.list.sort((a, b) => (a.date < b.date ? 1 : -1));
		}
	},
	onLoad() {
		this.loadData();
	},
	onShow() {
		this.loadData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		setTimeout(() => {
			uni.showToast({
				title: '刷新数据完成',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, 1000);

		// uni.request({
		// 	url: 'https://cnodejs.org/api/v1/topics',
		// 	complete: result => {
		// 		if (result.data.success) {
		// 			this.topics = result.data.data;
		// 			console.log(this.topics);
		// 			uni.showToast({
		// 				title: '刷新数据完成',
		// 				icon: 'none'
		// 			});
		// 			uni.stopPullDownRefresh();
		// 		} else {
		// 			uni.showToast({
		// 				title: '获取话题列表失败',
		// 				icon: 'none'
		// 			});
		// 		}
		// 	}
		// });
	},
	// 右上角按钮点击
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/add-form/add'
		});
	},
	methods: {
		loadData(cb) {
			uni.getStorage({
				key: 'list',
				complete: result => {
					if (result.data && Array.isArray(result.data)) {
						result.data.map((item, index) => {
							// 循环下标
							let eleIndex = index % this.colorList.length;
							item.color = this.colorList[eleIndex].color;
							item.cuIcon = this.colorList[eleIndex].cuIcon;
						});
					}
					this.list = result.data;
					cb && cb();
				}
			});
		}
	}
};
</script>

<style>
.page {
}
.nav-swiper-action {
	width: 100%;
}
</style>
