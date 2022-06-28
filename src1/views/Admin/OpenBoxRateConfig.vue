<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-8 offset-md-2">
      <h4>Open Box Rate Config - Rate (per item)</h4>
      <hr>
      <div class="row" v-for="items in _.chunk(list,4)">
        <div class="col-md-6" v-for="item in items">
          <div class="form-group my-2">
            <label>{{ item.type }} - Value: {{ item.value }} - Skin: {{ item.skin_id }}</label>
            <input type="text" class="form-control" v-model="item.rate">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <button class="btn btn-success" type="button" @click="update">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "OpenBoxRateConfig",
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    let vm = this;
    vm.getList();
  },
  methods: {
    getList() {
      let vm = this;
      vm.$store.dispatch('admin/listConfigOpenBoxRate', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.list = data;
        }
      }).catch(e => {
        vm.error(e.message);
        vm.$store.dispatch('auth/setAdmin', false);
      })
    },
    update() {
      let vm = this;
      vm.$store.dispatch('admin/updateOpenBoxRate', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        configs: vm.list,
      }).then(response => {
        let {success, message} = response;
        if (success) {
          vm.success(message);
        }
      }).catch(e => {
        vm.error(e.message);
        vm.$store.dispatch('auth/setAdmin', false);
      })
    },
  }
}
</script>

<style scoped>

</style>
