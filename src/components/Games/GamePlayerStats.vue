<template>
	<b-container>	
		<b-table striped sticky-heder responsive outlined 
			:fields="fields" 
			:items="gameStats"
			table-variant="light">
			<template #cell(player)="data">
				<span class="font-weight-lighter"> {{data.item.player.last_name}}, {{data.item.player.first_name}} </span>
			</template>
			<template #cell(team)="data">
				<span class="font-weight-bold"> {{data.item.team.abbreviation}} </span>
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