<template>
    <div :class="[openDropdown ? 'is-active' : '', 'is-'+ position]" class="dropdown">
        <div class="dropdown-trigger is-margin-auto">
            <span :class="[rotate, hover]" class="icon dropdown-icon" @click="collapse(), openDropdown = !openDropdown">
                <i :class="icon"></i>
            </span>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <template v-if="!showNextMenu">
                <div class="dropdown-content">
                    <a v-for="(item, index) in dropdownItems" v-bind:key="index" @click.prevent="sendType(item.function, item.dropdownContent)" href="#" class="dropdown-item">
                        <span class="icon">
                            <i class="fas" :class="'fa-' + item.icon"></i>
                        </span>
                        <span>
                            {{item.text}}
                        </span>
                    </a>
                  
                    <hr class="dropdown-divider">
                    <div class="dropdown-item has-text-centered">
                        <a @click.prevent="openDropdown = false" href="#">
                            Cancel
                        </a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="dropdown-content">
                    <slot></slot>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DropdownBasis',
    props: [
        "dropdownItems",
        "dropdownType",
        "icon",
        "position",
        "tiles",
        "hover",
        "rotate",
    ],
    data() {
        return {
            openDropdown: false,
			newColumnText: '',
        }
    },
    computed: {
        showNextMenu(){
            return this.dropdownType ? this.dropdownType : false;
        }
    },
    methods: {
        collapse(){
            this.$emit('collapse', false);
        },
        sendType(func, dropdownContent) {
            this.$emit('clicked', {func, dropdownContent});
            if(func) this.openDropdown = !this.openDropdown;
        }
    }
}
</script>
<style lang="scss">
    $dropdown-item-hover-background-color: #009AFF;
    $dropdown-item-hover-color: white;
    $dropdown-menu-min-width: 160px;
    $dropdown-content-shadow: 0 4px 17px 6px rgba(0, 0, 0, 0.1);
    $icon-hover-background: #009AFF;
    @import '~bulma';

	.dropdown {
        height: 35px;
        &.is-active {
            .rotate-45 {
                transform: rotate(45deg);
            }
            .rotate-180 {
                transform: rotate(180deg);
            }			
            .dropdown-icon:not(.no-hover) {
                color: $icon-hover-background;
			}
        }
        &.is-left {
            .dropdown-content {
                margin-left: 5px;
            }
        }
        &-icon:not(.no-hover):hover {
            color: $icon-hover-background;
        }
        &-menu {
            width: $dropdown-menu-min-width;
        }
        &-content {
            padding: $dropdown-content-padding-top;
            z-index: 100;
        }
        &-item {
            border-radius: $radius;
            padding: 0.375rem 0.5rem;
            font-weight: $weight-normal;
            font-size: 13px;
            .icon {
                margin-right: 10px;
            }
        }
        &-divider {
            &:before {
                height: inherit;
                width: 100%;
                position: absolute;
                background: inherit;
                content: "";
                left: 0px;
            }

        }
	}
</style>
