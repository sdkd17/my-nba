<template>
	<b-container fluid> 
		<b-row> 
			<b-col> </b-col>
			<b-col class="col-10">
				<b-form class="m-3">
					<b-form-datepicker id="input-date" v-model="date" :min="min" class="mb-2 mr-sm-2 mb-sm-0"> </b-form-datepicker>
					<!-- <b-button variant="primary" v-on:click="getGames">Get Games</b-button> -->
				</b-form>
			</b-col>
			<b-col> </b-col>
			
		</b-row>

		<b-row>	
			<b-col cols="10" offset="1"> 
				<b-list-group>
					<b-list-group-item variant="secondary"
						v-for="game in games"
						v-bind:key="game.id"> 
							<GameJumbo 
								v-bind:game="game"
							/>
					</b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import GameJumbo from './GameJumbo.vue';

export default {
	components: {
		GameJumbo
	},
	data () {
		const today = new Date();
		const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
		const minDate = new Date(2021,9,19); //start of the season
		return {
			
			date: todayString,
			
			games: [],
			min: minDate
		}
	},
	watch: {
		date: function () {
			this.getGames()
		}
	},
	methods: {
		getGames: function() {
			fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${this.date}`, {method: 'get'}).
				then(response => {
					if (response.status >= 200 && response.status <= 299) {
						return response.json();
					} else {
						throw Error(response.statusText);
					}
				}).then(jsonData => {
					if (this.date > this.today) {
						this.games = jsonData.data.sort( this.compareStatus);
					} else {
						this.games = jsonData.data;
					}
				}).catch( (error) => {
					console.log(error);
				}) ;  
		},
		compareStatus: function(a,b) {
			const re = /^(\d{1,2}):(\d\d)/;
			const matchA =  a.status.match(re);
			const matchB =  b.status.match(re);
			if (parseInt(matchA[1]) < parseInt(matchB[1])) {
				return -1;
			}
			if (parseInt(matchA[1]) > parseInt(matchB[1])) {
				return 1;
			}
			if (parseInt(matchA[1]) == parseInt(matchB[1])) {
				if ( (parseInt(matchA[2]) < parseInt(matchB[2])) ) {
					return -1;
				} 
				if ( (parseInt(matchA[2]) > parseInt(matchB[2])) ) {
					return 1;
				}
			}
			return 0;
		}
	},
	created() {
		this.getGames()
	}
}
</script>