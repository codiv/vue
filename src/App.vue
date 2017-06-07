<template>
	<div>
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<ul class="tab-wrapper border-1px">
				<li class="tab-item">
					<router-link to="/goods">商品</router-link>
				</li>
				<li class="tab-item">
					<router-link to="/ratings">评论</router-link>
				</li>
				<li class="tab-item">
					<router-link to="/seller">商家</router-link>
				</li>
			</ul>
		</div>
		<router-view :seller="seller"></router-view>
	</div>

</template>

<!--suppress JSUnresolvedVariable -->
<script type="text/ecmascript-6">
	import header from './components/header/header';
	import {urlParse} from 'common/js/util';
	let ERR_OK = 0

	export default {
		data () {
			return {
				seller: {
					id: (() => {
						let queryParam = urlParse();
						return queryParam.id;
					})()
				}
			}
		},
		created () {
			this.$http.get('api/seller?id=' + this.seller.id).then(response => {
				let res = response.body;
				if (res.errno === ERR_OK) {
					this.seller = Object.assign({}, this.seller, res.data); //花括号叫目标对象，this.seller、res.data是源对象。对象合并是指：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的，最终返回目标对象。
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
