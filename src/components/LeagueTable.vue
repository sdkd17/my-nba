<template>
	<div>
		<b-table striped hover :items="table" :fields="fields" :busy="loading">
			<template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
		</b-table>
	</div>
</template>

<script>
	export default {
		props: {
			games: Object,
			loading: Boolean
		},
		data(){
			return {
				fields: [
					{
						key: 'team',
						sortable: false,
					},
					{
						key: 'w',
						label: 'Wins',
						sortable: true,
					},
					{
						key: 'l',
						label: 'Loses',
						sortable: true,
					},
					{
						key: 'homeW',
						sortable: true,
					},
					{
						key: 'homeL',
						sortable: true,
					},
					{
						key: 'roadW',
						sortable: true,
					},
					{
						key: 'roadL',
						sortable: true,
					},
				],
				table: []
			}
		},
		watch: {
			loading: function () {
				// console.log(this.games)
				if (!this.loading) {
					let local_table = {};
					for (let teamId = 1; teamId <= 30;teamId++) {
						local_table[teamId] = {'team': null, 'w':0, 'l':0, 'homeW':0, 'homeL':0, 'roadW':0, 'roadL':0};
						this.games[teamId].forEach( game => {
							if (game.home_team.id === teamId){
								if (local_table[teamId].team == null) {
									local_table[teamId].team = game.home_team.abbreviation;
								}
								if (game.home_team_score > game.visitor_team_score) {
									local_table[teamId].w++;
									local_table[teamId].homeW++
								} else {
									local_table[teamId].l++;
									local_table[teamId].homeL++;
								}
							} else {
								if (game.visitor_team_score > game.home_team_score) {
									local_table[teamId].w++;
									local_table[teamId].roadW++
								} else {
									local_table[teamId].l++;
									local_table[teamId].roadL++;
								}
							}
						})
					}
					this.table = Object.values(local_table); 	
				}
				
				
			}
		}
	}
</script>