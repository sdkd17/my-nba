<template>
	<b-container>	
		<b-table striped sticky-heder responsive 
			:fields="fields" 
			:items="gameStats"
			table-variant="light">
			<template #cell(player)="data">
				<h6 class="font-weight-lighter"> {{data.item.player.last_name}}, {{data.item.player.first_name}} </h6>
			</template>
			<template #cell(team)="data">
				{{data.item.team.abbreviation}}
			</template>
		</b-table>
	</b-container>
</template>

<script>
	
	export default {
		props: {
			gameStats: Array
		},
		data(){
			return {
				fields: [
					{key: "player", label: "Name", stickyColumn: true},
					{key: "team", label: "Team"	},
					"min",
					"pts",
					"reb",
					"ast",
					"stl",
					"blk",
					"fga",
					"fgm",
					{key: "fg_pct", label: "FG%"},
					"fg3a",
					"fg3m",
					{key: "fg3_pct", label: "FG3%"},
					"fta",
					"ftm",
					{key: "ft_pct", label: "FT%"},
					{key: "turnover", label: "TO"},
					"pf",
				]
			}
		}
	}
</script>