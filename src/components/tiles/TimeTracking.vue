<template>
    <div class="tile--timetracking">
       <span class="icon">
            <i :class="play ? 'fa-pause-circle' : 'fa-play-circle'" class="fas" @click="timer()"></i>
        </span>
        <ul class="list--time is-inline-flex">
            <template v-if="hours !== 0">
            <li class="list-item">{{hours}}h</li>
            </template>
            <li class="list-item">{{minutes}}m</li>
            <li class="list-item">{{seconds}}s</li>
        </ul>
    </div>
</template>
<style>

    
</style>
<script>
import DropdownBasis from '../../elements/DropdownEl';
import db from '../../firebase/firebase';

export default {
    name: 'TimeTracking',
    components: {
        DropdownBasis: DropdownBasis,
    },
    props: [
        "tile",
        "name",
        "parentId",
        "id"
    ],
    data(){
        return { 
            play: false,
            date: null,
            interval:null,
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
            intervals:{
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            }
        }
    },
    created: function(){

    },
    computed: {
      
    },
    mounted: function(){
        this.constructTime();
    },
    methods: {
        constructTime(){
            if(this.tile.text.length > 0){
                const timeArray = this.tile.text.split(':');
                this.days = Number(timeArray[0]);
                this.hours = Number(timeArray[1]);
                this.minutes = Number(timeArray[2]);
                this.seconds = Number(timeArray[3]);
            }
        },

        timer(){
            this.play = !this.play
            this.date = new Date();

            const TimedSession = {
                seconds: this.seconds,
                minutes: this.minutes,
                hours: this.hours,
                days: this.days,
            }

            if(this.play){
                this.interval = setInterval(() => {
                    this.updateTime(TimedSession);
                },1000);
            } else {
                this.updateData(TimedSession);
                clearInterval(this.interval);    
            }
        },
        updateData(time){
            const dir = db.collection('tiles').doc(this.parentId).collection('test').doc(this.id);
            const constructedTime = `${time.days}:${time.hours}:${time.minutes}:${time.seconds}`;
            
            dir.update(`${this.name}.text`, constructedTime).catch((error) => {
				console.error("Error updating document: ", error);
			});
        },
        updateTime(time) {
            let diff = Math.abs(Date.now() - this.date.getTime());
            this.days = time.days + Math.floor(diff / this.intervals.day);

            diff -= this.days * this.intervals.day;
            this.hours = time.hours + Math.floor(diff / this.intervals.hour);

            diff -= this.hours * this.intervals.hour;
            this.minutes = time.minutes + Math.floor(diff / this.intervals.minute);

            diff -= this.minutes * this.intervals.minute;
            this.seconds = time.seconds + Math.floor(diff / this.intervals.second);
        }
    }
}
</script>
<style lang="scss">
    $dropdown-item-hover-background-color: #009AFF;
    .tile--timetracking {
        display: flex;
        height: 33px;
        justify-content: center;
        align-items: center;
        padding: 0 5px;

        .list--time, .icon {
            margin-right: auto;
        }
        .icon {
            color: $dropdown-item-hover-background-color;
        }
        .list-item {
            padding: 0 1px;
            border: none;
        }
    }
</style>
