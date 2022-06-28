<template>
  <section>
    <div class="admin-page">
      <AdminMenu></AdminMenu>
      <LoginPassword v-if="!auth.IS_ADMIN"></LoginPassword>
      <div class="row mx-0 mt-5" v-else>
        <div class="col-md-4 offset-md-2 border-end">
          <h4>Snake Config</h4>
          <hr>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <p class="text-center mb-1 text-warning text-capitalize">snake type</p>
                <select class="form-control" v-model="select_snake">
                  <option v-for="item in listSnake" :value="item.id+'_'+item.skin">
                    {{ item.name }} {{ item.skin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group text-center mt-1">
                <img class="img-fluid" :src="snakeImage(_.toUpper(snake.name)+'_'+snake.skin)" width="150" height="150">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">price cst</p>
                <small>no min max</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.price_cst">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">growth</p>
                <small>min: 115 max: 150</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.growth">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">twist</p>
                <small>min: 100 max: 500</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.twist">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">attraction</p>
                <small>min: 100 max: 200</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.attraction">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">viewport</p>
                <small>min: 100 max: 200</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.viewport">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">length</p>
                <small>min: 10</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.length">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">speedMultiplier</p>
                <small>min: 200 max: 400</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.speedMultiplier">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">health</p>
                <small>no min max</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.health">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1 text-center">
                <p class="text-center mb-1 text-warning text-capitalize">maxtreasure</p>
                <small>no min max</small>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="snake.maxtreasure">
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-md-12 d-grid gap-2">
              <button class="btn btn-submit mx-auto btn-block" @click.prevent="defineSnake">Save</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h4>Item Config</h4>
          <hr>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <p class="text-center mb-1 text-warning text-capitalize">item type</p>
                <select class="form-control" v-model="select_item">
                  <option v-for="item in listItem" v-text="item.name"
                          :value="item.id"></option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1">
                <p class="text-center mb-1 text-warning text-capitalize">time show</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="item.timeshow">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1">
                <p class="text-center mb-1 text-warning text-capitalize">time live</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="item.timelive">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mt-1">
                <p class="text-center mb-1 text-warning text-capitalize">amount</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="item.amount">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-1">
                <p class="text-center mb-1 text-warning text-capitalize">amountPVE</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="number" v-model.number="item.amountPVE">
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-md-12 d-grid gap-2">
              <button class="btn btn-submit mx-auto btn-block" @click.prevent="configItem">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";
import {mapState} from 'vuex';
import LoginPassword from "@/components/LoginPassword";

export default {
  name: 'GameSetting',
  components: {
    AdminMenu,
    LoginPassword
  },
  computed: {
    ...mapState(['auth'])
  },
  data() {
    return {
      select_snake: null,
      select_item: 1,
      snake: {},
      item: {},
      listSnake: [],
      listItem: [],
    }
  },
  methods: {
    snakeImage(name) {
      try {
        return require("../../assets/images/snakes/" + name + '.png');
      } catch (e) {
        return null;
      }
    },
    async configItem() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
      vm.item.password = vm.auth.PASSWORD;
      vm.$store.dispatch('config/configItem', vm.item).then(async response => {
        let {data, message, success} = response;
        if (success && data.result) {
          this.success('Config Successfully');
          await vm.getListItem();
        } else {
          this.error(message);
        }
      }).catch(e => {
        if (_.isArray(e)) {
          e.forEach(msg => {
            this.error(msg);
          })
        } else {
          this.error(e)
        }
      });
    },
    async defineSnake() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
      vm.snake.password = vm.auth.PASSWORD;
      vm.$store.dispatch('config/defineSnake', vm.snake).then(async response => {
        let {data, message, success} = response;
        if (success) {
          this.success('Config Successfully');
          vm.getlistSnake();
        } else {
          this.error(message);
        }
      }).catch(e => {
        this.error(e);
      });
    },
    async getlistSnake() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
      vm.$store.dispatch('config/listSnake').then(async response => {
        let {data, message, success} = response;
        if (success) {
          vm.listSnake = data.api.list
          vm.snake = data.api.list[0]
          vm.select_snake = vm.snake.id + '_' + vm.snake.skin;
        } else {
          this.error(message);
        }
      }).catch(e => {
        e.forEach(msg => {
          this.error(msg);
        })
      });
    },
    async getListItem() {
      let vm = this;
      if (!vm.auth.IS_ADMIN) {
        vm.error('Please login to access function');
        return null;
      }
      vm.$store.dispatch('config/listItem', vm.snake).then(async response => {
        let {data, message, success} = response;
        if (success) {
          vm.listItem = data.api.list
          vm.item = data.api.list[0]
        } else {
          this.error(message);
        }
      }).catch(e => {
        e.forEach(msg => {
          this.error(msg);
        })
      });
    },
  },
  watch: {
    'select_snake'(new_value, old_value) {
      let spit_id = new_value.split('_');
      this.snake = _.find(this.listSnake, function (item) {
        // console.log(item.id, item.skin, spit_id[0], spit_id[1])
        return item.id == spit_id[0] && item.skin == spit_id[1];
      });

      this.snake = _.transform(this.snake, function (result, value, key) {
        if (_.isNumber(value) && ['id', 'skin', 'length'].indexOf(key) == -1) {
          result[key] = Math.round(value * 100);
        } else {
          result[key] = value;
        }
        return result;
      }, {});
    },
    'select_item'(new_value, old_value) {
      this.item = _.find(this.listItem, {id: new_value});
    },
    async 'auth.IS_ADMIN'(new_value) {
      let vm = this;
      if (new_value) {
        await vm.getlistSnake();
        await vm.getListItem();
      }
    }
  }
}
</script>
