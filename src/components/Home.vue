<template>
	<div class="container">
		<TopNavbar />

		<div class="columns">
			<div class="column is-multiline is-12">
				<form id="form"  v-on:submit.prevent="addTile">

					<div class="field is-grouped" >
						<p class="control is-expanded" v-for="(value, name, index) in newTile" v-bind:key="index">
							<label class="label">{{name}}</label>
							<input 
								type="text" 
								class="input" 
								v-model="newTile[name]"
							/>					
						</p>
					</div>


					<div class="field is-grouped is-pulled-right">
						<p class="control">
							<input type="submit" class="button is-primary" value="Add Tile">
						</p>
					</div>

				</form>
			</div>
		</div>
		<table class="table is-fullwidth">
			<thead>
				<tr v-for="(tile) in this.$store.getters.getTiles.slice(0,1)" v-bind:key="tile.id">
					<th v-for="(value, name, index) in filteredTiles(tile)" v-bind:key="index">
						{{name}}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="is-multiline" v-for="(tile) in this.$store.getters.getTiles" v-bind:key="tile.id">
					<td v-for="(value, name, index) in filteredTiles(tile)" v-bind:key="index">
						<input v-on:change="updataData($event, value, name, tile.id)" type="text" :value="value"/>
					</td>
		
					<td><input type="button" value="delete" @click="deleteTile(tile.id)"/></td>
					
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

import TopNavbar from './TopNavbar';
import db from '../firebase/firebase';

export default {
	name: 'Home',
	components: {
		TopNavbar: TopNavbar,
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			activeField: null,
			newTile: {
				text: '',
				werkproces: '',
				assignee: '',
				status: '',
				timeline: '',
				estimation: '',
				timetracking: '',
				deadline: '',
			}
		}
	},
	beforeCreate: function () {
		this.$store.dispatch('setTiles');
		this.$store.dispatch('setColumns');
	},
	filters: {

	},
	methods: {
		filteredTiles: function(tile) {
			const FilteredTile = {...tile};

			delete FilteredTile.id;
			delete FilteredTile.createdAt;

			return FilteredTile;
		},
		updataData: function(event, tile, value, id){
			db.collection("tiles").doc(id).update(`${value}`, event.target.value).catch((error) => {
				console.error("Error updating document: ", error);
			});
		},
		addTile: function(){
			const tile = this.newTile;

			db.collection('tiles').add({
				text: tile.text,
				werkproces: tile.werkproces,
				assignee: tile.assignee,
				status: tile.status,
				timeline: tile.timeline,
				estimation: tile.estimation,
				timetracking: tile.timetracking,
				deadline: tile.deadline,
				createdAt: new Date(),
			});
		},
		deleteTile: function(id){
			db.collection("tiles").doc(id).delete().catch((error) => {
				console.error("Error removing document: ", error);
			});
		},
	},
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

	$link: red !default;
	h1 {
		color: $link;
	}
</style>