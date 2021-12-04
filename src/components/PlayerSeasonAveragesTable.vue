<template>
	<div>
		<b-table :fields="fields" :items="averages">
		</b-table>	
		
	</div>
</template>

<script>
	export default {
		props: {
			averages: Array
		},
		data () {
			return {
				fields: [
					"season",
					{key: 'games_played', label: "GP"},
					"min",
					"pts",
					"reb",
					"ast",
					"stl",
					"blk",
					{key: "fg_pct", label: "FG%", formatter: 'porcentage'},
					{key: "fg3_pct", label: "FG3%" , formatter: 'porcentage'},
					{key: "ft_pct", label: "FT%", formatter: 'porcentage'},
					{key: "turnover", label: "TO"},
					"pf",
				]
			}
		},
		methods: {
			porcentage(value){
				return Math.trunc(value*100)
			}
		}
	}
</script>