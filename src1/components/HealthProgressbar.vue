<template>
  <div class="progress-bar health-bar" role="progressbar" :style="{width}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</template>

<script>
import moment from "moment";

export default {
  name: "HealthProcessbar",
  props: {
    health: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      width: '0%',
      timeout: null,
    }
  },
  mounted() {
    let vm = this;
    let now = moment().utc();
    if (now.valueOf() >= this.timestamp) {
      this.width = '0%';
    } else {
      vm.updateProgressbar();
      vm.timeout = setInterval(() => {
        vm.updateProgressbar();
      }, 180000); // 3 minutes
    }
  },
  methods: {
    updateProgressbar() {
      let now = moment().utc();
      let timestamp = moment(this.timestamp, 'x');
      let to = Number(timestamp.diff(now, 'minutes'));
      let percent = (to / moment.duration(this.health, 'hours').asMinutes()) * 100;
      this.width = percent.toFixed(2) + '%';
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>
