<template>
	<div class="header">
		<div class="header-info">
			<div class="header-img">
				<img v-bind:src="seller.avatar">				
			</div>
			<div class="header-main">
				<div class="header-title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div v-if='seller.supports' class="supports">
					<span class="icon" :class="classMain[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-cout" @click="onDetailShow">
				<span>{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="header-bulletin" @click="onDetailShow">
			<span class="bulletin-icon"></span><span class="bulletin">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">			
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">				
					<div class="detail-main">				
						<h1>{{seller.name}}</h1>
						<div class="star-wrapper">							
							<star :size="48" :score="seller.score"></star>
						</div>
						<v-title dataText="优惠信息"></v-title>
						<ul class="supports" v-if="seller.supports">
							<li v-for="(item , index) in seller.supports" class="support-item">
								<span class="icon" :class="classMain[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<v-title dataText="商家公告"></v-title>
						<div class="bulletin">
							<p>{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="onDetailClcose"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from 'components/star/star'
import title from 'components/detail-title/detail-title'

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			detailShow: false
		}
	},
	created () {
		this.classMain = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
	},
	methods: {
		onDetailShow () {
			this.detailShow = true
		},
		onDetailClcose () {
			this.detailShow = false
		}
	},
	components: {
		star,
		'v-title': title
	}
}
</script>

<style  lang="stylus">
@import "../../common/stylus/mixin"
.header
	position:relative
	background-color:rgba(7,17,27,0.5)
	overflow:hidden
	.header-info
		position:relative
		color:#FFF;
		padding:24px 12px 18px 24px;
		font-size:0px;
		.header-img
			display:inline-block	
			vertical-align:top
			img
				height:64px;
				width:64px;
				border-radius:4px;
		.header-main
			display:inline-block
			margin-left:16px
			.header-title
				padding:2px 0 8px 0px;
				.brand
					display:inline-block
					vertical-align:top
					width:30px
					height:18px
					bg-images("brand")
					background-size:30px 18px
					background-repeat:no-repeat
				.name
					font-size:16px
					line-height:18px
					font-weight:bold
					margin-left:6px;
					color:rgb(255,255,255)
			.description
				padding-bottom:10px
				font-size:10px
				line-height: 12px
				color:rgb(255,255,255)
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
					display:inline-block
					font-size:10px;
		.support-cout
			position:absolute
			background-color:rgba(0,0,0,0.2)
			right:12px
			bottom:14px
			padding:0px 8px
			border-radius:14px
			height:24px
			line-height:24px
			text-align:center
			span
				font-size:10px;
				color:rgb(255,255,255)
			.icon-keyboard_arrow_right
				margin-left:2px
				line-height:24px
				font-size:10px
	.header-bulletin
		position:relative
		background-color:rgba(7,17,27,0.2)
		padding:0 22px 0 12px
		height:28px
		line-height:28px
		white-space:nowrap
		overflow:hidden
		text-overflow:ellipsis
		color:rgb(255,255,255)
		.bulletin-icon
			display:inline-block
			vertical-align:top
			width:22px;
			height:12px
			margin-top:7px
			bg-images("bulletin")
			background-size:22px 12px
			background-repeat:no-repeat
		.bulletin
			vertical-align:top
			font-size:10px
			margin-left:4px
		.icon-keyboard_arrow_right
			position:absolute
			top:8px
			right:12px
			font-size:10px
	.background
		position:absolute
		top:0
		left:0
		z-index:-1
		width:100%
		height:100%
		filter:blur(10px)
	.detail
		position:fixed
		z-index:100
		top:0
		left:0
		height:100%
		width:100%
		overflow:auto
		background-color:rgba(7,17,27,0.8)		
		transition:all 0.5s	
		.detail-close
			position: relative
			width: 32px
			height: 32px
			margin: -64px auto 0 auto
			clear: both
			font-size: 32px
			.icon-close
				font-size:32px
				color:rgba(255,255,255,0.5)
		.detail-wrapper
			width:100%
			min-height:100%
			color:rgb(255,255,255)
			.detail-main
				padding:64px 0
				h1
					font-size:16px
					line-height:16px
					text-align:center
					color:rgb(255,255,255)
					font-weight:700
				.bulletin
					width:80%
					margin:0 auto
					p
						font-size:12px
						padding:0 12px
						line-height:24px
						font-weight:200
				.star-wrapper
					margin-top:18px
					padding:2px 0
					text-align:center
				.supports
					width: 80%
					margin: 0 auto
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
							line-height: 16px
							font-size: 12px
		&.fade-leave-active
			opacity:1
			background-color:rgba(7,17,27,0.8)	
		&.fade-enter,&.fade-leave-active
			opacity:0
			background-color:rgba(7,17,27,0.2)
			
			
</style>
