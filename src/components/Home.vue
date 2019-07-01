<template>
	<div class="container">
		<TopNavbar />

		<div class="columns">
			<div class="column is-9">
				<div class="table-wrapper">
					<table width="800px" class="table is-fullwidth">
						<thead>
							<tr v-for="(tile) in this.$store.getters.getTiles.slice(0,1)" v-bind:key="tile.id">
								<th width="250" class="is-sticky is-left has-background-white"></th>
								<th width="150" v-for="(value, name, index) in filteredTiles(tile)" @click="deleteColumn(name)" v-bind:key="index">
									{{name}}
								</th>
								<th width="50" class="is-sticky is-right has-background-white">
									<div :class="newColumn ? 'is-active' : ''" class="dropdown is-right">
										<div class="dropdown-trigger">
											<span class="icon dropdown-icon" @click="newColumn = !newColumn, dropdownType = false">
												<i class="fas fa-plus-circle"></i>
											</span>
										</div>
										<div class="dropdown-menu" id="dropdown-menu" role="menu">
											<div class="dropdown-content">
												<template v-if="!dropdownType">
													<a @click.prevent="dropdownType = 'status'" href="#" class="dropdown-item">
														<span class="icon">
															<i class="fas fa-align-justify"></i>
														</span>
														Status
													</a>
													<hr class="dropdown-divider"/>
													<a @click.prevent="dropdownType = 'text'" href="#" class="dropdown-item">
														<span class="icon">
															<i class="fas fa-font"></i>
														</span>
														Text
													</a>
													<hr class="dropdown-divider"/>
													<a @click.prevent="dropdownType = 'datum'" href="#" class="dropdown-item">
														<span class="icon">
															<i class="far fa-calendar-alt"></i>
														</span>
														Datum
													</a>
												</template>
												<template v-else>
													<div class="dropdown-item">
														<input @blur="addColumn, dropdownType = false" class="input" v-model="newColumnText" type="text" placeholder="Column name...">
													</div>
												</template>
											</div>
										</div>
									</div>
								</th>
							</tr>
						</thead>
						<tbody class="has-background-light">
							<tr class="is-multiline" v-for="(tile) in this.$store.getters.getTiles" v-bind:key="tile.id">
								
								<td  width="200" class="is-sticky has-background-light is-left">
									<!-- <span class="icon" @click="deleteTile(tile.id)">
										<i class="fas fa-caret-down"></i>
									</span> -->
									<div class="has-stripe is-left"></div>

									<div class="field">
										<p class="control is-expanded">
											<input class="has-text-weight-semibold has-text-left" v-on:change="updateTitle($event, tile)" type="text" :value="tile.title"/>
										</p>
									</div>
								</td>

								<td width="150" v-for="(value, name, index) in filteredTiles(tile)" v-bind:key="index">
									<input v-on:change="updataData($event, name, tile.id)" type="text" :value="value"/>
								</td>

								<td width="50" class="is-sticky is-right has-background-white-bis">
									<div class="has-stripe is-right"></div>
								</td>
								
							</tr>
						</tbody>
					</table>

				</div>
				<form class="add" v-on:submit.prevent="addTile">
					<div class="field is-grouped">
						<p class="control is-expanded">
							<input v-model="newTile.title" class="input add-tile has-text-grey-light" placeholder="+ Add" type="text"/>
							<input v-if="newTile.title" type="submit" class="add-tile__submit button is-primary" value="Add Tile">
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
			dropdownType: false,
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
			db.collection("tiles").doc(id).update(`${key}`, event.target.value).catch((error) => {
				console.error("Error updating document: ", error);
			});
		},
		addColumn: async function(tile){
          	db.collection('tiles').orderBy('createdAt').onSnapshot((snapshot) => {
				const batch = db.batch();
                snapshot.forEach((doc) => {
					const ref = doc.ref;
					batch.update(ref, {
						[this.newColumnText]: '',
					})
				});
				batch.commit();
			});
		},
		deleteColumn: async function(column){
			const tiles = db.collection('tiles').get().then(snapshot => {
                snapshot.forEach((doc) => {
					const data = doc.data();
					delete data[column];
					doc.ref.set(data);
				});
            });
		},
		addTile: function(test){
			const title = this.newTile.title;
			const newTile = {};

			Object.entries(this.$store.getters.getTiles[0]).forEach(d => {
				const prop = d[0];
				const value = d[1];
				
				if(prop !== 'id'){
					newTile[prop] = '';
				}
			});

			newTile.title = title;
			newTile.createdAt = new Date();
			
			db.collection('tiles').add(newTile);
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
	$input-shadow: none !default;
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
	}
	.is-left, .is-left:before {
		left: 0;
	} 
	.is-right, .is-right:before {
		right: 0;
	}
	.has-stripe {
		&:before, &:after {
			content: "";
			height: 100%;
			top: 0;
			bottom: 0;
			position: absolute;
		}
		&:before {
			width: 8px;
			background: $grey-lighter;
		}
		&:after {
			width: 2px;
			background: $white;
			.is-left & {
				right: 0;
			}
			.is-right & {
				left: 0;
			}
		}
	}
	.table-wrapper {
		overflow-x: scroll;
		&::-webkit-scrollbar { 
            display: none; 
        } 
	}
	.table {
		table-layout: fixed;
		&:not(:last-child) {
			margin-bottom: 0;
		}
		tbody {
			tr {
				height: $height;
				td {
					border: 2px solid white;
					box-shadow: inset 0 -1px 0px lightgrey;
				}
			}
		}
		input[type="text"] {
			appearance: none;
			border: none;
			background: transparent;
			text-align: center;
		}
	}

	.add {
		margin-top: 2px;
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
			}
		}
	}
</style>