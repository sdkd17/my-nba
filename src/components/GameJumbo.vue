<template>
	<b-jumbotron>
		<template #header> 
			<b-avatar :src="require(`@/assets/team-logos/${game.visitor_team.name}.png`)">	</b-avatar> 
			{{game.visitor_team.name}} @ {{game.home_team.name}} 
			<b-avatar :src="require(`@/assets/team-logos/${game.home_team.name}.png`)">	</b-avatar> 
		</template>
		<template #lead> 
			<span v-if="game.status.includes(':')"> {{game.status}} </span>
			<span v-else>{{game.visitor_team_score}} {{game.status}} {{game.home_team_score}}</span>
		</template>
		<hr class="my-4">
		

		<div>
			<b-button 
				v-b-toggle="`collapse-${game.id}`" 
				variant="primary"
				v-on:click="gameId=game.id.toString()">
					Game Stats
			</b-button>
			<b-collapse v-bind:id="`collapse-${game.id}`" class="mt-2">
				<TeamComparison v-bind:gameId="gameId"/>
			</b-collapse>
		</div>
	</b-jumbotron>
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
		
	}
</script>