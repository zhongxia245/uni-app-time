<template>
	<view class="page">
		<view class="empty" v-if="list.length === 0">
			<image src="../../static/pages/index/empty.png"></image>
			<view class="empty-tip">空空如也呀，去添加一条记录吧~~</view>
			<button class="cu-btn bg-blue lg text-lg shadow-blur margin-tb-lg block " @click="add">添加</button>
		</view>
		<scroll-view scroll-y>
			<view class="nav-list">
				<view class="nav-li-wapper js-swiper" :key="index" v-for="(item, index) in sortlist">
					<navigator class="nav-li js-list" hover-class="none" navigateTo :url="'./add?index=' + index" :class="'bg-' + colorList[index % colorList.length]">
						<view class="nav-title">{{ item.date }} - {{ item.name }}</view>
						<view class="nav-name">{{ item.desc }}</view>
					</navigator>
				</view>
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
		sortlist() {
			let newList = [...this.list];
			return newList.sort((a, b) => (a.date < b.date ? 1 : -1));
		}
	},
	onLoad() {
		this.loadData();
	},
	mounted() {
		console.log('mounted');
	},
	onShow() {
		this.loadData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.loadData()
		setTimeout(() => {
			uni.showToast({
				title: '刷新数据完成',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 右上角按钮点击
	onNavigationBarButtonTap(e) {
		this.add();
	},
	methods: {
		add() {
			uni.navigateTo({
				url: '/pages/index/add'
			});
		},
		loadData(cb) {
			this.list = [...this.$store.state.home.list];
		}
	}
};
</script>

<style>
.page {
}

.empty {
	padding: 300rpx 150rpx 0rpx;
	text-align: center;
}
.empty image {
	height: 256rpx;
	width: 283rpx;
}
.empty button {
}
.empty-tip {
	font-size: 24rpx;
	color: #8a8a8a;
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 40upx 0px;
	justify-content: space-between;
}

.nav-li {
	padding: 30upx;
	border-radius: 12upx;
	width: 100%;
	margin-top: 40upx;
	background-image: url('../../static/pages/index/card-bg.png');
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32upx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40upx;
	margin-right: 4upx;
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	margin-top: 20upx;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

.text-light {
	font-weight: 300;
}
.nav-li-wapper {
	width: 100%;
}
</style>
