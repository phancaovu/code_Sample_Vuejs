<template>
  <div class="mywallet-content">
    <!--modal-->
    <ModalStep :step_detail="step_detail"></ModalStep>
    <div class="modal fade" id="unlock-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">Unlock</h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body">
            <div class="row mx-0 my-3">
              <div class="col-10 offset-1">
                <div class="border rounded p-3 mb-3">
                  <p class="d-flex justify-content-between"><span>Unlock</span></p>
                  <p class="d-flex justify-content-between mb-0"><span>{{ stakingAmount }}</span><span>COWS</span></p>
                </div>
                <div class="d-grid">
                  <div class="mx-auto">
                    <button class="btn btn-submit" type="submit">
                      <div class="text-radiant" @click.prevent="releaseCOWS">Confirm</div>
                    </button>
                    <button class="btn btn-submit" type="button" data-bs-dismiss="modal">
                      <div class="text-radiant">Cancel</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="unlock-modal-2" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">Unlock</h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body">
            <div class="row mx-0 my-3">
              <div class="col-10 offset-1">
                <div class="border rounded p-3 mb-3">
                  <p class="d-flex justify-content-between"><span>Unlock</span></p>
                  <p class="d-flex justify-content-between mb-0"><span>{{
                      totalReleaseCOWS_2 | money('',false,0)
                    }}</span><span>COWS</span></p>
                </div>
                <div class="d-grid">
                  <div class="mx-auto">
                    <button class="btn btn-submit" type="submit">
                      <div class="text-radiant" @click.prevent="releaseCOWS_2">Confirm</div>
                    </button>
                    <button class="btn btn-submit" type="button" data-bs-dismiss="modal">
                      <div class="text-radiant">Cancel</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="stake-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">Stake</h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body">
            <div class="row mx-0 my-3">
              <div class="col-10 offset-1">
                <div class="border rounded p-3 mb-3">
                  <p class="d-flex justify-content-between">
                    <span>Stake</span><span>Balance {{ balanceCOWS | money('',false,0) }}</span></p>
                  <p class="d-flex justify-content-between mb-0"><span>500</span><span>COWS</span></p>
                </div>
                <div class="d-grid">
                  <div class="mx-auto">
                    <button class="btn btn-submit" type="submit">
                      <div class="text-radiant" @click.prevent="stakingCOWS">Confirm</div>
                    </button>
                    <button class="btn btn-submit" type="button" data-bs-dismiss="modal">
                      <div class="text-radiant">Cancel</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="stake-input-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0">
            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">Stake</h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body">
            <div class="row mx-0 my-3">
              <div class="col-10 offset-1">
                <div class="border rounded p-3 mb-3">
                  <p class="d-flex justify-content-between">
                    <span>Stake - Minimum: {{ minimumStakingCOWS | money('',false,0) }} COWS </span><span>Balance {{
                      balanceCOWS | money('',false,0)
                    }}</span></p>
                  <div class="row mx-0">
                    <div class="col-6 px-0">
                      <div class="input-group">
                        <input v-model="stakingAmount_2" class="form-control" type="number" placeholder="0.0">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="d-flex align-items-center h-100 justify-content-end">
                        <div class="text-end">COWS</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-grid">
                  <div class="mx-auto">
                    <button class="btn btn-submit" type="submit">
                      <div class="text-radiant" @click.prevent="stakingCOWS_2">Confirm</div>
                    </button>
                    <button class="btn btn-submit" type="button" data-bs-dismiss="modal">
                      <div class="text-radiant">Cancel</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="top-10" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content mywallet-modal">
          <div class="modal-header border-0 pb-0">
            <button class="btn invisible" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">Top 10</h5>
            <button class="btn" type="button" data-bs-dismiss="modal" aria-label="Close"><i
                class="fas fa-times fa-2x text-light"></i></button>
          </div>
          <div class="modal-body pt-0">
            <div class="p-2">
              <table class="table top-list text-center table-borderless">
                <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Username</th>
                  <th scope="col">Wallet Address</th>
                  <th scope="col">Point</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in list.docs">
                  <th scope="row">{{ rank = index + 1 }}</th>
                  <td v-text="item.User.username"></td>
                  <td v-text="splitAddress(item.User.wallet_address)"
                      class="text-truncate wallet-address"></td>
                  <td v-text="item.point"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0">
      <h1 class="text-gold my-3">Pools</h1>
      <div class="col-lg-12">
        <div class="token">
          <div class="token-content p-3">
            <div class="row mx-0">
              <div class="col-6 col-lg-2 text-gold mb-3">
                <p class="mb-0">Lock</p>
                <div class="d-flex align-items-end">
                  <div class="icon-img px-1 d-flex align-items-end"
                  ><img class="w-100" src="../../assets/images/cowscoin.png">
                  </div>
                  <span>COWS</span>
                </div>
              </div>
              <div class="col-6 col-lg-4 text-gold text-lg-center mb-3">
                <p class="mb-1">Reward</p><span>Whitelist Beta Test + Reward Airdrop</span>
              </div>
              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">
                <p class="mb-1">Total COWS Lock</p>
                <p class="mb-0">{{ stakingAmount }} COWS</p>
              </div>
              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">
                <div class="d-flex justify-content-lg-end">
                  <div class="accordion-header">
                    <button class="accordion-button collapsed p-0" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"><span class="me-2">Detail</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion accordion-flush">
              <div class="accordion-item bg-transparent">
                <div class="accordion-collapse collapse show" id="flush-collapseOne"
                     aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body border-top p-0">
                    <div class="row mx-0 mt-3">
                      <div class="col-lg-3 text-gold">
                        <p class="mb-2">
                          <a class="ms-2 text-gold"
                             href="https://pancakeswap.finance/swap?outputCurrency=0x33b48893B8f119Fb45F431b36F830a9584804201">Get
                            COWS <i class="fas fa-external-link-alt"></i></a>
                        </p>
                        <!--                                  <p>Claim your vesting reward at Claim page after you harvest<a class="ms-2 text-gold" href="javascipt:void(0)"><i class="fas fa-external-link-alt"></i></a></p>-->
                      </div>
                      <div class="col-lg-5 text-gold">
                        <div class="countdown mt-3">
                          <ul class="px-0 d-flex justify-content-center">
                            <li class="border rounded pb-1 mx-2">
                              <span class="number" id="days"></span>Days
                            </li>
                            <li class="border rounded pb-1 mx-2"><span class="number" id="hours"></span>Hours
                            </li>
                            <li class="border rounded pb-1 mx-2"><span class="number" id="minutes"></span>Minutes
                            </li>
                            <li class="border rounded pb-1 mx-2"><span class="number" id="seconds"></span>Seconds
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-4 text-gold">
                        <div class="border p-3 rounded">
                          <div class="d-flex justify-content-between">
                            <p>COWS Locked</p>
                            <div class="countdown">
                              <span id="days1"></span>d <span id="hours1"></span>h : <span
                                id="minutes1"></span>m : <span id="seconds1"></span>s
                            </div>
                          </div>
                          <div class="row mx-0">
                            <div class="col-6 px-0">
                              <p class="mb-0">{{ stakingAmount }} COWS</p>
                              <p class="mb-0 text-secondary">{{
                                  token_price.cows * stakingAmount | money('$',true, 2)
                                }}</p>
                            </div>
                            <div class="col-6 px-0 text-end text-gold">
                              <button v-show="isStakingCOWS" class="text-gold p-0 bg-transparent me-2" type="button"
                                      data-bs-toggle="modal" data-bs-target="#unlock-modal">
                                <i class="far fa-minus-square fa-2x"></i></button>
                              <!--                              <button v-show="isApproveCOWS && !isStakingCOWS" class="text-gold p-0 bg-transparent"-->
                              <!--                                      type="button" data-bs-toggle="modal" data-bs-target="#stake-modal">-->
                              <!--                                <i class="far fa-plus-square fa-2x"></i>-->
                              <!--                              </button>-->
                              <div class="spinner-border" role="status" v-if="pendingApprove && !isApproveCOWS">
                                <span class="visually-hidden">Loading...</span>
                              </div>
                              <!--                              <button v-show="!isApproveCOWS" class="btn btn-play" @click.prevent="approveCOWS" v-else>-->
                              <!--                                Approve-->
                              <!--                              </button>-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        <div class="token my-4">-->
<!--          <div class="token-content p-3">-->
<!--            <div class="row mx-0">-->
<!--              <div class="col-6 col-lg-2 text-gold mb-3">-->
<!--                <p class="mb-0">Staking COWS</p>-->
<!--                <div class="d-flex align-items-end">-->
<!--                  <div class="icon-img px-1 d-flex align-items-end"><img class="w-100"-->
<!--                                                                         src="../../assets/images/cowcoin.png"></div>-->
<!--                  <span>COWS</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-4 text-gold text-lg-center mb-3">-->
<!--                <p class="mb-1">Information</p><span>Event Information</span>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <p class="mb-1">Total COWS Staking</p>-->
<!--                <p class="mb-0">{{ totalReleaseCOWS_2 | money('',false,0) }} COWS</p>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <div class="d-flex justify-content-lg-end">-->
<!--                  <div class="accordion-header">-->
<!--                    <button class="accordion-button collapsed p-0" type="button" data-bs-toggle="collapse"-->
<!--                            data-bs-target="#flush-collapseOne2"><span class="me-2">Detail</span></button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="accordion accordion-flush">-->
<!--              <div class="accordion-item bg-transparent">-->
<!--                <div class="accordion-collapse collapse show" id="flush-collapseOne2" aria-labelledby="flush-headingOne"-->
<!--                     data-bs-parent="#accordionFlushExample">-->
<!--                  <div class="accordion-body border-top p-0">-->
<!--                    <div class="row mx-0 mt-3">-->
<!--                      <div class="col-lg-3 text-gold">-->
<!--                        <p>-->
<!--                          <a @click.prevent="getListStaking" class="ms-2 text-gold" href="#">Top 10 <i-->
<!--                              class="fas fa-external-link-alt"></i></a>-->
<!--                        </p>-->

<!--                        <p>-->
<!--                          <router-link :to="{ name: 'Leaderboard' }" :class="['ms-2', 'text-gold']">Leaderboard <i-->
<!--                              class="fas fa-external-link-alt"></i></router-link>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                      <div class="col-lg-5 text-gold">-->
<!--                        <p id="#startStaking2" class="text-center text-uppercase">Start In</p>-->
<!--                        <div class="countdown mt-3">-->
<!--                          <ul class="px-0 d-flex justify-content-center">-->
<!--                            <li class="border rounded pb-1 mx-2"><span class="number" id="days2"></span>Days</li>-->
<!--                            <li class="border rounded pb-1 mx-2"><span class="number" id="hours2"></span>Hours</li>-->
<!--                            <li class="border rounded pb-1 mx-2"><span class="number" id="minutes2"></span>Minutes</li>-->
<!--                            <li class="border rounded pb-1 mx-2"><span class="number" id="seconds2"></span>Seconds</li>-->
<!--                          </ul>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div class="col-lg-4 text-gold">-->
<!--                        <div class="border p-3 rounded">-->
<!--                          <div class="d-flex justify-content-between">-->
<!--                            <p>COWS Locked</p>-->

<!--                            <div class="countdown"><span id="days3"></span>d <span id="hours3"></span>h : <span-->
<!--                                id="minutes3"></span>m : <span id="seconds3"></span>s-->
<!--                            </div>-->
<!--                          </div>-->
<!--                          <div class="row mx-0">-->
<!--                            <div class="col-6 px-0">-->
<!--                              <p class="mb-0">{{ totalReleaseCOWS_2 | money('',false,0) }} COWS</p>-->
<!--                              <p class="mb-0 text-secondary">{{-->
<!--                                  token_price.cows * totalReleaseCOWS_2 | money('$',true, 2)-->
<!--                                }}</p>-->
<!--                            </div>-->
<!--                            <div class="col-6 px-0 text-end text-gold">-->
<!--                              <button v-show="isApproveCOWS_2 && isReleaseCOWS_2"-->
<!--                                      class="text-gold p-0 bg-transparent me-2" type="button"-->
<!--                                      data-bs-toggle="modal" data-bs-target="#unlock-modal-2">-->
<!--                                <i class="far fa-minus-square fa-2x"></i></button>-->
<!--                              <button v-show="isApproveCOWS_2" class="text-gold p-0 bg-transparent"-->
<!--                                      type="button" data-bs-toggle="modal" data-bs-target="#stake-input-modal">-->
<!--                                <i class="far fa-plus-square fa-2x"></i>-->
<!--                              </button>-->
<!--                              <div class="spinner-border" role="status" v-if="pendingApprove && !isApproveCOWS_2">-->
<!--                                <span class="visually-hidden">Loading...</span>-->
<!--                              </div>-->
<!--                              <button v-show="!isApproveCOWS_2" class="btn btn-play" @click.prevent="approveCOWS_2"-->
<!--                                      v-else>-->
<!--                                Approve-->
<!--                              </button>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-show="staking_3.show" class="token my-4">-->
<!--          <div class="token-content p-3">-->
<!--            <div class="row mx-0">-->
<!--              <div class="col-6 col-lg-2 text-gold mb-3">-->
<!--                <p class="mb-0">Staking COWS</p>-->
<!--                <div class="d-flex align-items-end">-->
<!--                  <div class="icon-img px-1 d-flex align-items-end"><img class="w-100"-->
<!--                                                                         src="../../assets/images/cowcoin.png"></div>-->
<!--                  <span>COWS</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-4 text-gold text-lg-center mb-3">-->
<!--                <p class="mb-1">Information</p><span>Staking 2500</span>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <p class="mb-1">Total COWS Staking</p>-->
<!--                <p class="mb-0">{{ staking_3.stakingAmount | money('',false,0) }} COWS</p>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <div class="d-flex justify-content-lg-end">-->
<!--                  <div class="accordion-header">-->
<!--                    <button class="accordion-button collapsed p-0" type="button" data-bs-toggle="collapse"-->
<!--                            data-bs-target="#flush-collapseOne3"><span class="me-2">Detail</span></button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="accordion accordion-flush">-->
<!--              <div class="accordion-item bg-transparent">-->
<!--                <div class="accordion-collapse collapse show" id="flush-collapseOne3" aria-labelledby="flush-headingOne"-->
<!--                     data-bs-parent="#accordionFlushExample">-->
<!--                  <div class="accordion-body border-top p-0">-->
<!--                    <div class="row mx-0 mt-3">-->
<!--                      <div class="col-lg-3 text-gold">-->
<!--                        <p>-->
<!--                          <router-link :to="{ name: 'staking-3' }" :class="['ms-2', 'text-gold']">List staking <i-->
<!--                              class="fas fa-external-link-alt"></i></router-link>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                      <div class="col-lg-5 text-gold">-->
<!--                        <div class="row justify-content-center">Time Lock COWS</div>-->
<!--                        <div class="row justify-content-center">28 days</div>-->

<!--                      </div>-->
<!--                      <div class="col-lg-4 text-gold">-->
<!--                        <div class="border p-3 rounded">-->
<!--                          <div class="d-flex justify-content-between">-->
<!--                            <p>COWS Locked</p>-->

<!--                            <div class="countdown"><span id="days5"></span>d <span id="hours5"></span>h : <span-->
<!--                                id="minutes5"></span>m : <span id="seconds5"></span>s-->
<!--                            </div>-->
<!--                          </div>-->
<!--                          <div class="row mx-0">-->
<!--                            <div class="col-6 px-0">-->
<!--                              <p class="mb-0">{{ staking_3.totalReleaseCOWS | money('',false,0) }} COWS</p>-->
<!--                              <p class="mb-0 text-secondary">{{-->
<!--                                  token_price.cows * staking_3.totalReleaseCOWS | money('$',true, 2)-->
<!--                                }}</p>-->
<!--                            </div>-->
<!--                            <div class="col-6 px-0 text-end text-gold">-->
<!--                              <button @click.prevent="releaseCOWS_3"-->
<!--                                      v-show="staking_3.isApproveCOWS && staking_3.isReleaseCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent me-2" type="button">-->
<!--                                <i class="far fa-minus-square fa-2x"></i></button>-->
<!--                              <button @click.prevent="stakingCOWS_3" v-show="staking_3.isApproveCOWS && !staking_3.isStakingCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent"-->
<!--                                      type="button">-->
<!--                                <i class="far fa-plus-square fa-2x"></i>-->
<!--                              </button>-->
<!--                              <div class="spinner-border" role="status"-->
<!--                                   v-if="pendingApprove && !staking_3.isApproveCOWS">-->
<!--                                <span class="visually-hidden">Loading...</span>-->
<!--                              </div>-->
<!--                              <button v-show="!staking_3.isApproveCOWS" class="btn btn-play"-->
<!--                                      @click.prevent="approveCOWS_3" v-else>-->
<!--                                Approve-->
<!--                              </button>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-show="staking_4.show" class="token my-4">-->
<!--          <div class="token-content p-3">-->
<!--            <div class="row mx-0">-->
<!--              <div class="col-6 col-lg-2 text-gold mb-3">-->
<!--                <p class="mb-0">Staking COWS</p>-->
<!--                <div class="d-flex align-items-end">-->
<!--                  <div class="icon-img px-1 d-flex align-items-end"><img class="w-100"-->
<!--                                                                         src="../../assets/images/cowcoin.png"></div>-->
<!--                  <span>COWS</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-4 text-gold text-lg-center mb-3">-->
<!--                <p class="mb-1">Information</p><span>Staking 5000</span>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <p class="mb-1">Total COWS Staking</p>-->
<!--                <p class="mb-0">{{ staking_4.stakingAmount | money('',false,0) }} COWS</p>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <div class="d-flex justify-content-lg-end">-->
<!--                  <div class="accordion-header">-->
<!--                    <button class="accordion-button collapsed p-0" type="button" data-bs-toggle="collapse"-->
<!--                            data-bs-target="#flush-collapseOne4"><span class="me-2">Detail</span></button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="accordion accordion-flush">-->
<!--              <div class="accordion-item bg-transparent">-->
<!--                <div class="accordion-collapse collapse show" id="flush-collapseOne4" aria-labelledby="flush-headingOne"-->
<!--                     data-bs-parent="#accordionFlushExample">-->
<!--                  <div class="accordion-body border-top p-0">-->
<!--                    <div class="row mx-0 mt-3">-->
<!--                      <div class="col-lg-3 text-gold">-->

<!--                        <p>-->
<!--                          <router-link :to="{ name: 'staking-4' }" :class="['ms-2', 'text-gold']">List Staking <i-->
<!--                              class="fas fa-external-link-alt"></i></router-link>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                      <div class="col-lg-5 text-gold">-->
<!--                        <div class="row justify-content-center">Time Lock COWS</div>-->
<!--                        <div class="row justify-content-center">14 days</div>-->
<!--                      </div>-->
<!--                      <div class="col-lg-4 text-gold">-->
<!--                        <div class="border p-3 rounded">-->
<!--                          <div class="d-flex justify-content-between">-->
<!--                            <p>COWS Locked</p>-->

<!--                            <div class="countdown"><span id="days7"></span>d <span id="hours7"></span>h : <span-->
<!--                                id="minutes7"></span>m : <span id="seconds7"></span>s-->
<!--                            </div>-->
<!--                          </div>-->
<!--                          <div class="row mx-0">-->
<!--                            <div class="col-6 px-0">-->
<!--                              <p class="mb-0">{{ staking_4.totalReleaseCOWS | money('',false,0) }} COWS</p>-->
<!--                              <p class="mb-0 text-secondary">{{-->
<!--                                  token_price.cows * staking_4.totalReleaseCOWS | money('$',true, 2)-->
<!--                                }}</p>-->
<!--                            </div>-->
<!--                            <div class="col-6 px-0 text-end text-gold">-->
<!--                              <button @click.prevent="releaseCOWS_4"-->
<!--                                      v-show="staking_4.isApproveCOWS && staking_4.isReleaseCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent me-2" type="button"-->
<!--                              >-->
<!--                                <i class="far fa-minus-square fa-2x"></i></button>-->
<!--                              <button @click.prevent="stakingCOWS_4" v-show="staking_4.isApproveCOWS && !staking_4.isStakingCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent"-->
<!--                                      type="button">-->
<!--                                <i class="far fa-plus-square fa-2x"></i>-->
<!--                              </button>-->
<!--                              <div class="spinner-border" role="status"-->
<!--                                   v-if="pendingApprove && !staking_4.isApproveCOWS">-->
<!--                                <span class="visually-hidden">Loading...</span>-->
<!--                              </div>-->
<!--                              <button v-show="!staking_4.isApproveCOWS" class="btn btn-play"-->
<!--                                      @click.prevent="approveCOWS_4" v-else>-->
<!--                                Approve-->
<!--                              </button>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-show="staking_5.show" class="token my-4">-->
<!--          <div class="token-content p-3">-->
<!--            <div class="row mx-0">-->
<!--              <div class="col-6 col-lg-2 text-gold mb-3">-->
<!--                <p class="mb-0">Staking COWS</p>-->
<!--                <div class="d-flex align-items-end">-->
<!--                  <div class="icon-img px-1 d-flex align-items-end"><img class="w-100"-->
<!--                                                                         src="../../assets/images/cowcoin.png"></div>-->
<!--                  <span>COWS</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-4 text-gold text-lg-center mb-3">-->
<!--                <p class="mb-1">Information</p><span>Staking 10000</span>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <p class="mb-1">Total COWS Staking</p>-->
<!--                <p class="mb-0">{{ staking_5.stakingAmount | money('',false,0) }} COWS</p>-->
<!--              </div>-->
<!--              <div class="col-6 col-lg-3 text-gold text-lg-end mb-3">-->
<!--                <div class="d-flex justify-content-lg-end">-->
<!--                  <div class="accordion-header">-->
<!--                    <button class="accordion-button collapsed p-0" type="button" data-bs-toggle="collapse"-->
<!--                            data-bs-target="#flush-collapseOne5"><span class="me-2">Detail</span></button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="accordion accordion-flush">-->
<!--              <div class="accordion-item bg-transparent">-->
<!--                <div class="accordion-collapse collapse show" id="flush-collapseOne5" aria-labelledby="flush-headingOne"-->
<!--                     data-bs-parent="#accordionFlushExample">-->
<!--                  <div class="accordion-body border-top p-0">-->
<!--                    <div class="row mx-0 mt-3">-->
<!--                      <div class="col-lg-3 text-gold">-->
<!--                        <p>-->
<!--                          <router-link :to="{ name: 'staking-5' }" :class="['ms-2', 'text-gold']">List staking <i-->
<!--                              class="fas fa-external-link-alt"></i></router-link>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                      <div class="col-lg-5 text-gold">-->
<!--                        <div class="row justify-content-center">Time Lock COWS</div>-->
<!--                        <div class="row justify-content-center">7 days</div>-->
<!--                      </div>-->
<!--                      <div class="col-lg-4 text-gold">-->
<!--                        <div class="border p-3 rounded">-->
<!--                          <div class="d-flex justify-content-between">-->
<!--                            <p>COWS Locked</p>-->

<!--                            <div class="countdown"><span id="days9"></span>d <span id="hours9"></span>h : <span-->
<!--                                id="minutes9"></span>m : <span id="seconds9"></span>s-->
<!--                            </div>-->
<!--                          </div>-->
<!--                          <div class="row mx-0">-->
<!--                            <div class="col-6 px-0">-->
<!--                              <p class="mb-0">{{ staking_5.totalReleaseCOWS | money('',false,0) }} COWS</p>-->
<!--                              <p class="mb-0 text-secondary">{{-->
<!--                                  token_price.cows * staking_5.totalReleaseCOWS | money('$',true, 2)-->
<!--                                }}</p>-->
<!--                            </div>-->
<!--                            <div class="col-6 px-0 text-end text-gold">-->
<!--                              <button @click.prevent="releaseCOWS_5"-->
<!--                                      v-show="staking_5.isApproveCOWS && staking_5.isReleaseCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent me-2" type="button">-->
<!--                                <i class="far fa-minus-square fa-2x"></i></button>-->
<!--                              <button @click.prevent="stakingCOWS_5" v-show="staking_5.isApproveCOWS && !staking_5.isStakingCOWS"-->
<!--                                      class="text-gold p-0 bg-transparent"-->
<!--                                      type="button">-->
<!--                                <i class="far fa-plus-square fa-2x"></i>-->
<!--                              </button>-->
<!--                              <div class="spinner-border" role="status"-->
<!--                                   v-if="pendingApprove && !staking_5.isApproveCOWS">-->
<!--                                <span class="visually-hidden">Loading...</span>-->
<!--                              </div>-->
<!--                              <button v-show="!staking_5.isApproveCOWS" class="btn btn-play"-->
<!--                                      @click.prevent="approveCOWS_5" v-else>-->
<!--                                Approve-->
<!--                              </button>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import $ from 'jquery'
import {SC_STAKING, SC_STAKING_2, SC_STAKING_3, SC_STAKING_4, SC_STAKING_5} from "@/utils/config";
import {ethers} from "ethers";
import {mapState} from "vuex";
import ModalStep from "@/components/ModalStep";

export default {
  name: "Staking",
  computed: {
    ...mapState(['account', 'contract', 'token_price']),
  },
  components: {
    ModalStep
  },
  created() {
    let vm = this
    vm.checkMinimumStaking_3()
    vm.checkMinimumStaking_4()
    vm.checkMinimumStaking_5()
    vm.checkMinimumStaking_2()

    vm.checkRelease()
    vm.checkApproveCOWS()
    vm.checkStakingCOWS()
    vm.checkApproveCOWS_2()
    vm.checkStakingCOWS_2()

    vm.checkApproveCOWS_3()
    vm.checkStakingCOWS_3()

    vm.checkApproveCOWS_4()
    vm.checkStakingCOWS_4()

    vm.checkApproveCOWS_5()
    vm.checkStakingCOWS_5()
  },
  data() {
    return {
      isApproveCOWS: false,
      isApproveCOWS_2: false,
      isStakingCOWS: false,
      isStakingCOWS_2: false,
      isReleaseCOWS: false,
      isReleaseCOWS_2: false,
      balanceCOWS: 0,
      minApproveCOWS: '1000000000',
      stakingAmount: 500,
      totalReleaseCOWS: 0,
      stakingAmount_2: 1,
      pendingApprove: false,
      loopCheckApprove: null,
      minimumStakingCOWS: 0,
      totalReleaseCOWS_2: 0,
      staking_3: {
        show: true,
        stakingAmount: 2500,
        isStakingCOWS: false,
        isReleaseCOWS: false,
        totalReleaseCOWS: 0,
        isApproveCOWS: false,
        timestamp: 0,
        maxUser: 0,
      },
      staking_4: {
        show: true,
        stakingAmount: 5000,
        isStakingCOWS: false,
        isReleaseCOWS: false,
        totalReleaseCOWS: 0,
        isApproveCOWS: false,
        timestamp: 0,
        maxUser: 0,
      },
      staking_5: {
        show: true,
        stakingAmount: 10000,
        isStakingCOWS: false,
        isReleaseCOWS: false,
        totalReleaseCOWS: 0,
        isApproveCOWS: false,
        timestamp: 0,
        maxUser: 0,
      },
      step_detail: {
        step: 1,
        message: 'Please waiting for the process'
      },
      pending_step: 0,
      //staking list
      filters: {
        page: 1,
        type: 'STAKING_2',
        username: ''
      },
      list: {
        docs: [],
        total: 0
      },
      rank: 0
    }
  },
  methods: {
    async getBalanceCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amount = await contract.balanceOf(vm.account.detail.wallet_address)
          vm.balanceCOWS = ethers.utils.formatEther(amount)
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.amountApprove = false
        }
      }
    },

    //staking 1
    async approveCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.approve(SC_STAKING, ethers.utils.parseEther('100000000000000000'))
          await amountApprove.wait();
          vm.pendingApprove = true;

          vm.loopCheckApprove = setInterval(async () => {
            await vm.checkApproveCOWS();
            if (vm.isApproveCOWS) {
              clearInterval(vm.loopCheckApprove);
            }
          }, 3000)
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
    async checkApproveCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.allowance(vm.account.detail.wallet_address, SC_STAKING)
          if (amountApprove.gte(ethers.utils.parseEther('500'))) {
            vm.isApproveCOWS = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isApproveCOWS = false
        }
      }
    },
    async checkStakingCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          console.log('staking 1')
          let amountStaking = await vm.contract.SC_STAKING.buyerAmount(vm.account.detail.wallet_address.toString())
          // vm.totalReleaseCOWS = ethers.utils.formatEther(amountStaking).toString()
          if (amountStaking.gte(ethers.utils.parseEther('500'))) {
            vm.isStakingCOWS = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isStakingCOWS = false
        }
      }
    },
    async stakingCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountStaking = await contract.StakingCOWS()
          await amountStaking.wait();
          await vm.checkStakingCOWS();
          $('#stake-modal').modal('hide')
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
    async releaseCOWS() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING',
          signer: vm.account.wallet.signer,
        })
        try {
          await vm.checkRelease();
          if (!vm.isReleaseCOWS) {
            vm.error('Can not unlock now');
          } else {
            let amountStaking = await contract.releaseCOWS()
            await amountStaking.wait();
            vm.success('Unlock success');
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      }
    },
    async checkRelease() {
      let vm = this
      let currentDate = moment.utc().unix()
      let unstakingDate = moment('2022-02-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').unix()
      console.log(currentDate >= unstakingDate)
      if (currentDate >= unstakingDate) {
        vm.isReleaseCOWS = true
      }
    },

    // staking 2
    async approveCOWS_2() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.approve(SC_STAKING_2, ethers.utils.parseEther(vm.minApproveCOWS.toString()))
          vm.pendingApprove = true;
          await amountApprove.wait();
          await vm.checkApproveCOWS_2();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        vm.pendingApprove = false;
      } else {
        vm.error('Please connect wallet')
      }
    },
    async checkApproveCOWS_2() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          let amountApprove = await vm.contract.SC_TOKEN.allowance(vm.account.detail.wallet_address, SC_STAKING_2)
          // console.log(amountApprove.gte(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          // console.log(ethers.utils.formatEther(amountApprove))
          // console.log(ethers.utils.formatEther(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          if (amountApprove.gte(ethers.utils.parseEther(vm.stakingAmount_2.toString()))) {
            vm.isApproveCOWS_2 = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isApproveCOWS_2 = false
        }
      }
    },
    async checkStakingCOWS_2() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          console.log('staking 2')
          let amountStaking = await vm.contract.SC_STAKING_2.buyerAmount(vm.account.detail.wallet_address)
          if (amountStaking.gte(ethers.utils.parseEther('1'))) {
            vm.isStakingCOWS_2 = true
            vm.totalReleaseCOWS_2 = ethers.utils.formatEther(amountStaking)
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.isStakingCOWS_2 = false
        }
      }
    },
    async stakingCOWS_2() {
      let vm = this
      let modal = $('#modalStep');

      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_2',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountStaking = await contract.StakingCOWS(ethers.utils.parseEther(vm.stakingAmount_2.toString()))
          $('#stake-input-modal').modal('hide')
          modal.modal('show');
          await amountStaking.wait();
          await vm.$store.dispatch('staking/addStaking', {
            transaction_hash: amountStaking.hash,
          }).then((response) => {
            let {success} = response
            if (success) {
              vm.success('Staking success')
            }
          }).catch(e => {
            vm.error(e.message)
          })

          await vm.checkStakingCOWS_2();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        modal.modal('hide');
      } else {
        vm.error('Please connect wallet')
      }
    },
    async releaseCOWS_2() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_2',
          signer: vm.account.wallet.signer,
        })
        try {
          await vm.checkRelease();
          if (!vm.isReleaseCOWS_2) {
            vm.error('Can not unlock now');
          } else {
            let amountStaking = await contract.releaseCOWS()
            await amountStaking.wait();
            vm.success('Unlock success');
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      }
    },
    async checkRelease_2() {
      let vm = this
      vm.isReleaseCOWS_2 = await vm.contract.SC_STAKING_2.allowRelease()
      // let currentDate = moment.unix()
      // let unstakingDate = moment('2022-03-06 00:00:00', 'YYYY-MM-DD HH:mm:ss').unix()
      // if (currentDate >= unstakingDate) {
      //   vm.isReleaseCOWS_2 = await contract.allowRelease()
      // }
    },
    async checkMinimumStaking_2() {
      let vm = this
      vm.minimumStakingCOWS = ethers.utils.formatEther(await vm.contract.SC_STAKING_2.minimumStaking())

    },

    // staking 3
    async approveCOWS_3() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.approve(SC_STAKING_3, ethers.utils.parseEther(vm.minApproveCOWS.toString()))
          vm.pendingApprove = true;
          await amountApprove.wait();
          await vm.checkApproveCOWS_3();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        vm.pendingApprove = false;
      } else {
        vm.error('Please connect wallet')
      }
    },
    async checkApproveCOWS_3() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          let amountApprove = await vm.contract.SC_TOKEN.allowance(vm.account.detail.wallet_address, SC_STAKING_3)
          // console.log(amountApprove.gte(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          // console.log(ethers.utils.formatEther(amountApprove))
          // console.log(ethers.utils.formatEther(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          if (amountApprove.gte(ethers.utils.parseEther(vm.staking_3.stakingAmount.toString()))) {
            vm.staking_3.isApproveCOWS = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_3.isApproveCOWS = false
        }
      }
    },
    async checkStakingCOWS_3() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          console.log('staking 3')
          let amountStaking = await vm.contract.SC_STAKING_3.buyerAmount(vm.account.detail.wallet_address)
          if (amountStaking.gte(ethers.utils.parseEther('1'))) {
            vm.staking_3.isStakingCOWS = true
            vm.staking_3.totalReleaseCOWS = ethers.utils.formatEther(amountStaking)
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_3.isStakingCOWS_2 = false
        }
      }
    },
    async stakingCOWS_3() {
      let vm = this
      let modal = $('#modalStep');

      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_3',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountStaking = await contract.StakingCOWS()
          modal.modal('show');
          await amountStaking.wait();
          vm.success('Staking success')
          await vm.checkStakingCOWS_3();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        modal.modal('hide');
      } else {
        vm.error('Please connect wallet')
      }
    },
    async releaseCOWS_3() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_3',
          signer: vm.account.wallet.signer,
        })
        try {
          await vm.checkRelease();
          if (!vm.staking_3.isReleaseCOWS) {
            vm.error('Can not unlock now');
          } else {
            let amountStaking = await contract.releaseCOWS()
            await amountStaking.wait();
            vm.success('Unlock success');
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      }
    },
    async checkRelease_3() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let unstakingDate = await vm.contract.SC_STAKING_3.timeRelease(vm.account.detail.wallet_address)
        vm.staking_3.timestamp = unstakingDate.toString()
        let currentDate = moment.utc().unix()
        if (currentDate > unstakingDate && vm.staking_3.timestamp != 0) {
          vm.staking_3.isReleaseCOWS = true
        }
      }
    },
    async checkMinimumStaking_3() {
      let vm = this
      vm.staking_3.stakingAmount = ethers.utils.formatEther(await vm.contract.SC_STAKING_3.amountPack())
      vm.staking_3.maxUser = ethers.utils.formatEther(await vm.contract.SC_STAKING_3.maxUser())


    },

    // staking 4
    async approveCOWS_4() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.approve(SC_STAKING_4, ethers.utils.parseEther(vm.minApproveCOWS.toString()))
          vm.pendingApprove = true;
          await amountApprove.wait();
          await vm.checkApproveCOWS_4();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        vm.pendingApprove = false;
      } else {
        vm.error('Please connect wallet')
      }
    },
    async checkApproveCOWS_4() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          let amountApprove = await vm.contract.SC_TOKEN.allowance(vm.account.detail.wallet_address, SC_STAKING_4)
          // console.log(amountApprove.gte(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          // console.log(ethers.utils.formatEther(amountApprove))
          // console.log(ethers.utils.formatEther(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          if (amountApprove.gte(ethers.utils.parseEther(vm.staking_4.stakingAmount.toString()))) {
            vm.staking_4.isApproveCOWS = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_4.isApproveCOWS = false
        }
      }
    },
    async checkStakingCOWS_4() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          console.log('staking 4')
          let amountStaking = await vm.contract.SC_STAKING_4.buyerAmount(vm.account.detail.wallet_address)
          if (amountStaking.gte(ethers.utils.parseEther('1'))) {
            vm.staking_4.isStakingCOWS = true
            vm.staking_4.totalReleaseCOWS = ethers.utils.formatEther(amountStaking)
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_4.isStakingCOWS = false
        }
      }
    },
    async stakingCOWS_4() {
      let vm = this
      let modal = $('#modalStep');

      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_4',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountStaking = await contract.StakingCOWS()
          $('#stake-input-modal').modal('hide')
          modal.modal('show');
          await amountStaking.wait();
          vm.success('Staking success')
          await vm.checkStakingCOWS_3();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        modal.modal('hide');
      } else {
        vm.error('Please connect wallet')
      }
    },
    async releaseCOWS_4() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_4',
          signer: vm.account.wallet.signer,
        })
        try {
          await vm.checkRelease();
          if (!vm.staking_4.isReleaseCOWS) {
            vm.error('Can not unlock now');
          } else {
            let amountStaking = await contract.releaseCOWS()
            await amountStaking.wait();
            vm.success('Unlock success');
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      }
    },
    async checkRelease_4() {
      let vm = this
      if (vm.account.detail.wallet_address) {

        let unstakingDate = await vm.contract.SC_STAKING_4.timeRelease(vm.account.detail.wallet_address.toString())
        vm.staking_4.timestamp = unstakingDate.toString()
        let currentDate = moment.utc().unix()
        if (currentDate > unstakingDate && vm.staking_4.timestamp != 0) {
          vm.staking_4.isReleaseCOWS = true
        }
      }
    },
    async checkMinimumStaking_4() {
      let vm = this
      vm.staking_4.stakingAmount = ethers.utils.formatEther(await vm.contract.SC_STAKING_4.amountPack())
      vm.staking_4.maxUser = ethers.utils.formatEther(await vm.contract.SC_STAKING_4.maxUser())

    },

    // staking 5
    async approveCOWS_5() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_TOKEN',
          signer: vm.account.wallet.signer,
        })
        try {
          let amountApprove = await contract.approve(SC_STAKING_5, ethers.utils.parseEther(vm.minApproveCOWS.toString()))
          vm.pendingApprove = true;
          await amountApprove.wait();
          await vm.checkApproveCOWS_5();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        vm.pendingApprove = false;
      } else {
        vm.error('Please connect wallet')
      }
    },
    async checkApproveCOWS_5() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          let amountApprove = await vm.contract.SC_TOKEN.allowance(vm.account.detail.wallet_address, SC_STAKING_5)
          // console.log(amountApprove.gte(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          // console.log(ethers.utils.formatEther(amountApprove))
          // console.log(ethers.utils.formatEther(ethers.utils.parseEther(vm.minApproveCOWS.toString())))
          if (amountApprove.gte(ethers.utils.parseEther(vm.staking_5.stakingAmount.toString()))) {
            vm.staking_5.isApproveCOWS = true
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_5.isApproveCOWS = false
        }
      }
    },
    async checkStakingCOWS_5() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        try {
          console.log('staking 5')
          let amountStaking = await vm.contract.SC_STAKING_5.buyerAmount(vm.account.detail.wallet_address)
          if (amountStaking.gte(ethers.utils.parseEther('1'))) {
            vm.staking_5.isStakingCOWS = true
            vm.staking_5.totalReleaseCOWS = ethers.utils.formatEther(amountStaking)
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
          vm.staking_5.isStakingCOWS = false
        }
      }
    },
    async stakingCOWS_5() {
      let vm = this
      let modal = $('#modalStep');

      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_5',
          signer: vm.account.wallet.signer,
        })
        try {
          console.log(vm.staking_5.stakingAmount)
          let amountStaking = await contract.StakingCOWS()
          $('#stake-input-modal').modal('hide')
          modal.modal('show');
          await amountStaking.wait();
          vm.success('Staking success')
          await vm.checkStakingCOWS_3();
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
        modal.modal('hide');
      } else {
        vm.error('Please connect wallet')
      }
    },
    async releaseCOWS_5() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        let contract = await vm.$store.dispatch('contract/getContract', {
          contract_name: 'SC_STAKING_5',
          signer: vm.account.wallet.signer,
        })
        try {
          await vm.checkRelease();
          if (!vm.staking_5.isReleaseCOWS) {
            vm.error('Can not unlock now');
          } else {
            let amountStaking = await contract.releaseCOWS()
            await amountStaking.wait();
            vm.success('Unlock success');
          }
        } catch (e) {
          if (e.data) {
            vm.error(e.data.message)
          } else {
            vm.error(e.message)
          }
        }
      }
    },
    async checkRelease_5() {
      let vm = this
      if (vm.account.detail.wallet_address) {

        let unstakingDate = await vm.contract.SC_STAKING_5.timeRelease(vm.account.detail.wallet_address.toString())
        vm.staking_5.timestamp = unstakingDate.toString()
        let currentDate = moment.utc().unix()
        if (currentDate > unstakingDate && vm.staking_5.timestamp != 0) {
          vm.staking_5.isReleaseCOWS = true
        }
      }
    },
    async checkMinimumStaking_5() {
      let vm = this
      vm.staking_5.stakingAmount = ethers.utils.formatEther(await vm.contract.SC_STAKING_5.amountPack())
      vm.staking_5.maxUser = ethers.utils.formatEther(await vm.contract.SC_STAKING_5.maxUser())

    },

    async getListStaking() {
      let vm = this
      if (vm.account.detail.wallet_address) {
        await vm.$store.dispatch('staking/listStaking', {filters: vm.filters}).then((response) => {
          let {data, success} = response
          if (success) {
            vm.list = data;
            // console.log(vm.list.docs)
            if (vm.list.docs[10]) {
              vm.list.docs = vm.list.docs.splice(10);
            }
            // console.log(vm.list.docs)
            $('#top-10').modal('show')
          }
          vm.$forceUpdate()
        }).catch(e => {
          vm.error(e.message)
        })
      }
    },

    splitAddress(address) {
      if (address === null || address.length === 0) {
        return 'CONNECT';
      }
      let strTemp = '';
      return strTemp.concat(address.slice(0, 4), '...', address.slice(-5));
    },

  },
  watch: {
    async 'account.detail.wallet_address'() {
      let vm = this;

      vm.checkApproveCOWS()
      vm.checkStakingCOWS()
      vm.getBalanceCOWS()

      vm.checkApproveCOWS_2()
      vm.checkStakingCOWS_2()

      vm.checkApproveCOWS_3()
      vm.checkStakingCOWS_3()

      vm.checkApproveCOWS_4()
      vm.checkStakingCOWS_4()

      vm.checkApproveCOWS_5()
      vm.checkStakingCOWS_5()
      vm.checkRelease_2()

      await vm.checkRelease_3()
      await vm.checkRelease_4()
      await vm.checkRelease_5()
      await vm.$nextTick(async () => {

        let interval = 1000;
        let currentTime = moment.utc().unix();

        let eventTime = moment('2022-01-17 23:59:00', 'YYYY-MM-DD HH:mm:ss').unix();
        let diffTime = eventTime - currentTime;
        let duration = moment.duration(diffTime * 1000, 'milliseconds');

        let eventTime1 = moment('2022-02-01 23:59:00', 'YYYY-MM-DD HH:mm:ss').unix();
        let diffTime1 = eventTime1 - currentTime;
        let duration1 = moment.duration(diffTime1 * 1000, 'milliseconds');

        let eventTime2 = moment('2022-02-24 23:59:00', 'YYYY-MM-DD HH:mm:ss').unix();
        let endEventTime2 = moment('2022-03-06 23:59:00', 'YYYY-MM-DD HH:mm:ss').unix();
        let diffTime2 = eventTime2 - currentTime;
        let duration2 = moment.duration(diffTime2 * 1000, 'milliseconds');
        let diffTime2b = endEventTime2 - currentTime;
        let duration2b = moment.duration(diffTime2b * 1000, 'milliseconds');

        let eventTime3 = moment('2022-03-22 23:59:00', 'YYYY-MM-DD HH:mm:ss').unix();
        let diffTime3 = eventTime3 - currentTime;
        let duration3 = moment.duration(diffTime3 * 1000, 'milliseconds');

        let eventTime4 = Number(vm.staking_3.timestamp)
        let diffTime4 = eventTime4 - currentTime;
        let duration4 = moment.duration(diffTime4 * 1000, 'milliseconds');

        let eventTime5 = Number(vm.staking_4.timestamp)
        let diffTime5 = eventTime5 - currentTime;
        let duration5 = moment.duration(diffTime5 * 1000, 'milliseconds');

        let eventTime6 = Number(vm.staking_5.timestamp)
        let diffTime6 = eventTime6 - currentTime;
        let duration6 = moment.duration(diffTime6 * 1000, 'milliseconds');
        setInterval(function () {
          if (currentTime >= eventTime) {
            $('#days').text('0')
            $('#hours').text('0')
            $('#minutes').text('0')
            $('#seconds').text('0')
          } else {
            duration = moment.duration(duration - interval, 'milliseconds');
            $('#days').text(duration.days())
            $('#hours').text(duration.hours())
            $('#minutes').text(duration.minutes())
            $('#seconds').text(duration.seconds())
          }
          if (currentTime >= eventTime1) {
            $('#days1').text('0')
            $('#hours1').text('0')
            $('#minutes1').text('0')
            $('#seconds1').text('0')
          } else {
            duration1 = moment.duration(duration1 - interval, 'milliseconds');
            $('#days1').text(duration1.days())
            $('#hours1').text(duration1.hours())
            $('#minutes1').text(duration1.minutes())
            $('#seconds1').text(duration1.seconds())
          }
          if (currentTime >= endEventTime2) {
            $('#days2').text('0')
            $('#hours2').text('0')
            $('#minutes2').text('0')
            $('#seconds2').text('0')
          } else if (currentTime >= eventTime2 && currentTime < endEventTime2) {
            $('#startStaking2').text('END IN')
            duration2b = moment.duration(duration2b - interval, 'milliseconds');
            $('#days2').text(duration2b.days())
            $('#hours2').text(duration2b.hours())
            $('#minutes2').text(duration2b.minutes())
            $('#seconds2').text(duration2b.seconds())
          } else {
            duration2 = moment.duration(duration2 - interval, 'milliseconds');
            $('#days2').text(duration2.days())
            $('#hours2').text(duration2.hours())
            $('#minutes2').text(duration2.minutes())
            $('#seconds2').text(duration2.seconds())
          }
          if (currentTime >= eventTime3) {
            $('#days3').text('0')
            $('#hours3').text('0')
            $('#minutes3').text('0')
            $('#seconds3').text('0')
          } else {
            duration3 = moment.duration(duration3 - interval, 'milliseconds');
            $('#days3').text(duration3.days())
            $('#hours3').text(duration3.hours())
            $('#minutes3').text(duration3.minutes())
            $('#seconds3').text(duration3.seconds())
          }
          if (currentTime > eventTime4) {
            $('#days5').text('0')
            $('#hours5').text('0')
            $('#minutes5').text('0')
            $('#seconds5').text('0')
          } else {
            duration4 = moment.duration(duration4 - interval, 'milliseconds');
            $('#days5').text(duration4.days())
            $('#hours5').text(duration4.hours())
            $('#minutes5').text(duration4.minutes())
            $('#seconds5').text(duration4.seconds())
          }
          if (currentTime > eventTime5) {
            $('#days7').text('0')
            $('#hours7').text('0')
            $('#minutes7').text('0')
            $('#seconds7').text('0')
          } else {
            duration5 = moment.duration(duration5 - interval, 'milliseconds');
            $('#days7').text(duration5.days())
            $('#hours7').text(duration5.hours())
            $('#minutes7').text(duration5.minutes())
            $('#seconds7').text(duration5.seconds())
          }
          if (currentTime > eventTime6) {
            $('#days9').text('0')
            $('#hours9').text('0')
            $('#minutes9').text('0')
            $('#seconds9').text('0')
          } else {
            duration6 = moment.duration(duration6 - interval, 'milliseconds');
            $('#days9').text(duration6.days())
            $('#hours9').text(duration6.hours())
            $('#minutes9').text(duration6.minutes())
            $('#seconds9').text(duration6.seconds())
          }
        }, interval);
      })
    }
  }
}
</script>

<style scoped>
.btn-play {
  color: #936423;
  text-transform: uppercase;
  border-radius: 10px;
  background: url(../../assets/images/btnmenu.png) no-repeat center center;
  background-size: 100% 100%;
}
</style>
