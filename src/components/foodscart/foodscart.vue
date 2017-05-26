<template>
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li class="food border-1px" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">￥{{food.price*food.count}}</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food" @add="addFood"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import cartcontrol from 'components/cartcontrol/cartcontrol'

	export default{
		props: {
			selectFoods: {
				type: Array,
				default () {
					return []
				}
			},
			fold: {
				type: Boolean,
				default () {
					return true
				}
			}
		},
		created () {
		},
		methods: {
			addFood(target) {
				this.$refs.onshopcart.drop(target)
			},
			_listContent () {
				this.listContent = new BScroll(this.$refs.listContent, {
					click: true
				})
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			}
		},
		computed: {
			listShow () {
				let show = this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.listContent) {
							this._listContent();
						} else {
							this.listContent.refresh();
						}
					})
				}
				return show;
			}
		},
		components: {
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl";
	.shopcart-list
		position: absolute
		top: 0
		left: 0
		z-index: -1
		width: 100%
		transform: translate3d(0, -100%, 0)
		&.fold-enter, &.fold-leave-active
			transform: translate3d(0, 0, 0)
		&.fold-enter-active, &.fold-leave-active
			transition: all 0.5s
		.list-header
			height: 40px
			line-height: 40px
			padding: 0 18px
			background: #f3f5f7
			border-1px(rgba(7, 17, 27, 0.1))
			.title
				float: left
				font-size: 14px
				color: #07111b
			.empty
				float: right
				font-size: 12px
				color: #00a0dc
		.list-content
			padding: 0 18px
			max-height: 217px
			overflow: hidden
			background: #fff
			.food
				position: relative
				padding: 12px 0
				box-sizing: border-box
				border-1px(rgba(7, 17, 27, 0.1))
				.name
					line-height: 24px
					font-size: 14px
					color: #07111b
				.price
					position: absolute
					right: 90px
					bottom: 12px
					line-height: 24px
					font-size: 14px
					font-weight: 700
					color: #f01414
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 6px
</style>
