<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-12">
      <h4>Reback Snake</h4>
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
  name: "RebackSnake",
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
      vm.$store.dispatch('admin/listSnakeRefund', {
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
              vm.$store.dispatch('admin/updateSnakeRefund', {
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
  }
}
</script>

<style scoped>

</style>
