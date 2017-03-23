<template>
	<div>
		<v-header v-bind:seller="seller"></v-header>
		<div class="tab">
			<ul class="border-1px">
				<li> <router-link to="/goods">商品</router-link></li>
				<li><router-link to="/ratings">评论</router-link></li>
				<li><router-link to="/seller">商家</router-link></li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import header from 'components/header/header'
const ERR_OK = 0
export default {
	data () {
		return {
			seller: {}
		}
	},
	created () {
		this.$http.get('/api/seller').then((response) => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.seller = response.data
			};
		})
	},
	components: {
		'v-header': header
	}
}
</script>

<style lang="stylus">
@import "./common/stylus/mixin.styl"
.tab ul
	display:flex; 
	border-1px(rgba(1,17,27,0.1))
	li
		flex:1; 
		text-align: center; 
		height:40px;
		a
			display:block; 
			line-height:40px; 
			font-size:14px;
			&.active
				color:rgb(240,20,20);
</style>
