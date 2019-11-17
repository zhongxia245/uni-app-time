<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'libs/colorui/main.css';
@import 'libs/colorui/icon.css';

body {
	background: #ffffff;
}
</style>
