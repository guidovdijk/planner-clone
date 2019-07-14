<template>
    <div class="tile--status">
        <DropdownBasis 
            :dropdownItems="dropdown[0]"
            :text="'status'"
            :position="'center'"
            :rotate="'rotate-45'"
        />        
    </div>
</template>
<style>

    
</style>
<script>
import DropdownBasis from '../../elements/DropdownEl';

export default {
    name: 'Status',
    components: {
        DropdownBasis: DropdownBasis,
    },
    props: [
        "status",
    ],
    data(){
        return {
            dropdown: [	
                [
                    {
                        text: "status",
                        background: 'red',
                    },
                    {
                        text: "Text",
                        background: 'red',
                    },
                    {
                        text: "Datum",
                        background: 'red',
                    },
                ]
            ],	
        }
    }
}
</script>
<style lang="scss">
    .tile--status {
        text-align: center;
        font-size: 11px;
        .dropdown {
            width: 100%;
        }
        .dropdown-trigger {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            span {
                width: 100%;
            }
        }
        .dropdown-menu {
            top: 0;
            width: 200px;
            .dropdown-content {
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
