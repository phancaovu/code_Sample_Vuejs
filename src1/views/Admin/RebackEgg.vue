<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-12">
      <h4>Reback Egg</h4>
      <hr>
      <br/>
      <div class="row" v-if="list.length > 0">
        <div class="col-md-12">
          <table class="table top-list text-center">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
              <th scope="row">{{ item.id }}</th>
              <th scope="row">{{ item.UserGame.username }}</th>
              <td>{{ item.snake_type }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.updatedAt }}</td>
              <td>
                <button type="button" @click="update(item.id, item.username, item.amount)">Reback</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <table class="table top-list text-center">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colspan="6">No data</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "RebackEgg",
  computed: {
    ...mapState(['auth']),
    currentRouteName() {
      return this.$route.name
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    let vm = this;
    vm.search();
  },
  methods: {
    search() {
      let vm = this;
      vm.$store.dispatch('admin/listEggRefund', {
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
    update(id) {
      let vm = this;
      $.confirm({
        title: 'Reback Piece!',
        content: 'You reback Piece ID: ' + id,
        buttons: {
          confirm: {
            text: 'Confirm (Enter)',
            btnClass: 'btn-success',
            keys: ['enter'],
            action: function () {
              vm.$store.dispatch('admin/updateEggRefund', {
                password: vm.auth.PASSWORD,
                type: 'SCREEN_PASSWORD_' + vm.currentRouteName,
                id
              }).then(response => {
                let {success, data, message} = response;
                if (success) {
                  vm.success(message);
                  vm.search()
                  vm.$forceUpdate();
                } else {
                  vm.error(message);
                }
              }).catch(e => {
                vm.error(e.message);
                vm.$store.dispatch('auth/setAdmin', false);
              })
            }
          },
          cancel: {
            text: 'Cancel',
            btnClass: 'btn-dark',
            keys: ['esc']
          },
        }
      });
    },
    symbolSnake(snake_type, skin_id, prefix = '-') {
      let type = 'NEP';
      let snakes = [
        {snake_type: 'NAGA', skin_id: 1, id: 1},
        {snake_type: 'NAGA', skin_id: 8, id: 2},
        {snake_type: 'NAGA', skin_id: 9, id: 3},
        {snake_type: 'NAGA', skin_id: 10, id: 4},
        {snake_type: 'HYDRA', skin_id: 1, id: 5},
        {snake_type: 'HYDRA', skin_id: 2, id: 6},
        {snake_type: 'HYDRA', skin_id: 3, id: 7},
        {snake_type: 'HYDRA', skin_id: 4, id: 8},
        {snake_type: 'LORD', skin_id: 4, id: 9},
        {snake_type: 'LORD', skin_id: 5, id: 10},
        {snake_type: 'LORD', skin_id: 6, id: 11},
        {snake_type: 'LORD', skin_id: 7, id: 12},
        {snake_type: 'SHENRON', skin_id: 1, id: 13},
        {snake_type: 'SHENRON', skin_id: 2, id: 14},
        {snake_type: 'SHENRON', skin_id: 3, id: 15},
        {snake_type: 'SHENRON', skin_id: 4, id: 16},
        {snake_type: 'UNICORN', skin_id: 1, id: 17},
      ];
      let obj = _.find(snakes, snake => {
        return snake.snake_type === snake_type && snake.skin_id === skin_id;
      });
      if (obj) {
        return type + prefix + obj.id;
      }
      return type;
    },
  }
}
</script>

<style scoped>

</style>
