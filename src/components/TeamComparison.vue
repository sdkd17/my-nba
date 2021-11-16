<template>
	
	<div>
		<b-table striped hover :items="generateTeamStats"></b-table>
	</div>
	
</template>

<script>
	export default {
		props: {
			//stats viene como un array con las estadisticas de los jugadores, quiero mostrar la comparacion de estadisticas por equipo.
			gameId: String,
			
		},
		data () {
			return {
				stats: []
			}
		},
		computed: {
			// generateTeamStats2: function() {
			// 	//retorna un objeto/array con las estadisticas calculadas por equipo

			// 	let team_stats = { home_team_name: stats[0].game.home_team_id, home_team: {}, visitor_team_name: stats[0].game.visitor_team_id, visitor_team: {} };
				
			// 	team_stats.home_team = {ast:0,blk:0,dreb:0,fg3_pct:0,fg3a:0,fg3m:0,fg_pct:0,fga:0,fgm:0,ft_pct:0,fta:0,ftm:0,oreb:0,pf:0,pts:0,reb:0,stl:0,turnover:0};
			// 	team_stats.visitor_team = {ast:0,blk:0,dreb:0,fg3_pct:0,fg3a:0,fg3m:0,fg_pct:0,fga:0,fgm:0,ft_pct:0,fta:0,ftm:0,oreb:0,pf:0,pts:0,reb:0,stl:0,turnover:0}

			// 	//calcular la suma total de puntos de todos los jugadores de un mismo equipo
			// 	stats.forEach( stat_item => {
			// 		Object.keys(team_stats.home_team).forEach( key => {
			// 			if (stat_item.player.team_id === stat_item.game.home_team_id) {
			// 				team_stats.home_team[key] += stat_item[key];
			// 			} else {
			// 				team_stats.visitor_team[key] += stat_item[key];
			// 			}	
			// 		})
			// 	})

			// 	team_stats.home_team.fg_pct = Math.trunc((team_stats.home_team.fgm/team_stats.home_team.fga)*100);
			// 	team_stats.home_team.fg3_pct = Math.trunc((team_stats.home_team.fg3m/team_stats.home_team.fg3a)*100);
			// 	team_stats.home_team.ft_pct = Math.trunc((team_stats.home_team.ftm/team_stats.home_team.fta)*100);
			// 	team_stats.visitor_team.fg_pct = Math.trunc((team_stats.visitor_team.fgm/team_stats.visitor_team.fga)*100);
			// 	team_stats.visitor_team.fg3_pct = Math.trunc((team_stats.visitor_team.fg3m/team_stats.visitor_team.fg3a)*100);
			// 	team_stats.visitor_team.ft_pct = Math.trunc((team_stats.visitor_team.ftm/team_stats.visitor_team.fta)*100);
			// 	return team_stats;
			// },
			
			generateTeamStats: function(){
				let items = {}
				// let values = ['ast','blk','dreb','fg3_pct','fg3a','fg3m','fg_pct','fga','fgm','ft_pct','fta','ftm','oreb','pf','pts','reb','stl','turnover']
				const values = ['fga', 'fgm','fg_pct','fg3a', 'fg3m', 'fg3_pct', 'fta', 'ftm', 'ft_pct', 'ast', 'reb', 'oreb', 'dreb', 'stl', 'blk', 'turnover', 'pf']
				values.forEach( value => {
					items[value] = {item:value, home_team:0, visitor_team:0};
				})
				
				this.stats.forEach( stat_item => {
					values.forEach( value => {
						if (stat_item.player.team_id === stat_item.game.home_team_id) {
							items[value].home_team += stat_item[value]
						} else {
							items[value].visitor_team += stat_item[value]
						}		
					})
				})
				items.fg_pct.home_team = Math.trunc((items.fgm.home_team/items.fga.home_team)*100);
				items.fg3_pct.home_team = Math.trunc((items.fg3m.home_team/items.fg3a.home_team)*100);
				items.ft_pct.home_team = Math.trunc((items.ftm.home_team/items.fta.home_team)*100);
				items.fg_pct.visitor_team = Math.trunc((items.fgm.visitor_team/items.fga.visitor_team)*100);
				items.fg3_pct.visitor_team = Math.trunc((items.fg3m.visitor_team/items.fg3a.visitor_team)*100);
				items.ft_pct.visitor_team = Math.trunc((items.ftm.visitor_team/items.fta.visitor_team)*100);
				return Object.values(items);
			}
		},
		watch: {
			gameId: function(newGameId) {
				// console.log(newGameId + ' - ' + oldGameId);
				fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${newGameId}&per_page=40`, {method: 'get'}).
				then(response => {
					return response.json()
				}).then(jsonData => {
					this.stats = jsonData.data;
				});
				
			}
		}
	}
</script>