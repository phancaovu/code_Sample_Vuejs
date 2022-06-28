<template>
  <span>{{ text }}</span>
</template>
<script>
import moment from "moment";

export default {
  name: "CountdownText",
  props: {
    to_time: {
      required: true,
      type: String,
    },
    format: {
      required: true,
      default: 'dhms'
    }
  },
  data() {
    return {
      time: '',
    }
  },
  created() {
  },
  methods: {
    init() {
      let timestamp = moment(this.to_time, 'YYYY-MM-DD HH:mm:ss');
      let duration = moment.duration(timestamp.diff(moment().utc()));
      this.time = duration.days() + 'd :' + duration.abs().hours() + 'h :' + duration.abs().minutes() + 'm :' + duration.abs().seconds() + 's';
      this.$forceUpdate();
    },
  }
}
</script>

<style scoped>

</style>