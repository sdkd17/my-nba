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
			<b-col> <span class="h3">{{game.visitor_team_score}}</span> </b-col>
			<b-col> <span class="h5">{{game.status}}</span></b-col>
			<b-col> <span class="h3">{{game.home_team_score}}</span></b-col>
		</b-row>

		<b-row v-show="showGameStatsButton(game.status)"> 
			<b-col> </b-col>
			<b-col>
				<b-button 
					v-b-toggle="`collapse-${game.id}`" 
					variant="primary"
					v-on:click="gameId=game.id.toString()">
						Game Stats
				</b-button>
			</b-col>
			<b-col> </b-col>
		</b-row>
		<b-row> 
			<b-col>
			<b-collapse v-bind:id="`collapse-${game.id}`" class="mt-2">
				<TeamComparison v-bind:gameId="gameId"/>
			</b-collapse>
		</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import TeamComparison from './TeamComparison.vue';

	export default {
		components: {
			TeamComparison
		},
		props: {
			game: Object,
		},
		data() {
			return {
				gameId:''
			}
		},
		methods:{
			showGameStatsButton: function(status){
				return !status.includes("ET");
			}
		}
		
	}
</script>