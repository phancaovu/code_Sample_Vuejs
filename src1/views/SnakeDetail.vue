<template>
    <section>
        <div class="row mx-0">
            <LeftTab></LeftTab>
            <div class="col-lg-9">
                <div class="right-tab">
                    <div class="row mx-0 mt-3">
                        <div class="col-lg-10">
                            <div class="row mx-0">
                                <div class="col-lg-4 offset-lg-1">
                                    <div class="my-wallet">
                                        <div class="mywallet-content">
                                            <div class="walltet-content-box p-4 d-flex align-items-start flex-column">
                                                <div class="content-box-top"><img class="w-100" src="../assets/images/box-n.png">
                                                    <div class="content-box-top-snake text-center"><img class="snake-img" src="../assets/images/naga-n.png"></div>
                                                </div>
                                                <div class="content-box-bottom px-3 mt-auto">
                                                    <div class="row mx-0 my-2">
                                                        <div class="col-lg-3 text-center px-0 col-3"><img src="../assets/images/heart.png">
                                                            <p class="health-color mb-2">HEALTH</p>
                                                        </div>
                                                        <div class="col-lg-9 col-8">
                                                            <div class="progress health mt-1">
                                                                <div class="progress-bar health-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <p class="health-color text-center my-2">00:00:00:00</p>
                                                        </div>
                                                    </div>
                                                    <div class="row mx-0 my-2">
                                                        <div class="col-3 text-center"><img class="img-info mb-2" src="../assets/images/vision.png">
                                                            <p class="mb-2">1.3</p>
                                                        </div>
                                                        <div class="col-3 text-center"><img class="img-info mb-2" src="../assets/images/length.png">
                                                            <p class="mb-2">1.3</p>
                                                        </div>
                                                        <div class="col-3 text-center"><img class="img-info mb-2" src="../assets/images/speed.png">
                                                            <p class="mb-2">1.3</p>
                                                        </div>
                                                        <div class="col-3 text-center"><img class="img-info px-1 mb-2" src="../assets/images/crook.png">
                                                            <p class="mb-2">1.3</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 px-lg-0">
                                    <div class="event-info">
                                        <div class="row mx-0">
                                            <div class="col-xxl-10 offset-xxl-1">
                                                <div class="d-md-flex align-items-center justify-content-center justify-content-lg-start">
                                                    <h3 class="text-radiant text-uppercase text-center">NAGA</h3>
                                                    <div class="eg-id px-3 py-2 position-relative text-center"><img src="../assets/images/id-egg.png">
                                                        <div class="position-absolute top-50 start-50 translate-middle">#872980</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="line-divide my-2"></div>
                                        <div class="row mx-0">
                                            <div class="col-xxl-10 offset-xxl-1 d-flex px-0"><img class="icon-img mx-2" src="../assets/images/cowboy.png">
                                                <div class="text-warning text-uppercase d-flex align-items-center"><span>cowboy snake</span></div>
                                            </div>
                                        </div>
                                        <div class="line-divide my-2"></div>
                                        <div class="row mx-0">
                                            <div class="col-xxl-10 offset-xxl-1">
                                                <div class="row mx-0">
                                                    <div class="col-6 ps-lg-0">
                                                        <p class="text-warning">PRICE
                                                        <div class="d-flex align-items-center mb-3"><img class="icon-img mx-2" src="../assets/images/cowcoin.png">
                                                            <div class="eg-id">100 COWS</div>
                                                        </div>
                                                        </p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="text-warning">Count
                                                        <div class="d-flex align-items-center mb-3">
                                                            <div class="input-amount">
                                                                <div class="input-group">
                                                                    <div class="input-group-text">
                                                                        <div class="eg-id btn-amount py-2 px-3">1</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="line-divide my-2"></div>
                                        <div class="row mx-0">
                                            <div class="col-xxl-10 offset-xxl-1">
                                                <p class="text-uppercase">Total price<span class="text-warning ms-4">100,000 COWS</span></p>
                                                <div class="row mx-0 mb-3">
                                                    <div class="col-md-5 px-lg-0">
                                                        <div class="d-grid">
                                                            <button class="btn btn-wallet py-3" type="button">
                                                                <div class="text-radiant fs-5 fw-bold">BUY</div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mx-0 mb-3">
                                                    <div class="dropdown px-0 detail-box">
                                                        <button class="btn dropdown-toggle w-100 text-start text-warning btn-detail" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars me-2"></i>Details</button>
                                                        <ul class="dropdown-menu w-100">
                                                            <li><a class="dropdown-item" href="javascript:void(0)">
                                                                <div class="row mx-0">
                                                                    <div class="col-5 px-lg-0">Contract Address</div>
                                                                    <div class="col-7 px-lg-0">
                                                                        <div class="detail-input px-2 py-1 text-end">012345678910</div>
                                                                    </div>
                                                                </div></a></li>
                                                            <li><a class="dropdown-item" href="javascript:void(0)">
                                                                <div class="row mx-0">
                                                                    <div class="col-5 px-lg-0">Token ID</div>
                                                                    <div class="col-7 px-lg-0">
                                                                        <div class="detail-input px-2 py-1 text-end">012345678910</div>
                                                                    </div>
                                                                </div></a></li>
                                                            <li><a class="dropdown-item" href="javascript:void(0)">
                                                                <div class="row mx-0">
                                                                    <div class="col-5 px-lg-0">Token Standard</div>
                                                                    <div class="col-7 px-lg-0">
                                                                        <div class="detail-input px-2 py-1 text-end">012345678910</div>
                                                                    </div>
                                                                </div></a></li>
                                                            <li><a class="dropdown-item" href="javascript:void(0)">
                                                                <div class="row mx-0">
                                                                    <div class="col-5 px-lg-0">Blockchain</div>
                                                                    <div class="col-7 px-lg-0">
                                                                        <div class="detail-input px-2 py-1 text-end">Binance Smart Chain</div>
                                                                    </div>
                                                                </div></a></li>
                                                        </ul>
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
        </div>
    </section>
</template>

<script>
import LeftTab from "@/components/LeftTab";
export default {
    name: 'SnakeDetail',
    components: {
        LeftTab
    }
}
</script>
