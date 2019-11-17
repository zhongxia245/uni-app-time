<template>
	<view>
		<view class="cu-timeline" :key="index" v-for="(item, index) in timelines">
			<!-- 时间信息，按月划分 -->
			<view class="cu-time">{{ item.date.substr(5, 9) }}</view>
			<!-- 内容 -->
			<view class="cu-item text-blue" :key="i" v-for="(diary, i) in item.list">
				<view class="content" :class="'bg-' + colorList[(index * item.list.length + i) % colorList.length]">
					<view>【{{ diary.date }}】 - {{ diary.name }}</view>
					<view>{{ diary.desc }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dayjs from '../../libs/dayjs.min.js';
import { COLOR_LIST } from '../../utils/config.js';
export default {
	data() {
		return {
			colorList: COLOR_LIST,
			list: []
		};
	},
	onLoad() {},
	computed: {
		timelines() {
			let list = this.$store.state.home.list;
			let newList = this.mapDiaryList(list);
			return newList;
		}
	},
	methods: {
		mapDiaryList(arr) {
			let newArr = [];
			arr.forEach((item, i) => {
				let index = -1;
				let dateStr = dayjs(item.date).format('YYYY/MM/DD');
				let alreadyExists = newArr.some((newAddress, j) => {
					if (dateStr === dayjs(newAddress.date).format('YYYY/MM/DD')) {
						index = j;
						return true;
					}
				});
				if (!alreadyExists) {
					newArr.push({
						date: item.date,
						list: [item]
					});
				} else {
					newArr[index].list.push(item);
				}
			});
			return newArr;
		}
	}
};
</script>

<style></style>
