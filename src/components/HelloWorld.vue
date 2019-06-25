<template>
	<div class="hello">
		<TopNavbar />

		<form id="form"  v-on:submit.prevent="addTile">
			<input type="text" id="bookTitle" class="form-control" v-model="newTile.title">
			<input type="submit" class="button is-primary" value="Add Book">
		</form>
		<h2>Ecosystem</h2>
		<ul>
			<li v-for="tile in this.$store.getters.getTiles" v-bind:key="tile.id" @click="deleteTile(tile.id)">
				{{tile.text}}
			</li>
		</ul>
	</div>
</template>

<script>

import TopNavbar from './TopNavbar';
import db from '../firebase/firebase';

export default {
	name: 'HelloWorld',
	components: {
		TopNavbar: TopNavbar,
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			newTiles: [],
			newTile: {
				title: '',
			}
		}
	},
	beforeCreate: function () {
		this.$store.dispatch('setTiles');
	},
	created() {

	},

	methods: {
		addTile: function(){
			db.collection('tiles').add({
				text: this.newTile.title,
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