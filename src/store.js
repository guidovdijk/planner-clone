import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/firebase/firebase';

Vue.use(Vuex); 

export default new Vuex.Store({
    state: {
        newTiles: [],
        newColumns: [],
    },
    getters: {
        getTiles: state => {
            return state.newTiles;
        },
    },
    mutations: {
        setTiles: state => {
            let items = [];
       
            db.collection('tiles').orderBy('createdAt').onSnapshot((snapshot) => {
                items = [];
                snapshot.forEach((doc) => {
                    console.log(doc.data());

                    const item = {};

                    Object.entries(doc.data()).forEach(d => {
                        const prop = d[0];
                        const value = d[1];
                        
                        item[prop] = value;
                    });
                    item.id = doc.id;

                    items.push(item);

                });
                state.newTiles = items;
            })
        },        
    },
    actions: {
        setTiles: context => { context.commit('setTiles'); },
    }
})
