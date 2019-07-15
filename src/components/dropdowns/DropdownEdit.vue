<template>
    <DropdownBasis 
        :tiles="tiles"
        :dropdownItems="dropdown[0]"
        @clicked="setType"
        @collapse="collapse"
        :dropdownType="nextDropdownMenuStep"
        :icon="'fas fa-chevron-circle-down'"
        :position="'left'"
        :rotate="'rotate-180'"
        :hover="'no-hover'"
    >
        <template v-if="nextDropdownMenuStep == 'change color'">
            <div class="dropdown-item">
                <div class="color-circles">
                    <a v-for="(color, index) in colors" 
                        v-bind:key="index" 
                        @click.prevent="changeColor(color)" 
                        :style="{'background-color': color}" 
                        class="color-circles__circle" 
                        :class="checkColor(color) ? 'is-active' : ''"
                        href="#">
                    </a>
                </div>
            </div>
            <hr class="dropdown-divider">
            <div class="dropdown-item has-text-centered">                   
                <a @click.prevent="nextDropdownMenuStep = false" class="is-secondary">Back</a>
            </div>
        </template>
    </DropdownBasis>
</template>
<script>
import db from '../../firebase/firebase';
import DropdownBasis from '../../elements/DropdownEl';
export default {
    name: 'DropdownEdit',
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
            activeColor: '',
            colors: [
                'red',
                'blue',
                'green',
                'yellow',
                'pink',
                'orange',
            ],
			dropdown: [	
                [
                    {
                        text: "Collapse",
                        function: 'collapse',
                        dropdownContent: false,
                        icon: "chevron-circle-up",
                    },
                    {
                        text: "Change color",
                        function: false,
                        dropdownContent: 'change color',
                        icon: "palette",
                    },
                    {
                        text: "Delete",
                        function: 'delete',
                        dropdownContent: false,
                        icon: "trash-alt",
                    },
                ]
            ],	
        }
    },
    mounted(){
        this.getActiveColor();
    },
    methods: {
        setType(data){
            if(data.function){
                this.$emit('collapse', data.dropdownContent);
                this[data.function]();
            }

            if(data.dropdownContent){
                this.nextDropdownMenuStep = data.dropdownContent;
            }

        },
        collapse(boolean = true){
            this.$emit('collapse', boolean);
            this.nextDropdownMenuStep = false;
        },
        delete(){
            console.log('delete');
            // db.collection('tiles').doc(this.tiles).delete(); // Deletes without warning. Don't touch
        },
        getActiveColor(){
            return db.collection("tiles").doc(this.tiles).get().then(doc => {
                this.activeColor = doc.data().color;
            });
        },
        checkColor(color){
            return color === this.activeColor;
        },
        changeColor(color){
            const tileRef = db.collection("tiles").doc(this.tiles)
            return tileRef.update({
                color: color
            }).then(() => {
                this.getActiveColor();
            });
        },
    }
}
</script>
<style lang="scss">
    @import '~bulma';

    .color-circles {
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
        &__circle {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            margin: 5px;
            margin-left: 0;
            margin-right: 10px;
            &.is-active {
                box-shadow: 0 0 0 2px $white, 0 0 0 3px $grey-lighter;
            }
            &:hover {
                opacity: 0.7;
            }
        }
    }
</style>
