<template>
  <section>
    <div class="row mx-0">
      <LeftTab></LeftTab>
      <div class="col-lg-9 ps-xxl-0">
        <div class="right-tab mt-3">
          <div class="my-wallet">
            <div class="row mx-0">
              <div class="block-bg-full">
                <div class="title-main text-center">
                  <div class="position-relative d-inline-block text-uppercase">
                    <div class="icon"><img src="../assets/images/claim/logo/1-3.png" alt=""></div>
                    <h1 class="text-gradient-yellow text-gold">COWS Distribution Portal</h1>
                  </div>
                </div>
                <div class="bg-content">
<!--                  <div class="max-sm">-->
<!--                    <div class="block-text-code text-center">-->
<!--                      <div class="text-code text-gold">-->
<!--                        0x531Abf3223082134c109de8aEa63BBFc1965D6f8-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="title-line text-center text-gold">-->
<!--                    <h3>Select token</h3>-->
<!--                  </div>-->
<!--                  <div class="block-select text-center">-->
<!--                    <div class="block-custom-select d-inline-block">-->
<!--                      <select name="" id="" class="form-control text-gradient-yellow custom-select d-inline-block">-->
<!--                        <option value="">ANGEL</option>-->
<!--                        <option value="">ANGEL 2</option>-->
<!--                        <option value="">ANGEL 3</option>-->
<!--                      </select>-->
<!--                      <div class="icon-select">-->
<!--                        <img src="../assets/images/claim/icon/2-1.png" alt="">-->
<!--                      </div>-->
<!--                      <div class="bg-img"><img src="../assets/images/claim/btn/3-1.png" alt="" style="height: 42px;"></div>-->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="max-sm p-3">
                    <div class="row text-center">
                      <div class="col-4">
                        <div>
                          <div class="title text-gold">Available    </div>
                          <div class="value text-gold">{{ totalCOWS | money('',false,0) }} COWS</div>
                          <div class="value text-gold">{{ totalRIM | money('',false,0) }} RIM</div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div>
                          <div class="title text-gold">Claimed    </div>
                          <div class="value text-gold">{{ totalCOWS | money('',false,0) }} COWS</div>
                          <div class="value text-gold">{{ totalRIM | money('',false,0) }} RIM</div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div>
                          <div class="title text-gold">Claimable   </div>
                          <div class="value text-gold">{{ totalCOWS | money('',false,0) }} COWS</div>
                          <div class="value text-gold">{{ totalRIM | money('',false,0) }} RIM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center border-top p-3">
                    <button :disabled="isClaimCOWS" class="btn btn-play" @click.prevent="claimToken">Claim </button>
                  </div>
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
import {ethers} from "ethers";
import {mapState} from "vuex";

export default {
  name: "ClaimToken",
  components:{LeftTab},
  computed: {
    ...mapState(['account', 'contract', 'token_price']),
  },
  data(){
    return {
      isClaimCOWS:false,
      // isClaimRIM:false,
      totalCOWS: 0,
      totalRIM: 0,
      claimedRIM: 0,
      claimedCOWS: 0,
      // claimableRIM: 0,
      // claimableCOWS: 0
    }
  },
  async mounted() {
    let vm =this
    await vm.checkIsClaimCOWS()
  },
  methods: {
    async checkIsClaimCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_CLAIM',
          signer: vm.account.wallet.signer,
        })
        try {
          let totalAmountClaimCOWS = await contract.amountCOWS()
          let totalAmountClaimRIM = await contract.amountRIM()

          vm.totalCOWS = ethers.utils.formatEther(totalAmountClaimCOWS)
          vm.totalRIM = ethers.utils.formatEther(totalAmountClaimRIM)

          let amountClaimCOWS = await contract.claimCOWSAmount(vm.account.detail.wallet_address)
          // let amountClaimRIM = await contract.claimRIMAmount(vm.account.detail.wallet_address)

          if (amountClaimCOWS.eq(totalAmountClaimCOWS)) {
            vm.isClaimCOWS = true
            // vm.isClaimRIM = true
            vm.claimedCOWS = ethers.utils.formatEther(totalAmountClaimCOWS)
            vm.claimedRIM = ethers.utils.formatEther(totalAmountClaimRIM)
            vm.totalCOWS = 0
            vm.totalRIM = 0
          }
          vm.$forceUpdate()
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isClaimCOWS = false
          vm.isClaimRIM = false
        }
      }
    },
    async claimToken() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_CLAIM',
          signer: vm.account.wallet.signer,
        })
        try {
          let claim = await contract.ClaimToken()

          await claim.wait();

          await vm.checkIsClaimCOWS();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      } else {
        vm.error('Please connect wallet')
      }
    },
  },
  watch: {
    async 'account.detail.wallet_address'() {
      let vm = this;
      await vm.checkIsClaimCOWS()
    }
  }
}
</script>

<style scoped>
.btn-play {
  color: #936423;
  text-transform: uppercase;
  border-radius: 10px;
  background: url(../assets/images/btnmenu.png) no-repeat center center;
  background-size: 100% 100%;
}
</style>
