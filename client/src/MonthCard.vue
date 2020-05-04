<template>
<div class="col-month" @click.self="closeModal">
  <div class="month-card">
      <div class="month-card" :style="{ backgroundColor: calcColor }">
		<div class="month-card-header">
			<div class="month-card-header_number">
				<span :style="{ color: calcColor }">
					<h3>{{ numModify }}</h3>
				</span>
			</div>
			<h2>{{ month.name }}</h2>
			<h4>{{ year }}</h4>
		</div>
		<div class="month-card-content">
            <form action="" v-if="isAddMonth">
                <table class="month-card-content_table">
                    <tr :style="{ backgroundColor: calcDarkColor }">
                            <td class="month-card-content_table-column-left"><span>Аренда:</span></td>
                            <td  class="form-field month-card-content_table-column-right"><input class="input-field" type="text" v-model="month.cost"></td>
                    </tr>
                    <tr :style="{ backgroundColor: calcLightColor }">
                            <td class="month-card-content_table-column-left"><span>К/У:</span></td>
                            <td class="month-card-content_table-column-right"><input class="input-field" type="text" v-model="month.ku"></td>
                    </tr>
                    <tr :style="{ backgroundColor: calcDarkColor }">
                        <td class="month-card-content_table-column-left"><span>Электричество:</span></td>
                        <td class="month-card-content_table-column-right"><input class="input-field" type="text" v-model="month.electric"></td>
                    </tr>
                    <tr :style="{ backgroundColor: calcLightColor }">
                        <td class="month-card-content_table-column-left"><span>Вода:</span></td>
                        <td class="month-card-content_table-column-right"><input class="input-field" type="text" v-model="month.water"></td>
                    </tr>
                    <tr :style="{ backgroundColor: calcDarkColor }">
                        <td class="month-card-content_table-column-left"><span>Сдано:</span></td>
                        <td class="month-card-content_table-column-right"><input class="input-field" type="text" v-model="month.deposited"></td>
                    </tr>
                </table>
            </form>
			<div class="month-card-content_div" v-else>
				<h2>Не оплачено</h2>
                <button
				class="btn btn-add"
				:style="{ color: calcColor }"
				@click="isAddMonth = true"
			>Добавить</button>
			</div>
		</div>
		<div class="month-card-footer">
            <button
				class="btn btn-cancel"
				:style="{ color: calcColor }"
				@click="closeModal"
			>Отмена</button>
			<button
				class="btn btn-edit"
				:style="{ color: calcColor }"
				@click="onSave($event, num)"
			>Сохранить</button>
		</div>
	</div>
  </div>
</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		props: ["month", "year", "num", "monthColor"],
		data() {
			return {
                isAddMonth: this.month.deposited ? true : false
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
			numModify() {
				return +this.num + 1 < 10 ? "0" + (+this.num + 1) : +this.num + 1;
			}
		},
		methods: {
            ...mapActions(['saveCard']),
            closeModal() {
                this.$emit('close-modal')
            },
            onSave(event,index){
                console.log(this.month.deposited)
                this.$store.dispatch('saveCard', {
                    "year": this.year,
                    "monthIndex": index,
                    "monthData": {
                        "cost" : this.month.cost,
                        "ku" : this.month.ku,
                        "deposited" : this.month.deposited,
                        "electric": this.month.electric,
                        "water": this.month.water,
                    }
                }).then(response => {
                    console.log(response);
                    this.closeModal();
                })
            }
		},
	};
</script>

<style>
.col-month {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background: rgb(64, 64, 64, .75);
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.month-card {
		display: inline-block;
		min-width: 280px;
        min-height: 320px;
		padding: 0;
		margin: 1rem;
		color: white;
		border-radius: 5px;
	}
.month-card-flip {
    position: relative;
    z-index: 1;
    animation-name: flip;
    animation-duration: 0.5s;
}
.month-card-header_number {
    display: flex;
    justify-content: center;
    font-size: 1em;
}
.month-card-header_number span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #fff;
    opacity: 0.5;
    border-radius: 0 0 20% 20%;
}
.month-card-header h2 {
    margin: 0;
    font-weight: bold;
    font-size: 3em;
    padding: 20px 10px 0;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
.month-card-header h4 {
    font-size: 1.2em;
    padding: 0 10px 20px;
    opacity: 0.4;
    letter-spacing: 0.05em;
    text-align: center;
}
.month-card-content {
    padding: 10px 10px;
}
.month-card-content_table {
    width: 100%;
    margin: 0;
    border-collapse: collapse;
}
.month-card-content_table tr {
    height: 3em;
}
.month-card-content_table td {
    padding: 0 10px;
    font-size: 1.2em;
}
.month-card-content_table-column-left {
    text-align: left;
}
.month-card-content_table-column-right {
    text-align: right;
}
.input-field {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    border: 1px solid;
    text-align: center;
    outline-style: none;
    border-radius: 10px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.25);
}
.month-card-content_div {
    display: flex;
    min-height: 180px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
    height: 86px;
}
.btn-add {
    width: 80%;
}
.month-card-footer {
    margin: 10px 0 15px;
    display: flex;
    justify-content: space-around;
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