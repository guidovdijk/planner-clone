<template>
	<div class="container">
		<TopNavbar />

		<div class="columns">
			<div class="column is-9">
				<div class="table-wrapper">
					<table class="table is-fullwidth">
						<thead>
							<tr v-for="(tile) in this.$store.getters.getTiles.slice(0,1)" v-bind:key="tile.id">
								<th></th>
								<th v-for="(value, name, index) in filteredTiles(tile)" v-bind:key="index">
									{{name}}
								</th>
								<th>
									<div :class="newColumn ? 'is-active' : ''" class="dropdown is-right">
										<div class="dropdown-trigger">
											<span class="icon dropdown-icon" @click="newColumn = !newColumn">
												<i class="fas fa-plus-circle"></i>
											</span>
										</div>
										<div class="dropdown-menu" id="dropdown-menu" role="menu">
											<div class="dropdown-content">
												<a href="#" class="dropdown-item">
													Dropdown item
												</a>
											</div>
										</div>
									</div>
								</th>
							</tr>
						</thead>
						<tbody class="has-background-light">
							<tr class="is-multiline" v-for="(tile) in this.$store.getters.getTiles" v-bind:key="tile.id">
								
								<td class="is-sticky">
									<span class="icon" @click="deleteTile(tile.id)">
										<i class="fas fa-caret-down"></i>
									</span>

									<input v-on:change="updateTitle($event, tile)" type="text" :value="tile.title"/>
								</td>

								<td v-for="(value, name, index) in filteredTiles(tile)" v-bind:key="index">
									<input v-on:change="updataData($event, name, tile.id)" type="text" :value="value"/>
								</td>
								
							</tr>
						</tbody>
					</table>

				</div>
				<form v-on:submit.prevent="addTile">
					<div class="field is-grouped">
						<p class="control is-expanded">
							<input v-model="newTile.title" class="input add-tile has-text-grey-light" placeholder="+ Add" type="text"/>
							<input type="submit" class="add-tile__submit button is-primary" value="Add Tile">
						</p>
					</div>
				</form>

			</div>
		</div>
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
			newColumn: false,
			newColumnText: '',
			newTile: {
				title: '',
			}
		}
	},
	beforeCreate: function () {
		this.$store.dispatch('setTiles');
	},
	computed: {
		},
	methods: {
		filteredTiles: function(tile) {
			const FilteredTile = {...tile};

			delete FilteredTile.id;
			delete FilteredTile.createdAt;
			delete FilteredTile.title;

			return FilteredTile;
		},
		updateTitle: function(event, tile){
			this.updataData(event, 'title', tile.id);
		},
		updataData: function(event, key, id){
			console.log(event, key, id)
			db.collection("tiles").doc(id).update(`${key}`, event.target.value).catch((error) => {
				console.error("Error updating document: ", error);
			});
		},
		addColumn: async function(tile){
			const snapshot = await db.collection('tiles').get()
			snapshot.docs.map(doc => { 
				doc.update(`${key}`, '').catch((error) => {
					console.error("Error adding a new column: ", error);
				});
			});
			
		},
		addTile: function(){
			console.log('addTile')
			const tile = this.newTile;

			db.collection('tiles').add({
				title: tile.title,
				werkproces: '',
				assignee: '',
				status: '',
				timeline: '',
				estimation: '',
				timetracking: '',
				deadline: '',
				createdAt: new Date(),
			});
			this.newTile.title = '';
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
	@import '~bulma';

	$link: red !default;
	$height: 35px;

	.dropdown {
		&.is-active  {
			.dropdown-icon {
				transform: rotate(45deg);
			}
		}
	}
	.is-sticky {
		position: sticky;
		left: 0;
		background: $light;
	}
	.table-wrapper {
		overflow-x: auto;
		&:-webkit-scrollbar { 
            display: none; 
        } 
	}
	.table {
		min-width: 800px;
		&:not(:last-child) {
			margin-bottom: 0;
		}
		tbody {
			tr {
				height: $height;
				td {
					border: none;
				}
			}
		}
		input[type="text"] {
			appearance: none;
			border: none;
			background: transparent;
		}
	}

	.add-tile {
		border: 1px solid #e6e9ef;
		height: $height;
		background: #fff;
		outline: none;
		padding-left: 20px;
		width: 100%;
		&__submit {
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 0;
			height: 100%;
			opacity: 0;
		}
		&:focus + &__submit {
			opacity: 1;
		}
	}
</style>