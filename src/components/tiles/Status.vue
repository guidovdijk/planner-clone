<template>
    <div :style="getBackgroundColor" class="tile--status ignore-overflow">
        <DropdownBasis 
            :dropdownItems="status"
            :text="tile.text"
            @clicked="getChosenStatus"
            :position="'center'"
            :rotate="'rotate-45'"
        />        
    </div>
</template>
<style>

    
</style>
<script>
import DropdownBasis from '../../elements/DropdownEl';
import db from '../../firebase/firebase';

export default {
    name: 'Status',
    components: {
        DropdownBasis: DropdownBasis,
    },
    props: [
        "status",
        "tile",
        "name",
        "parentId",
        "id"
    ],
    data(){
        return { 
        }
    },
    created: function(){

    },
    computed: {
        getBackgroundColor: function(){
            return this.status.filter(el => {
                if(el.text == this.tile.text){
                    return {
                        'background-color': el.background,
                    }
                }
            });
        },
    },
    methods: {
        getChosenStatus(tile){
            this.tile.text = tile.text;
            this.openDropdown = false;
            this.updateData(tile.text);
        },
        updateData(text){
            const tileRef = db.collection("tiles").doc(this.parentId).collection('test').doc(this.id);
            return tileRef.set({
                [this.name]: {
                    text: text
                }
            },{ merge: true});
        }
    }
}
</script>
<style lang="scss">
    .tile--status {
        text-align: center;
        font-size: 11px;
        &:hover {
            .dropdown {
                background-color: rgba(white, 0.2)
            }
        }
        .dropdown {
            width: 100%;
        }
        .dropdown-trigger {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            span {
                color: white;
                width: 100%;
            }
        }
        .dropdown-menu {
            top: 0;
            width: 200px;
            .dropdown-content {
                transform: translate(-10%, 35px);
                &:before {
                    $triangle-width: 12px;
                    content: "";
                    position: absolute;
                    width: 0; 
                    height: 0; 
                    border-left: $triangle-width solid transparent;
                    border-right: $triangle-width solid transparent;
                    border-bottom: 9px solid white;
                    top: -9px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .dropdown-grid {
                    grid-template-columns: 1fr 1fr;
                    display: grid;
                    grid-gap: 5px;
                }
                a.dropdown-item {
                    text-align: center;
                    padding: 0.5rem;
                    display: inline-block;
                    color: white;
                    &:hover {
                        opacity: 0.8;
                        background-color: inherit;
                        color: white;
                    }
                }
            }
        }
    }
</style>
