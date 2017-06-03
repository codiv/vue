<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite"></span>
					<span class="text">收藏</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper border-1px">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="supports">
					<li class="support-item border-1px" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul>
					<li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import star from 'components/star/star';
	import split from 'components/split/split';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				classMap: []
			}
		},
		watch: {
			'seller' () {
				this.$nextTick(() => {
					this._initScroll();
					this._initPics();
				})
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			})
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		methods: {
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			},
			_initPics () {
				if (this.seller.pics) {
					let picWidth = 120;
					let picMargin = 6;
					let width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
					this.$refs.picList.style.width = width + "px";
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							})
						} else {
							this.picScroll.refresh();
						}
					})
				}
			}
		},
		components: {
			star,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden;
		.overview
			position: relative;
			padding: 18px;
			.title
				margin-bottom: 8px;
				line-height: 14px;
				color: #07111b;
				font-size: 14px;
			.desc
				padding-bottom: 18px;
				font-size: 0;
				border-1px(rgba(7, 17, 27, 0.1))
				.star
					display: inline-block;
					margin-right: 8px;
					vertical-align: top;
				.text
					display: inline-block;
					margin-right: 12px;
					line-height: 18px;
					vertical-align: top;
					font-size: 10px;
					color: #4d555d;
			.remark
				display: flex;
				padding-top: 18px;
				.block
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					h2
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color: #93999f;
					&:last-child
						border: none
					.content
						line-height: 24px;
						font-size: 10px;
						color: #07111b;
						.stress
							font-size: 24px;
			.favorite
				position: absolute;
				width: 50px;
				right: 11px;
				top: 18px;
				text-align: center;
				.icon-favorite
					display: block;
					margin-bottom: 4px;
					line-height: 24px;
					font-size: 24px;
					color: #d4d6d9;
				.text
					line-height: 10px;
					font-size: 10px;
					color: #4d555d;
		.bulletin
			padding: 18px 18px 0 18px;
			.title
				margin-bottom: 8px;
				line-height: 14px;
				color: #07111b;
				font-size: 14px;
			.content-wrapper
				padding: 0 12px 16px 12px;
				position: relative;
				border-1px(rgba(7, 17, 27, 0.1))
				.content
					line-height: 24px;
					font-size: 12px;
					color: #f01414;
			.supports
				.support-item
					padding: 16px 12px;
					position: relative;
					font-size: 0;
					border-1px(rgba(7, 17, 27, 0.1))
					&:last-child
						border-none()
					.icon
						display: inline-block;
						width: 16px;
						height: 16px;
						vertical-align: top;
						margin-right: 6px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						&.decrease
							bg-images("decrease_4")
						&.discount
							bg-images("discount_4")
						&.guarantee
							bg-images("guarantee_4")
						&.invoice
							bg-images("invoice_4")
						&.special
							bg-images("special_4")
					.text
						line-height: 16px;
						font-size: 12px;
						color: #07111b;
		.pics
			padding: 18px;
			.title
				margin-bottom: 12px;
				line-height: 14px;
				color: #07111b;
				font-size: 14px;
			.pic-wrapper
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.pic-item
					display: inline-block;
					margin-right: 6px;
					width: 120px;
					height: 90px;
		.info
			padding: 18px 18px 0 18px;
			color: #07111b;
			.title
				padding-bottom: 12px;
				line-height: 14px;
				position: relative;
				font-size: 14px;
				border-1px(rgba(7, 17, 27, 0.1))
			.info-item
				padding: 16px 12px;
				line-height: 16px;
				position: relative;
				font-size: 12px;
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
</style>
