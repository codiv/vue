<template>
	<div id="header">
		<div class="header-wrapper">
			<div class="avatar"><img :src="seller.avatar" height="64" width="64"></div>
			<div class="header-info">
				<div class="title">
					<span class="icon"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					<span>{{seller.description}}/{{seller.deliveryTime}}</span>分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMain[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="onDetailShow()">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="detail-wrapper" @click="onDetailShow()">
			<span class="icon"></span><span class="text">{{seller.bulletin}}</span><span
				class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="background"><img :src="seller.avatar" width="100%" height="100%"></div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-content clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<v-title dataText="优惠信息"></v-title>
						<ul class="supports" v-if="seller.supports">
							<li v-for="item in seller.supports" class="support-item">
								<span class="icon" :class="classMain[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<v-title dataText="商家公告"></v-title>
						<div class="bulletin"><p class="content">{{seller.bulletin}}</p></div>
					</div>
				</div>
				<div class="detail-close" @click="onDetailHidden()">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star'
	import title from '../detail-title/title'
	export default {
		data () {
			return {
				detailShow: false,
				classMain: []
			}
		},
		methods: {
			onDetailShow () {
				this.detailShow = true
			},
			onDetailHidden () {
				this.detailShow = false
			}
		},
		props: {
			seller: {}
		},
		created () {
			this.classMain = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		components: {
			star,
			'v-title': title
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	#header
		position:relative
		background:rgba(7, 17, 27, 0.5)
		overflow:hidden
		color:#FFF
		.background
			position:absolute
			top:0
			left:0
			z-index:-1
			width:100%
			height:100%
			filter:blur(10px)
		.header-wrapper
			position:relative
			padding:24px 12px 18px 24px
			font-size:0
			.avatar
				display:inline-block
				vertical-align:top
				img
					border-radius:2px
			.header-info
				display:inline-block
				margin-left:16px
				.title
					margin:2px 0 8px 0
					.icon
						display:inline-block
						bg-images("brand")
						background-size:30px 18px
						vertical-align:top
						width:30px
						height:18px
					.name
						margin-left:6px
						font-size:16px
						line-height:18px
						font-weight:700
				.description
					margin-bottom:10px
					line-height:12px
					font-size:12px
				.supports
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-images("decrease_1")
						&.discount
							bg-images("discount_1")
						&.guarantee
							bg-images("guarantee_1")
						&.invoice
							bg-images("invoice_1")
						&.special
							bg-images("special_1")
					.text
						line-height:12px
						font-size:10px
			.support-count
				position:absolute
				right:12px
				bottom:14px
				padding:0 8px
				height:24px
				line-height:24px
				border-radius:14px
				background:rgba(0, 0, 0, 0.2)
				text-align:center
				.count
					vertical-align:top;
					font-size:10px;
				.icon-keyboard_arrow_right
					margin-left:2px;
					line-height:24px;
					font-size:10px;
		.detail-wrapper
			position:relative
			height:28px
			line-height:28px
			padding:0 22px 0 12px
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			background:rgba(7, 17, 27, 0.2)
			.icon
				display:inline-block
				vertical-align:top
				margin-top:8px
				width:22px
				height:12px
				bg-images("bulletin")
				background-size:22px 12px
				background-repeat:no-repeat
			.text
				vertical-align:top
				margin:0 4px
				font-size:10px
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				right:12px
				top:8px
		.detail
			position:fixed
			top:0
			left:0
			z-index:100
			height:100%
			width:100%
			transition:all 0.5s
			overflow:auto
			background-color:rgba(7, 17, 27, 0.8)
			&.fade-leave, &.fade-leave-active
				opacity:1
			&.fade-enter, &.fade-leave-active
				opacity:0
			.detail-content
				width:100%
				min-height:100%
				.detail-main
					padding:64px 0
					.name
						line-height:16px
						text-align:center
						font-size:16px
						font-weight:700
					.star-wrapper
						margin-top: 18px;
						padding: 2px 0;
						text-align: center;
					.bulletin
						width:80%
						margin:0 auto
						.content
							padding:0 12px
							line-height:24px
							font-size:12px
					.supports
						width:80%
						margin:0 auto
						.support-item
							padding: 0 12px
							margin-bottom: 12px
							font-size: 0
							.icon
								display: inline-block
								width: 16px
								height: 16px
								vertical-align: top
								margin-right: 6px
								background-size: 16px 16px
								background-repeat: no-repeat
								&.decrease
									bg-images("decrease_1")
								&.discount
									bg-images("discount_1")
								&.guarantee
									bg-images("guarantee_1")
								&.invoice
									bg-images("invoice_1")
								&.special
									bg-images("special_1")
							.text
								line-height:16px
								font-size:12px
			.detail-close
				margin-top:-64px
				text-align:center
				height:32px
				width:100%
				.icon-close
					font-size:32px
					color:rgba(255, 255, 255, 0.5)


</style>
