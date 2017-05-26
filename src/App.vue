<template>
	<div>
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<ul class="tab-wrapper border-1px">
				<li class="tab-item">
					<router-link to="/goods">商品</router-link>
				</li>
				<li class="tab-item">
					<router-link to="/seller">评价</router-link>
				</li>
				<li class="tab-item">
					<router-link to="/ratings">商家</router-link>
				</li>
			</ul>
		</div>
		<router-view :seller="seller"></router-view>
	</div>

</template>

<!--suppress JSUnresolvedVariable -->
<script type="text/ecmascript-6">
	import header from './components/header/header'
	let ERR_OK = 0

	export default {
		data () {
			return {
				seller: {}
			}
		},
		created () {
			this.$http.get('api/seller', {name:"abc"}).then(response => {
				const res = response.body
				if (res.errno === ERR_OK) {
					this.seller = res.data
				}
			})
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "common/stylus/mixin.styl"
	.tab
		height: 40px
		position: relative
		.tab-wrapper
			display: flex
			border-1px(rgba(7, 17, 27, 0.1))
		.tab-item
			flex: 1
			width: 100%
			height: 40px
			line-height: 40px
			position: relative
			text-align: center
			a
				display: block
				font-size: 14px
				color: #4d555d
				&.active
					color: #f01414


</style>
