<template>
	<div class="form-table-wrapper">
		<div class="table-wrapper" :class="collapsed ? 'hidden-when-collapsed is-height-auto' : ''">
			<table width="800px" class="table is-fullwidth">
				<thead>
					<tr>
						<th width="250" :class="collapsed ? 'has-background-white-bis' : 'has-background-white'" class="is-sticky is-left has-index">
							<div class="field field-title is-grouped">
								<p class="control is-margin-auto ignore-overflow">
									<DropdownEdit 
										:tiles="tiles.id"
										@collapse="collapse"
									/>
								</p>
								<p class="control is-expanded">
									<input v-bind:style="{ 'color': getThemeColor(tiles.tile.color, '#363636')}" class="has-text-left has-text-weight-semibold is-size-6" v-on:change="updateMainThemeTitle($event, tiles, 'title')" type="text" :value="tiles.tile.title"/>
								</p>
							</div>
						</th>

						<th class="hidden has-text-centered" width="150" v-for="(value, name, index) in filteredTiles(tiles.tile_items[0].todo_item)" @click="deleteColumn(name)" v-bind:key="index">
							<div class="field">
								<p class="control is-expanded">
									<input class="has-text-centered" type="text" :value="name"/>
								</p>
							</div>
						</th>
						<th width="50" class="hidden is-right is-sticky has-index has-text-centered has-background-white">
							<DropdownAdd 
								:tiles="tiles.id"
							/>
						</th>
					</tr>
				</thead>
				<tbody :class="collapsed ? 'is-hidden' : ''" class="has-background-light">
					<tr v-for="(tile) in tiles.tile_items" v-bind:key="tile.id" class="is-multiline">
						<td width="200" class="is-sticky has-background-light is-left">
							<div v-bind:style="{'background-color': getThemeColor(tiles.tile.color, '#d8d8d8')}" class="has-stripe is-left"></div>

							<div class="field field-title is-grouped">
								<p class="control is-flex">
									<span class="icon is-middle" @click="deleteTile(tiles.id, tile.id)">
										<i class="fas fa-caret-down"></i>
									</span>
								</p>
								<p class="control is-expanded">
									<input class="has-text-weight-semibold has-text-left" v-on:change="updataData($event, 'title', tiles.id, tile.id)" type="text" :value="tile.todo_item.title"/>
								</p>
							</div>
						</td>
						
						<td width="150" v-for="(value, name, index) in filteredTiles(tile.todo_item)" v-bind:key="index">
							<template v-if="value.type === 'status'">
								<Status 
									:status="data.status"
									:tile="value"
									:name="name"
									:parentId="tiles.id"
									:id="tile.id"
								/>
							</template>
							<template v-else-if="value.type === 'date'">
								<Date :tile="value"/>
							</template>
							<template v-else>
								<input v-on:change="updataData($event, name, tiles.id, tile.id)" type="text" :value="value.text"/>
							</template>
						</td>

						<td width="50" class="is-sticky is-right has-background-white-bis">
							<div class="has-stripe is-right"></div>
						</td>
						
					</tr>
				</tbody>
			</table>
		</div>
        <form :class="collapsed ? 'is-hidden' : ''" class="add" v-on:submit.prevent="addTile(tiles.id, index)">
            <div class="field is-grouped">
				<div :style="{'background-color': getThemeColor(tiles.tile.color, '#363636')}" class="has-input-stripe"></div>

                <p class="control is-expanded">
                    <input v-model="newTile.title" class="input add-tile has-text-grey-light" placeholder="+ Add" type="text"/>
                    <input v-if="newTile.title" type="submit" class="add-tile__submit button is-primary" value="Add Tile"/>
                </p>
            </div>
        </form>
	</div>
</template>
<script>
import db from '../firebase/firebase';
import DropdownEdit from './dropdowns/DropdownEdit';
import DropdownAdd from './dropdowns/DropdownAdd';
import Status from "./tiles/Status";
import Date from "./tiles/Date";

export default {
	name: 'Table',
	components: {
		DropdownAdd: DropdownAdd,
		DropdownEdit: DropdownEdit,
		Status: Status,
		Date: Date,
	},
    props: [
		"tiles",
		"index"
    ],
    data () {
		return {
			newColumnText: '',
			newTile: {
				title: '',
			},
            data: {
				status: [],
			},
            collectionTileName: 'tiles',
			subcollectionTileName: 'test',
			collapsed: false,
		}
	},
	created() {
		this.getAllStatus();
	},
	methods: {
		getAllStatus(){
			return db.collection("forms").doc('status').get().then(doc => {
				console.log(doc.data().colors);
				return doc.data().colors;
			}).then(colors => { 
            	colors.forEach(color => color.function = true);
				this.data.status = colors;
			});
		},
		collapse(boolean){	
			console.log(' test')		
			this.collapsed = boolean;
		},

		updateMainThemeTitle(event, tile, key){
			const doc = tile.id;
			const dir = db.collection(this.collectionTileName).doc(doc);
			
			dir.update(`${key}`, event.target.value).catch((error) => {
				console.error("Error updating theme title: ", error);
			});
		},
		getThemeColor(color, fallback){
			return color ? color : fallback;
		},
		filteredTiles: function(key) {
			const FilteredTile = {...key};

			delete FilteredTile.id;
			delete FilteredTile.createdAt;
			delete FilteredTile.title;

			return FilteredTile;
		},
		updataData: function(event, key, parentId, tileId){
            const dir = db.collection(this.collectionTileName).doc(parentId).collection(this.subcollectionTileName).doc(tileId);
            
            dir.update(`${key}.text`, event.target.value).catch((error) => {
				console.error("Error updating document: ", error);
			});
		},
		deleteColumn: async function(column){
			const tiles = db.collection(this.collectionTileName).get().then(snapshot => {
                snapshot.forEach((doc) => {
					const data = doc.data();
					delete data[column];
					doc.ref.set(data);
				});
            });
		},
		addTile: function(tileId, index){
			const title = this.newTile.title;
			const newTile = {};

            // db.collection(this.collectionTileName).doc(tileId).collection(this.subcollectionTileName).add({title: title})
            const doc = db.collection(this.collectionTileName).doc(tileId).collection(this.subcollectionTileName);

			Object.entries(this.$store.state.newTiles[index].tile_items[0].todo_item).forEach(d => {
				const prop = d[0];
				const value = d[1];
				
				newTile[prop] = new Object();
				newTile[prop].type = value.type
				newTile[prop].text = ''
			});

			newTile.title = title;
			newTile.createdAt = new Date();
			
			doc.add(newTile).then(() => {
                this.$store.dispatch('setTiles');
            })
			
			this.newTile.title = '';
		},
		deleteTile: function(parentId, tileId){
            const dir = db.collection(this.collectionTileName).doc(parentId).collection(this.subcollectionTileName).doc(tileId);

			dir.delete().then(() => {
                this.$store.dispatch('setTiles');
            });
		},
	},
}
</script>

<style lang="scss">
	$body-font-size: 12px;
	$body-size: $body-font-size + 1;
	@import '~bulma';

	$link: red !default;
	$height: 35px;
	$min-table-height: 220px;

	.has-input-stripe {
		position: relative;
		width: 8px;
		opacity: 0.6;
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
			.is-left & {
				background: inherit;
			}
			.is-right & {
				background: $grey-lighter;
			}
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
		min-height: $min-table-height;
		background: $white-bis;
		&::-webkit-scrollbar { 
        } 
	}
	.table {
		table-layout: fixed;
		&:not(:last-child) {
			margin-bottom: 0;
		}
		tr {
			th, td {
				padding: 0;
			}
			height: $height;
		}
		tbody {
			.field-title {
				margin-left: 15px;
			}
			td {
				border: 2px solid white;
			}
			td, .tile--status {
				box-shadow: inset 0 -1px 0px rgba(#000000, 0.2);
			}
		}
		thead th {
			border: none;
		}
		input {
			height: $height;
			width: 100%;
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
	.ignore-overflow .dropdown-content {
        position: fixed;
    }


	.input {
		border-radius: 0px !important;
		box-shadow: none;
	}
	.has-index {
		z-index: 1;
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
	.is-height-auto {
		height: auto;
		min-height: auto;
	}
	.is-middle {
		align-self: center;
	}
	.is-margin-auto {
		margin: auto !important;
	}
	.hidden-when-collapsed {
		.hidden {
			display: none;
		}
	}
</style>
