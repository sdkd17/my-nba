<template>
	
	<b-list-group> 
		<b-list-group-item 
			v-for="element in generateTeamStats"
			v-bind:key="element.item" >	
			
			<b-row> 
				<b-col> {{ element.home_team }} </b-col>
				<b-col> <span class="h5"> {{ items[element.item] }} </span></b-col>
				<b-col> {{ element.visitor_team }}</b-col>
			</b-row>
	
		</b-list-group-item>
	</b-list-group>

	<!-- <div>
		<b-table striped hover :items="generateTeamStats"></b-table>
	</div> -->
	
</template>

<script>
	export default {
		props: {
			//stats viene como un array con las estadisticas de los jugadores, quiero mostrar la comparacion de estadisticas por equipo.
			gameStats: Array
		},
		data () {
			return {
				// stats: [],
				items: {'fg':'Field Goals','fg3':'3 Pointers', 'ft':'Free Throws', 'ast':'Assists', 'reb':'Total Rebounds','oreb':'Offensive Rebounds', 'dreb':'Defensive Rebounds', 'stl':'Steals', 'blk':'Blocks', 'turnover':'Turnouvers', 'pf': 'Fouls'}
			}
		},
		computed: {			
			generateTeamStats: function(){
				let items = {fg:{item:'fg', home_team:'', visitor_team:''},fg3:{item:'fg3', home_team:'', visitor_team:''}, ft:{item:'ft', home_team:'', visitor_team:''}}
				const values = ['fga', 'fgm','fg_pct','fg3a', 'fg3m', 'fg3_pct', 'fta', 'ftm', 'ft_pct', 'ast', 'reb', 'oreb', 'dreb', 'stl', 'blk', 'turnover', 'pf']
				values.forEach( value => {
					items[value] = {item:value, home_team:0, visitor_team:0};
				})
				// console.log(this.gameStats);
				this.gameStats.forEach( stat_item => {
					values.forEach( value => {
						if (stat_item.player.team_id === stat_item.game.home_team_id) {
							items[value].home_team += stat_item[value]
						} else {
							items[value].visitor_team += stat_item[value]
						}		
					})
				})

				//esto es horrible, pero es lo que hay
				items.fg_pct.home_team = Math.trunc((items.fgm.home_team/items.fga.home_team)*100);
				items.fg3_pct.home_team = Math.trunc((items.fg3m.home_team/items.fg3a.home_team)*100);
				items.ft_pct.home_team = Math.trunc((items.ftm.home_team/items.fta.home_team)*100);
				items.fg_pct.visitor_team = Math.trunc((items.fgm.visitor_team/items.fga.visitor_team)*100);
				items.fg3_pct.visitor_team = Math.trunc((items.fg3m.visitor_team/items.fg3a.visitor_team)*100);
				items.ft_pct.visitor_team = Math.trunc((items.ftm.visitor_team/items.fta.visitor_team)*100);

				items.fg.home_team = `${items.fgm.home_team}/${items.fga.home_team} (${items.fg_pct.home_team}%)`;
				items.fg.visitor_team = `${items.fgm.visitor_team}/${items.fga.visitor_team} (${items.fg_pct.visitor_team}%)`;

				items.fg3.home_team = `${items.fg3m.home_team}/${items.fg3a.home_team} (${items.fg3_pct.home_team}%)`;
				items.fg3.visitor_team = `${items.fg3m.visitor_team}/${items.fg3a.visitor_team} (${items.fg3_pct.visitor_team}%)`;

				items.ft.home_team = `${items.ftm.home_team}/${items.fta.home_team} (${items.ft_pct.home_team}%)`;
				items.ft.visitor_team = `${items.ftm.visitor_team}/${items.fta.visitor_team} (${items.ft_pct.visitor_team}%)`;
				delete items.fga
				delete items.fgm
				delete items.fg_pct

				delete items.fg3a
				delete items.fg3m
				delete items.fg3_pct

				delete items.fta
				delete items.ftm
				delete items.ft_pct
				return Object.values(items)
			}
		},
		// watch: {
		// 	gameId: function(newGameId) {
		// 		// console.log(newGameId + ' - ' + oldGameId);
		// 		fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${newGameId}&per_page=40`, {method: 'get'}).
		// 		then(response => {
		// 			return response.json()
		// 		}).then(jsonData => {
		// 			this.stats = jsonData.data;
		// 		});
				
		// 	}
		// }
	}
</script>