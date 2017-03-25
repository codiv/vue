<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px"><em class="icon" v-show="item.type>0" :class="classMain[item.type]"></em>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper"></div>
	</div>
</template>

<script>
const ERR_OK = 0
export default {
	data () {
		return {
			goods: [],
			classMain: []
		}
	},
	created () {
		this.classMain = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		this.$http.get('/api/goods').then((response) => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.goods = response.data
			}
		})
	}
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px
		background-color:#f3f5f7
		.menu-item
			display:table
			height:54px
			width:56px
			padding:0 12px
			line-height:14px
			&.current
				position:relative
				z-index:10
				margin-top:-1px
				background-color:#FFF
			.text
				display: table-cell
				vertical-align:middle	
				font-size:12px
				border-1px(rgba(7,17,27,0.1))
				font-weight:200
				.icon
					display:inline-block
					vertical-align:top
					height:12px
					width:12px
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-images("decrease_3")
					&.discount
						bg-images("discount_3")
					&.guarantee
						bg-images("guarantee_3")
					&.invoice
						bg-images("invoice_3")
					&.special
						bg-images("special_3")
	.foods-wrapper
		flex:1
		
		
</style>
