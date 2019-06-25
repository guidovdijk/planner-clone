import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/firebase/firebase';

Vue.use(Vuex); 

export default new Vuex.Store({
    state: {
        newTiles: [],
    },
    getters: {
        getTiles: state => {
            return state.newTiles;
        }
    },
    mutations: {
        setTiles: state => {
            let items = [];
       
            db.collection('tiles').orderBy('createdAt').onSnapshot((snapshot) => {
                items = [];
                snapshot.forEach((doc) => {
                    items.push({ 
                        index: state.newTiles.length + 1,
                        id: doc.id, 
                        text: doc.data().text 
                    });
                });
        
                state.newTiles = items;
            })
        }      
    },
    actions: {
        setTiles: context => { context.commit('setTiles'); }
    }
})
