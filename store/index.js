import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

let debug = true


// 从缓存里面取出列表数据
let initList = uni.getStorageSync('list') || []

const store = new Vuex.Store({
	strict: debug, //设置运行模式
	plugin: debug ? [createLogger()] : [], //调试模式加入日志插件
	state: {
		home: {
			list: initList
		},
		mine: {
			avatar: 'http://asset.izhongxia.com/ipic/2019-11-16-avator2.jpeg',
			name: 'zhongxia',
			desc: `Turn your face towards the sun, Let the shadows fall behind you, Don't look back,just carry on,And the shadows will never find you~~`
		}
	},
	mutations: {
		// 清理本地缓存
		clear(state) {
			state.home.list = []
		},
		// 修改个人资料
		updateUserInfo(state, data) {
			state.mine = {
				...state.mine,
				...data
			}
		},
		addDiary(state, data) {
			state.home.list.push(data)

			uni.setStorage({
				key: 'list',
				data: state.home.list
			})
		},
		updateDiary(state, {
			index,
			data
		}) {
			if (state.home.list[index]) {
				state.home.list[index] = data
			}
		}
	}
})

export default store
