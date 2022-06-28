<template>
  <section>
    <div class="row mx-0">
      <div class="col-lg-9">
        <div class="row mx-0" v-for="events in list.docs">
          <div class="col-lg-6" v-for="event in events">
            <div class="right-tab" style="cursor: pointer;" @click="selectEvent(event)">
              <div class="event-box py-5">
                <img class="w-100 px-4" src="../../assets/images/egg-event.png">
                <img class="w-100 my-3" src="../../assets/images/line.png">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="text-radiant text-uppercase text-center">{{ event.title }}</div>
                  <div class="eg-id px-3 py-2 position-relative">
                    <img src="../../assets/images/id-egg.png">
                    <div class="position-absolute top-50 start-50 translate-middle">
                      #{{ event.id }}
                    </div>
                  </div>
                </div>
                <img class="w-100 my-3" src="../../assets/images/line.png">
                <div class="d-flex justify-content-center align-items-center fs-5">
                  <div class="text-warning">PRICE</div>
                  <img class="icon-img mx-2" src="../../assets/images/cowscoin.png">
                  <div class="eg-id">{{ event.price | money('COWS') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";
import {mapState} from "vuex";

export default {
  name: 'Event',
  components: {
    LeftTab
  },
  computed: {
    ...mapState(['event']),
  },
  data() {
    return {
      list: {
        docs: [],
        page: 1,
        paginate: 20
      }
    }
  },
  created() {
    let vm = this;
    vm.getListEvent();
  },
  methods: {
    getListEvent() {
      let vm = this;
      vm.$store.dispatch('event/listEvent', {
        page: vm.list.page,
        paginate: vm.list.paginate,
      }).then(response => {
        let {success, data} = response;
        if (success) {
          vm.list.docs = _.chunk(data.docs, 3);
        }
      }).catch(e => {
        this.error(e.message);
      })
    },
    selectEvent(event) {
      let vm = this;
      vm.$router.push({name: 'EventDetail', params: {id: event.id,}})
    }
  }
}
</script>
