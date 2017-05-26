<template>
	<div class="star" :class="starSize">
		<span v-for="item in itemClass" :class="item" class="star-item"></span>
	</div>

</template>

<!--suppress JSUnresolvedVariable -->
<script type="text/ecmascript-6">
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_OFF = 'off'
	const CLS_HALF = 'half'
	export default {
		props: {
			size: Number,
			score: Number
		},
		computed: {
			starSize () {
				return 'star-' + this.size
			},
			itemClass () {
				let result = []
				let integer = Math.floor(this.score)
				let remainder = this.score % 1 !== 0
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON)
				}
				if (remainder) {
					result.push(CLS_HALF)
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.star
		font-size:0
		.star-item
			display:inline-block
			background-repeat:no-repeat
		&.star-48 .star-item
			width:20px
			height:20px
			margin-right:22px
			background-size:20px 20px
			&:last-child
				margin-right:0
		&.star-48 .on
			bg-images("star48_on")
		&.star-48 .half
			bg-images("star48_half")
		&.star-48 .off
			bg-images("star48_off")
		&.star-36 .star-item
			width:15px
			height:15px
			margin-right:6px
			background-size:15px 15px
			&:last-child
				margin-right:0
		&.star-36 .on
			bg-images("star36_on")
		&.star-36 .half
			bg-images("star36_half")
		&.star-36 .off
			bg-images("star36_off")
		&.star-24 .star-item
			width:10px
			height:10px
			margin-right:3px
			background-size:10px 10px
			&:last-child
				margin-right:0
		&.star-24 .on
			bg-images("star24_on")
		&.star-24 .half
			bg-images("star24_half")
		&.star-24 .off
			bg-images("star24_off")

</style>
