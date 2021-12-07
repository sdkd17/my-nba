<template>
	<b-container fluid>
		
		<div>
			<LeagueTable
				v-bind:games="games"
				v-bind:loading="loading" />
		</div>
	</b-container>
</template>

<script>
	// const y = new Date().getFullYear();
	import LeagueTable from './LeagueTable.vue';

	export default {
		components: {
			LeagueTable
		},
		data() {
			return {
				date: new Date(),
				games: [],
				loading: true
			}
		},
		methods: {
			getGames: async function () {
				
				const start_date 	= `start_date=2021-10-19`
				const end_date 		= `end_date=${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;
				const per_page 		= `per_page=82`;
				let url = '';
				let teamId = 1;
				let error = false;
				do {
					//get all the games for the team until today
					//create object element that it'll go inside table with the sum of wins and loses
					url = `https://www.balldontlie.io/api/v1/games?team_ids[]=${teamId}&${start_date}&${end_date}&${per_page}`;
					const response = await fetch(url, {method: 'get'});
					if (response.status >= 200 && response.status <=299) {
						const jsonData = await response.json();	
						this.games[teamId] = jsonData.data;
						teamId++;
					} else {
						console.log(response.status, response.statusText);
						error = true;
					}
				} while (teamId <= 30 && !error);
				
				if (!error) {
					this.loading = false;	
				}
				
			},
			getGames2: async function () {
				const start_date 	= `2021-10-19`
				const end_date 		= `${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;
				const per_page 		= 100;
				let url = '';
				let error = false;
				let current_page = 1;
				let total_pages = -1;
				do {
					//get all the games for the team until today
					//create object element that it'll go inside table with the sum of wins and loses
					url = `https://www.balldontlie.io/api/v1/games?start_date=${start_date}&end_date=${end_date}&per_page=${per_page}&page=${current_page}`;
					const response = await fetch(url,{method: 'get'});
					if (response.status >= 200 && response.status <= 299) {
						const jsonData = await response.json();
						this.games.push(...jsonData.data);
						current_page++;
						if (total_pages == -1) {
							total_pages = jsonData.meta.total_pages; 
						}
					} else {
						console.log(response.status, response.statusText);
						error = true;
					}

				} while(!error && current_page <= total_pages);
				
				if (!error) {
					this.loading = false;
				}
			}		
		},
		created() {
			this.getGames2();
		}	
	}
</script>