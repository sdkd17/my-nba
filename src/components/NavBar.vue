<template>
	<b-nav tabs fill >
		<b-nav-item 
			v-for="tab in tabs" 
			v-bind:key="tab" 
			v-bind:class="[{active: currentTab === tab}]" 
			v-on:click="$emit('changeTab', tab)">
				{{ tab }} 
		</b-nav-item>
	</b-nav>
</template>

<script>
	export default {
		props: {
			tabs: Array,
			currentTab: String
		}
	}
</script>

