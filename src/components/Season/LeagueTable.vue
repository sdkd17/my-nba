<template>
	<div>
		<b-table 
			striped hover 
			:items="table" 
			:fields="fields" 
			:busy="loading" 
			:head-variant="headVariant"
			>
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
			loading: Boolean,
			sortBy: Number,
		},
		data(){
			return {
				// sortBy: 'w',
				// sortDesc: true,
				headVariant: "dark",
				fields: [
					{
						key: 'team',
					},
					{
						key: 'conference',
					},
					{
						key: 'division',
					},
					{
						key: 'w',
						label: 'Wins',
					},
					{
						key: 'l',
						label: 'Loses',
					},
					{
						key: 'homeW',
					},
					{
						key: 'homeL',
					},
					{
						key: 'roadW',
					},
					{
						key: 'roadL',
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
						items_helper[teamId] = {'team': null, 'conference': null, 'division': null, 'w':0, 'l':0, 'homeW':0, 'homeL':0, 'roadW':0, 'roadL':0};
					}
					
					this.games.forEach( game => {
						if (items_helper[game.home_team.id].team == null) {
							items_helper[game.home_team.id].team = game.home_team.abbreviation;
							items_helper[game.home_team.id].conference = game.home_team.conference;
							items_helper[game.home_team.id].division = game.home_team.division;
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
				this.table = Object.values(items_helper).sort(this.compareWins);
				// this.tableConference = Object.values(items_helper).sort(this.compareConferenceWins);
				// this.tableDivision = Object.values(items_helper).sort(this.compareDivisionWins);
			},
			sortBy: function () {
				switch(this.sortBy) {
					case 0: this.table = this.table.sort(this.compareWins); 
						break;
					case 1: this.table = this.table.sort(this.compareConferenceWins);
						break;
					case 2: this.table = this.table.sort(this.compareDivisionWins);
						break;
				}
			}
		},
		methods: {
			compareWins: function(a,b) {
				if (a.w < b.w){
					return 1;
				} 
				if (a.w > b.w) {
					return -1;
				}
				return 0
			},
			compareConferenceWins: function(a,b) {
				if (a.conference < b.conference){
					return 1;
				} 
				if (a.conference > b.conference) {
					return -1;
				}
				if (a.conference === b.conference){
					if (a.w < b.w){
						return 1;
					} 
					if (a.w > b.w) {
						return -1;
					}
				}
				return 0
			},
			compareDivisionWins: function(a,b) {
				if (a.conference < b.conference){
					return 1;
				} 
				if (a.conference > b.conference) {
					return -1;
				}
				if (a.conference === b.conference){
					if (a.division < b.division){
						return 1;
					} 
					if (a.division > b.division) {
						return -1;
					}
					if (a.division === b.division) {
						if (a.w < b.w){
							return 1;
						} 
						if (a.w > b.w) {
							return -1;
						}
					}
				}
				return 0
			}
		}
	}
</script>