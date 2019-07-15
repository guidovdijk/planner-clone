<template>
    <DropdownBasis 
        :tiles="tiles"
        :dropdownItems="dropdown[0]"
        @clicked="setType"
        :dropdownType="nextDropdownMenuStep"
        :icon="'fas fa-plus-circle'"
        :position="'right'"
        :rotate="'rotate-45'"
    >
        <template>
            <div class="dropdown-item">
                <input class="input has-text-left" v-model="newColumnText" type="text" placeholder="Column name...">
            </div>
            <div class="dropdown-item">                   
                <a @click.prevent="addColumn" class="button is-primary is-flex is-fullwidth">Add column</a>
            </div>
            <hr class="dropdown-divider">
            <div class="dropdown-item">                   
                <a @click.prevent="nextDropdownMenuStep = false" class="is-secondary">Back</a>
            </div>
        </template>
    </DropdownBasis>
</template>
<script>
import DropdownBasis from '../../elements/DropdownEl';
export default {
    name: 'DropdownAdd',
    props: [
        "tiles",
        "dropdownItems",
        "dropdownType",
    ],
    components: {
        DropdownBasis: DropdownBasis,
    },
    data() {
        return {
            newColumnText: '',
            nextDropdownMenuStep: false,
			dropdown: [	
                [
                    {
                        text: "status",
                        icon: "align-justify",
                    },
                    {
                        text: "Text",
                        icon: "font",
                    },
                    {
                        text: "Datum",
                        icon: "calendar-alt",
                    },
                ]
            ],	
        }
    },
    methods: {
        setType(dropdownType){
            this.nextDropdownMenuStep = dropdownType;
        },
        addColumn(){
            if(this.newColumnText.length > 0){
                this.$store.commit('addColumn', {id: this.tiles, text: this.newColumnText, type: this.nextDropdownMenuStep});
                this.$store.dispatch('setTiles');
            } else {
                console.log('denied')
            }
        },
    }
}
</script>
<style lang="scss">

</style>
