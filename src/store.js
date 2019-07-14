import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/firebase/firebase';
import { getTodoItemsById } from './helpers';

Vue.use(Vuex); 

export default new Vuex.Store({
    state: {
        newTiles: [],
    },
    getters: {
        getTiles: state => {
            return state.newTiles;
        },
    },
    mutations: {
        setTiles: state => {
            const ref = db.collection('tiles');

            return ref.onSnapshot((snapshot) => {
                const tiles = [];
                return Promise.all(
                    snapshot.docs.map(doc => {
                        const tile = {};                
                        tile.id = doc.id;
                        tile.tile = doc.data();
                        const tileItemsPromise = getTodoItemsById(tile.id, db.collection('tiles'));
                        return tileItemsPromise.then((tileItems) => { 
                            console.log('tile', tileItems);   
                            tile.tile_items = tileItems;
                            tiles.push(tile); 
                            return tiles;                        
                        });
                    })
                ).then(tiles => {
                    console.log(tiles)
                    state.newTiles = tiles;
                    console.log(state.newTiles.length > 0 ? state.newTiles[state.newTiles.length - 1] : []);
                    if(tiles.length > 0){
                        return state.newTiles = tiles[tiles.length - 1];
                    }
                    return [];
                })
            });
        },        
        addColumn: (state, data) => {
            console.log(data)
            db.collection('tiles').doc(data.id).collection('test').onSnapshot((snapshot) => {
				const batch = db.batch();
                snapshot.forEach((doc) => {
                    const ref = doc.ref;
					batch.update(ref, {
						[data.text]: {
                            type: data.type,
                            text: ''
                        },
					})
				});
                batch.commit();
            });
        }
    },
    actions: {
        setTiles: context => { context.commit('setTiles'); },
    }
})
