<template>
	<div class="year-card" :style="{ backgroundColor: calcColor }" :class="{'year-card-flip': isActive}">
		<div class="year-card-header">
			<div class="year-card-header_number">
				<span :style="{ color: calcColor }">
					<h3>{{ numModify }}</h3>
				</span>
			</div>
			<h2>{{ month.name }}</h2>
			<h4>{{ year }}</h4>
		</div>
		<div class="year-card-content">
			<table class="year-card-content_table" v-if="month.deposited">
				<tr :style="{ backgroundColor: calcDarkColor }">
					<td class="year-card-content_table-column-left">Аренда:</td>
					<td class="year-card-content_table-column-right">{{ month.cost }}</td>
				</tr>
				<tr :style="{ backgroundColor: calcLightColor }">
					<td class="year-card-content_table-column-left">К/У:</td>
					<td class="year-card-content_table-column-right">{{ month.ku }}</td>
				</tr>
				<tr :style="{ backgroundColor: calcDarkColor }">
					<td class="year-card-content_table-column-left">Сдано:</td>
					<td class="year-card-content_table-column-right">{{ month.deposited }}</td>
				</tr>
				<tr :style="{ backgroundColor: calcLightColor }">
					<td class="year-card-content_table-column-left">Итого:</td>
					<td class="year-card-content_table-column-right">{{ calcResult }}</td>
				</tr>
			</table>

			<div class="year-card-content_div" v-else>
				<h2>Не оплачено</h2>
			</div>
		</div>
		<div class="year-card-footer">
			<button
				class="btn btn-edit"
				:style="{ color: calcColor }"
				@click="editCard($event, num)"
			>Редактировать</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["month", "year", "num", "monthColor"],
		data() {
			return {
				isActive: false
			};
		},
		computed: {
			...mapGetters(['isLoaded']),
			calcColor() {
				return `rgb(${this.monthColor})`;
			},
			calcDarkColor() {
				let darker = this.monthColor.split(",");
				return `rgb(${darker
					.map(item => (item - 10 > 0 ? item - 10 : 0))
					.join(",")})`;
			},
			calcLightColor() {
				let lighter = this.monthColor.split(",");
				return `rgb(${lighter
					.map(item => (+item + 10 < 256 ? +item + 10 : 256))
					.join(",")})`;
			},
			calcResult() {
				if(this.month.deposited) {
					let total = +this.month.deposited - (+this.month.cost + +this.month.ku);
					return total > 0 ? "+" + total : total;
				} else {
					return '';
				}
			},
			numModify() {
				return +this.num + 1 < 10 ? "0" + (+this.num + 1) : +this.num + 1;
			}
		},
		methods: {
			editCard(event, index) {
				this.isActive = true
				setTimeout(()=> this.isActive = false, 500)
				this.$emit('fliper', index)
			}
		},
	};
</script>

<style>
	.year-card {
		display: inline-block;
		min-width: 220px;
		padding: 0;
		margin: 1rem;
		color: white;
		border-radius: 5px;
	}
	.year-card-flip {
		position: relative;
		z-index: 1;
		animation-name: flip;
		animation-duration: 0.5s;
	}
	.year-card-header_number {
		display: flex;
		justify-content: center;
	}
	.year-card-header_number span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background-color: #fff;
		opacity: 0.5;
		border-radius: 0 0 20% 20%;
	}
	.year-card-header h2 {
		margin: 0;
		font-weight: bold;
		font-size: 2em;
		padding: 20px 10px 0;
		text-align: center;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.year-card-header h4 {
		margin: -5px 0 0 0;
		padding: 0 10px 20px;
		opacity: 0.4;
		letter-spacing: 0.05em;
		text-align: center;
	}
	.year-card-content {
		padding: 10px 10px;
	}
	.year-card-content_table {
		width: 100%;
		margin: 0;
		border-collapse: collapse;
	}
	.year-card-content_table td {
		padding: 0 10px;
		font-size: 1.2em;
	}
	.year-card-content_table-column-left {
		text-align: left;
	}
	.year-card-content_table-column-right {
		text-align: right;
	}
	.year-card-content_div {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		height: 86px;
	}
	.year-card-footer {
		margin: 10px 0 15px;
		display: flex;
		justify-content: center;
	}
	.btn {
		text-align: center;
		padding: 10px;
		border: none;
		background-color: #fff;
		opacity: 0.7;
		border-radius: 5px;
		outline: none;
		cursor: pointer;
	}
	.btn:hover {
		opacity: 0.9;
		transition: 0.3s;
	}

	@keyframes flip {
		0% {
			-webkit-transform: rotateY(0deg);
			transform: rotateY(0deg);
		}
		75% {
			-webkit-transform: rotateY(360deg) scale(1.5);
			transform: rotateY(360deg) scale(1.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>
