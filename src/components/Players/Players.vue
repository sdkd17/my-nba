<template>
	<b-container fluid> 
		<b-row> 
			<b-col> </b-col>
			<b-col> 
				<b-form inline class="m-3">
					<label for="inline-form-input-name">Write a player's name:</label>
					<b-form-input
						v-model="inputs.playerName"
						id="inline-form-input-name"
						class="mb-2 mr-sm-2 mb-sm-0"
						placeholder="Jane Doe"
					></b-form-input>

					<b-button variant="primary" v-on:click="searchPlayer">Search</b-button>
				</b-form>
			</b-col>
			<b-col> </b-col>
		</b-row>

		<b-row> 
			<b-col> 
				<b-table 
					sticky-header
					head-variant="dark"
					selectable
					select-mode="single"
					:items="setItems"
					:fields="fields" 
					@row-selected="onRowSelected">
				</b-table>
			</b-col>
		</b-row>

		<b-row v-if="showPlayerInfo"> 
			<!-- <b-col cols=2> </b-col> -->
			<b-col > 
				<b-jumbotron bg-variant="info" border-variant="dark">
					<template #header>{{playerSelected.first_name + ' ' + playerSelected.last_name}}</template>
					<template #lead>Plays for the {{playerSelected.team.full_name}}</template>
					<p>Plays at {{playerSelected.position}} position, weights {{playerSelected.weight_pounds}} pounds and is {{playerSelected.height_feet}}ft, {{playerSelected.height_inches}}in tall.</p>
					<b-button-group>
						<b-button 
							v-b-toggle.collapse-last-game
							variant="primary" 
							v-on:click="getLastGameStats">
								Last Game Stats
						</b-button>
						<b-button 
							v-b-toggle.collapse-season-averages
							variant="secondary" 
							v-on:click="getSeasonAverages">
								Season Averages
						</b-button>
					</b-button-group>

					<b-collapse id="collapse-season-averages" class="mt-2">
						<PlayerSeasonAveragesTable :averages="playerSelectedSeasonAverages"/>
					</b-collapse>

					<b-collapse id="collapse-last-game" class="mt-2">
						<p>Last games played</p>
					</b-collapse>
				</b-jumbotron>
			</b-col>
			<!-- <b-col cols=2> </b-col> -->
		</b-row>
	</b-container>
</template>

<script>
	import PlayerSeasonAveragesTable from './PlayerSeasonAveragesTable.vue';

	export default {
		components: {
			PlayerSeasonAveragesTable,
		},
		data () {
			return {
				inputs: {
					playerName: ''  
				},
				fields: ['name'],
				players:[],           //info of all the players
				selected: null,       //row of the table selected
				playerSelected: null, //selected player's info
				playerSelectedSeasonAverages: null,
			}
		},
		computed: {
			setItems: function() {
				return this.players.map(player => {
					return {
						name:player.first_name + ' ' + player.last_name,
						id: player.id
						}
				})
			},
			showPlayerInfo: function() {
				return this.selected != null
			}
		},
		methods: {
			searchPlayer: async function () { //more than 25 players?
				this.players = [];
				let error = false;
				let current_page = 1;
				let total_pages = 1;
				let url = '';
				do {
					url = `https://www.balldontlie.io/api/v1/players?search=${this.inputs.playerName}&page=${current_page}`;
					const response = await fetch(url, {method: 'get'});
					if (response.status >= 200 && response.status <=299) {
						const jsonData = await response.json(); 
						this.players.push(...jsonData.data);
						total_pages = jsonData.meta.total_pages
						current_page++;
						// console.log(current_page);
					} else {
						console.log(response.status, response.statusText);
						error = true;
					}
				} while (!error && current_page <= total_pages && current_page <= 10);
			},
			getLastGameStats: function() { //maybe watchers?

			},
			getSeasonAverages: function() {

			},
			onRowSelected: async function(row){
				//row = {name:'', id:''}, selected row from the table
				// console.log(row);
				this.selected = row[0];
				this.playerSelected = this.players.find( player => player.id === this.selected.id);

				const url = `https://www.balldontlie.io/api/v1/season_averages?&player_ids[]=${this.selected.id}`;
				const response = await fetch(url, {method: 'get'});
				if (response.status >= 200 && response.status <= 299) {
					const jsonData = await response.json();
					this.playerSelectedSeasonAverages = jsonData.data;
				} else {
					console.log(response.status, response.statusText);
				}
			}
		}
	}
</script>