<template>
	<div class="container">
		<TopNavbar />

		<div class="columns is-multiline">
			<div class="column is-9" v-for="(tiles, index) in this.$store.getters.getTiles" v-bind:key="tiles.id">
				<Table :tiles="tiles" :index="index"/>
			</div>
		</div>
	</div>
</template>

<script>

import TopNavbar from './TopNavbar';
import Table from './Table';

export default {
	name: 'Home',
	components: {
		TopNavbar: TopNavbar,
		Table: Table,
	},
	beforeCreate: function () {
		this.$store.dispatch('setTiles');
	},
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	
</style>