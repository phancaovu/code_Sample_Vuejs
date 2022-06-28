<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-8 offset-md-2">
      <h4>Compound piece Config - Rate: (0.01 = 1%)</h4>
      <hr>
      <div class="row" v-for="items in _.chunk(list,4)">
        <div class="col-md-12" v-for="item in items">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group my-2">
                <label>Rate: ({{ item.quantity }})</label>
                <input type="text" class="form-control" v-model="item.rate">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group my-2">
                <label>Fail destroy: ({{ item.quantity }})</label>
                <input type="text" class="form-control" v-model="item.fail_destroy">
              </div>
            </div>
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
  name: "CompoundRateConfig",
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

      vm.$store.dispatch('admin/listConfigCompoundPiece', {
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        password: vm.auth.PASSWORD,
      }).then(response => {
        let {success, data, message} = response;
        if (success) {
          vm.list = data;
        } else {
          vm.error(message);
        }
      }).catch(e => {
        vm.error(e.message);
        vm.$store.dispatch('auth/setAdmin', false);
      })
    },
    update() {
      let vm = this;
      vm.$store.dispatch('admin/updateCompoundPiece', {
        password: vm.auth.PASSWORD,
        type: 'SCREEN_PASSWORD_' + this.currentRouteName,
        configs: vm.list
      }).then(response => {
        let {success, data, message} = response;
        if (success) {
          vm.success(message);
        } else {
          vm.error(message);
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
