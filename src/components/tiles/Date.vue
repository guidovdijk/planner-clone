<template>
    <div class="tile__timeline">
        <div :style="{'background-color': color}"  class="time">
            <template v-if="tile.date.start.length">
                <span class="time__start">{{tile.date.start}}</span>
                <span class="time__break">-</span>
            </template>
            <template v-if="tile.date.end.length">
                <span class="time__end">{{tile.date.end}}</span>
            </template>
            <div v-if="!tile.date.start.length && !tile.date.end.length">
                ---
            </div>
        </div>
    </div>
</template>
<style>

    
</style>
<script>
export default {
    name: 'Date',
    data(){
        return {

        }
    },
    props: [
        "tile",
        "start",
        "end",
        "color",
    ],
    methods: {

    },
    mounted(){
        console.log(this.tile);
    }
}
</script>
<style lang="scss">
    .tile__timeline{
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .time {
        width: 100%;
        margin: auto;
        font-size: 11px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        border-radius: 10px;
        color: white;
        height: 20px;
        max-width: 130px;
        padding: 0px 10px;
        align-items: center;
        font-weight: bold;
        &__start {

        }
        &__end {

        }
    }
</style>
