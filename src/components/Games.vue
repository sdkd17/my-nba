<template>
	<b-container> 
		<b-row> 
			<b-form inline> 
				<b-form-datepicker id="input-date" v-model="inputs.date" class="mb-2 mr-sm-2 mb-sm-0"> </b-form-datepicker>
				<b-button variant="primary" v-on:click="getGames">Get Games</b-button>
			</b-form>
		</b-row>

		<b-row>	
			<b-col cols="8" offset="2"> 
				<b-list-group>
					<b-list-group-item 
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
		const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
		return {
			inputs:{
				date: todayString
			},
			games: []
		}
	},
	methods: {
		getGames: function() {
			fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${this.inputs.date}`, {method: 'get'}).
				then(response => {
					return response.json()
				}).then(jsonData => {
					this.games = jsonData.data;
				});  
		}
	},
	created() {
		this.getGames()
	}
}
</script>