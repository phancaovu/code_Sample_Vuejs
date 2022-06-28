<template>
  <div class="row mx-0 mt-5">
    <div class="col-md-12">
      <h4>Transaction Rim Check</h4>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group my-2">
            <label>Input transaction</label>
            <input type="text" class="form-control" v-model="transaction">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <button class="btn btn-success" type="button" @click="search">Check</button>
          </div>
        </div>
      </div>
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
  name: "TransactionRimCheck",
  computed: {
    ...mapState(['auth'])
  },
  data() {
    return {
      transaction: '',
      list: []
    }
  },
  methods: {
    search() {
      let vm = this;
      vm.$store.dispatch('admin/checkDepositRimTransaction', {
        transaction_hash: this.transaction
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.list = data;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
