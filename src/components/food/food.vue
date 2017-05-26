<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" :alt="food.name">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="buy" @click.stop.prevent="cartFirst" v-show="food.count === 0 || !food.count">加入购物车
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @add="addFood"></cartcontrol>
					</div>
				</div>
				<split></split>
				<div class="info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingSelect :desc="desc" :selectType="selectType" :ratings="food.ratings"
								  :onlyContent="onlyContent"></ratingSelect>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Vue from "vue";
	import BScroll from 'better-scroll';
	import cartcontrol from "components/cartcontrol/cartcontrol";
	import split from "components/split/split";
	import ratingSelect from "components/ratingselect/ratingselect";

	const POSITION = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show () {
				this.showFlag = true;
				this.selectType = ALL; //进入的时候初始化
				this.onlyContent = true; //进入的时候初始化
				this.$nextTick(() => {
					if (!this.foodScroll) {
						this.foodScroll = new BScroll(this.$refs.food, {
							click: true
						})
					} else {
						this.foodScroll.refresh();
					}

				})
			},
			hide () {
				this.showFlag = false;
			},
			cartFirst (event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('add', event.target);
				Vue.set(this.food, "count", 1)
			},
			addFood (target) {
				this.$emit('add', target);
			}
		},
		components: {
			cartcontrol,
			ratingSelect,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		width: 100%
		z-index: 20
		background-color: #FFF
		transform: translate3d(0, 0, 0)
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.4s
		.food-content
			.image-header
				position: relative
				width: 100%
				height: 0
				padding-top: 100%
				img
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					border: 0
				.back
					position: absolute
					top: 10px
					left: 0
					.icon-arrow_lift
						display: block
						padding: 10px
						font-size: 20px
						color: #fff
			.content
				position: relative
				padding: 18px
				.title
					line-height: 14px
					margin-bottom: 8px
					font-size: 14px
					font-weight: 700
					color: #07111b
				.detail
					margin-bottom: 18px
					line-height: 10px
					height: 10px
					font-size: 0
					color: #93999f
					.count, .rating
						margin-right: 12px
						font-size: 10px
				.price
					font-weight: 700
					line-height: 24px
					.now
						margin-right: 8px
						font-size: 14px
						color: #f01414
					.old
						text-decoration: line-through
						font-size: 10px
						color: #93999f
				.buy
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					border-radius: 12px;
					font-size: 10px;
					color: #fff;
					background: #00a0dc;
				.cartcontrol-wrapper
					position: absolute
					right: 12px
					bottom: 12px
			.info
				padding: 18px
				.title
					line-height: 14px;
					margin-bottom: 6px;
					font-size: 14px;
					color: #07111b;
				.text
					line-height: 24px;
					padding: 0 8px;
					font-size: 12px;
					color: #4d555d;
			.rating
				padding-top: 18px
				.title
					line-height: 14px;
					margin-left: 18px;
					font-size: 14px;
					color: #07111b;
</style>
