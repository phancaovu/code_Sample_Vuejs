<template>
  <span>{{ time }}</span>
</template>

<script>
import moment from "moment";

export default {
  name: "Countdown",
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      time: ''
    }
  },
  created() {
    this.init();
    this.setCountdown();
  },
  methods: {
    init() {
      let timestamp = moment(this.timestamp, 'x');
      let duration = moment.duration(timestamp.diff(moment().utc()));
      this.time = duration.days() + 'd : ' + duration.abs().hours() + 'h : ' + duration.abs().minutes() + 'm : ' + duration.abs().seconds() + 's';
      this.$forceUpdate();
    },
    setCountdown() {
      let vm = this;
      setInterval(() => {
        vm.init();
      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>
