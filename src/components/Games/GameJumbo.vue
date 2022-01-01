<template>

	<b-container class="text-center"> 
		<b-row> 
			<b-col> 
				<b-avatar :src="require(`@/assets/team-logos/${game.visitor_team.name}.png`)">	</b-avatar> 
				<span  class="h3 m-2"> {{game.visitor_team.name}} </span>
			</b-col>
			<b-col> 
				<span class="h1" size="lg"> @ </span>
			</b-col>
			<b-col> 
				<span	class="h3 m-2">{{game.home_team.name}}</span>
				<b-avatar :src="require(`@/assets/team-logos/${game.home_team.name}.png`)">	</b-avatar> 
			</b-col>
		</b-row>

		<b-row> 
			<b-col> <span v-show="!game.status.includes('ET')" class="h3">{{game.visitor_team_score}} </span> </b-col>
			<b-col> <span class="h5">{{game.status}}</span></b-col>
			<b-col> <span v-show="!game.status.includes('ET')" class="h3">{{game.home_team_score}}</span></b-col>
		</b-row>

		<b-row v-show="showGameStatsButton(game.status)"> 
			<b-col> </b-col>
			<b-col>
				<b-button-group>
				<b-button 
					v-b-toggle="`collapse-game-${game.id}`" 
					variant="primary"
					v-on:click="handleClick(game.id)">
						Game Stats
				</b-button>
				<b-button 
					v-b-toggle="`collapse-teams-${game.id}`" 
					variant="primary"
					v-on:click="handleClick(game.id)">
						Team Stats
				</b-button>
			</b-button-group>
			</b-col>
			<b-col> </b-col>
		</b-row>
		<b-row> 
			<b-col>
			<b-collapse v-bind:id="`collapse-game-${game.id}`" class="mt-2">
				<TeamComparison v-bind:gameStats="gameStats"/>
			</b-collapse>
			<b-collapse v-bind:id="`collapse-teams-${game.id}`" class="mt-2">
				<GamePlayerStats v-bind:gameStats="gameStats"/>
			</b-collapse>
		</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import TeamComparison from './TeamComparison.vue';
	import GamePlayerStats from './GamePlayerStats.vue';

	export default {
		components: {
			TeamComparison,
			GamePlayerStats
		},
		props: {
			game: Object,
		},
		data() {
			return {
				gameStats: []
			}
		},
		methods:{
			showGameStatsButton: function(status) {
				return !status.includes("ET");
			},
			handleClick: async function (gameId) {
				// this.gameId = gameId;

				const url = `https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}&per_page=40`;
				const response = await fetch(url , {method: 'get'});
				if (response.status >= 200 && response.status <= 299) {
					const jsonData = await response.json();
					this.gameStats = jsonData.data.sort(this.sortByTeamMinutes);
				} else {
					console.log(response.status, response.statusText);
				}

			},
			sortByTeamMinutes: function (a,b) {
				if (a.team.abbreviation < b.team.abbreviation) {
					return 1
				}
				if (a.team.abbreviation > b.team.abbreviation) {
					return -1
				}
				if (a.team.abbreviation === b.team.abbreviation) {
					
					if (a.min < b.min) {
						return 1
					}
					if(a.min > b.min) {
						return -1
					}
				}
				return 0
			}
		
		}
	}
</script>