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
			games: Array,
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
			loading: function() {
				//returns an array {team: abbreviation, w:0, l:0, homeW:0, homeL:0, roadW:0, roadL:0}
					let items_helper = {};
					for (let teamId = 1; teamId <= 30; teamId++) {
						items_helper[teamId] = {'team': null, 'w':0, 'l':0, 'homeW':0, 'homeL':0, 'roadW':0, 'roadL':0};
					}
					
					this.games.forEach( game => {
						if (items_helper[game.home_team.id].team == null) {
							items_helper[game.home_team.id].team = game.home_team.abbreviation
						}
						
						if (game.home_team_score > game.visitor_team_score) {
							// home team won the game	
							items_helper[game.home_team.id].w++;
							items_helper[game.home_team.id].homeW++;
							items_helper[game.visitor_team.id].l++;
							items_helper[game.visitor_team.id].roadL++;
						} else {
							//visitor team won the game
							items_helper[game.visitor_team.id].w++;
							items_helper[game.visitor_team.id].roadW++;
							items_helper[game.home_team.id].l++;
							items_helper[game.home_team.id].homeL++;
						}
					
					})
					// console.log(items_helper);
					this.table = Object.values(items_helper);
			}
		}
	}
</script>