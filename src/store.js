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
        getColumns: state => {
            return state.newColumns;
        }
    },
    mutations: {
        setTiles: state => {
            let items = [];
       
            db.collection('tiles').orderBy('createdAt').onSnapshot((snapshot) => {
                items = [];
                snapshot.forEach((doc) => {
                    items.push({ 
                        createdAt: new Date(),
                        text: doc.data().text,
                        werkproces: doc.data().werkproces,
                        assignee: doc.data().assignee,
                        status: doc.data().status,
                        timeline: doc.data().timeline,
                        estimation: doc.data().estimation,
                        timetracking: doc.data().timetracking,
                        deadline: doc.data().deadline,
                        id: doc.id,
                    });
                });
        
                state.newTiles = items;
            })
        },      
        setColumns: state => {
            let items = [];
       
            db.collection('columns').onSnapshot((snapshot) => {
                items = [];
                snapshot.forEach((doc) => {
                    items.push({ 
                        text: doc.data().text,
                    });
                });
        
                state.newColumns = items;
            })
        }      
    },
    actions: {
        setTiles: context => { context.commit('setTiles'); },
        setColumns: context => { context.commit('setColumns'); }
    }
})
