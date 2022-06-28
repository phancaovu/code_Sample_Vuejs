<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-12">
      <h4>Reback RIM</h4>
      <hr>
      <br/>
      <div class="row" v-if="list.length > 0">
        <div class="col-md-12">
          <table class="table top-list text-center">
            <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Before Balance</th>
              <th scope="col">After Balance</th>
              <th scope="col">Amount</th>
              <th scope="col">Message</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
              <th scope="row">{{ item.username }}</th>
              <td>{{ item.type }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.before_balance }}</td>
              <td>{{ item.after_balance }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.message }}</td>
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
            <th scope="col">Username</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Before Balance</th>
            <th scope="col">After Balance</th>
            <th scope="col">Amount</th>
            <th scope="col">Message</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colspan="9">No data</td>
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
  name: "RebackRim",
  computed: {
    ...mapState(['auth'])
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
      vm.$store.dispatch('admin/listUserReback').then(response => {
        let {success, data} = response;
        if (success) {
          vm.list = data;
        }
      }).catch(e => {
        vm.error(e.message);
        vm.$store.dispatch('auth/setAdmin', false);
      })
    },
    update(id, username, amount) {
      let vm = this;
      $.confirm({
        title: 'Reback RIM!',
        content: 'You reback RIM ID: ' + id,
        buttons: {
          confirm: {
            text: 'Confirm (Enter)',
            btnClass: 'btn-success',
            keys: ['enter'],
            action: function () {
              vm.$store.dispatch('admin/submitReback', {id}).then(response => {
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
    }
  }
}
</script>

<style scoped>

</style>
