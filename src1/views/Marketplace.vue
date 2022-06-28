<template>
    <section>
        <div class="row mx-0">
            <LeftTab></LeftTab>
            <div class="col-lg-9 ps-xxl-0">
                <div class="right-tab mt-3">
                    <div class="my-wallet">
                        <div class="mywallet-menu d-md-flex justify-content-md-between">
                            <MarketMenu></MarketMenu>
                        </div>
                        <div class="mywallet-content">
                            <div class="rate-filter">
                                <div class="row mx-0">
                                    <div class="col-md-9">
                                        <ul class="nav">
                                            <li class="nav-item"><a class="nav-link active" aria-current="page" href="javascript:void(0)">
                                                <div class="btn box-text me-1">N</div>
                                                <div class="box-check"><img class="icon-check" src="../assets/images/icon-check.png"></div></a></li>
                                            <li class="nav-item"><a class="nav-link" aria-current="page" href="javascript:void(0)">
                                                <div class="btn box-text me-1">R</div>
                                                <div class="box-check"><img class="icon-check" src="../assets/images/icon-check.png"></div></a></li>
                                            <li class="nav-item"><a class="nav-link" aria-current="page" href="javascript:void(0)">
                                                <div class="btn box-text me-1">sr</div>
                                                <div class="box-check"><img class="icon-check" src="../assets/images/icon-check.png"></div></a></li>
                                            <li class="nav-item"><a class="nav-link" aria-current="page" href="javascript:void(0)">
                                                <div class="btn box-text me-1">ssr</div>
                                                <div class="box-check"><img class="icon-check" src="../assets/images/icon-check.png"></div></a></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-3 d-lg-flex align-items-center justify-content-end">
                                        <div class="d-lg-grid">
                                            <select class="form-select select-point" aria-label="Default select example">
                                                <option selected="">Lowest price</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mx-0">
                                <div class="col-md-6 col-lg-3 mb-3">
                                    <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
                                        <div class="content-box-top"><img class="w-100" src="../assets/images/box-n.png">
                                            <div class="content-box-top-snake text-center"><img class="snake-img" src="../assets/images/naga-n.png"></div>
                                            <div class="content-box-top-name">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div class="text-radiant text-uppercase text-center">NAGA</div>
                                                    <div class="position-relative ms-2 snake-id"><img class="w-100" src="../assets/images/id-egg.png">
                                                        <div class="position-absolute top-50 start-50 translate-middle">#97920</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../assets/images/cowcoin.png">
                                                    <div class="text-radiant text-uppercase text-center snake-price">100COWS</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-box-bottom px-3 mt-auto">
                                            <div class="row mx-0 my-2">
                                                <div class="col-8 px-1 mx-auto">
                                                    <div class="d-grid hvr-bounce-in"><a class="btn btn-transfer" href="snake-detail.html">
                                                        <div class="text-radiant text-uppercase">buy now</div></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 mb-3">
                                    <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
                                        <div class="content-box-top"><img class="w-100" src="../assets/images/box-r.png">
                                            <div class="content-box-top-snake text-center"><img class="snake-img" src="../assets/images/hydra-r.png"></div>
                                            <div class="content-box-top-name">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div class="text-radiant text-uppercase text-center">HYDRA</div>
                                                    <div class="position-relative ms-2 snake-id"><img class="w-100" src="../assets/images/id-egg.png">
                                                        <div class="position-absolute top-50 start-50 translate-middle">#97920</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../assets/images/cowcoin.png">
                                                    <div class="text-radiant text-uppercase text-center snake-price">100COWS</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-box-bottom px-3 mt-auto">
                                            <div class="row mx-0 my-2">
                                                <div class="col-8 px-1 mx-auto">
                                                    <div class="d-grid hvr-bounce-in"><a class="btn btn-transfer" href="snake-detail.html">
                                                        <div class="text-radiant text-uppercase">buy now</div></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 mb-3">
                                    <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
                                        <div class="content-box-top"><img class="w-100" src="../assets/images/box-sr.png">
                                            <div class="content-box-top-snake text-center"><img class="snake-img" src="../assets/images/lord-sr.png"></div>
                                            <div class="content-box-top-name">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div class="text-radiant text-uppercase text-center">LORD</div>
                                                    <div class="position-relative ms-2 snake-id"><img class="w-100" src="../assets/images/id-egg.png">
                                                        <div class="position-absolute top-50 start-50 translate-middle">#97920</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../assets/images/cowcoin.png">
                                                    <div class="text-radiant text-uppercase text-center snake-price">100COWS</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-box-bottom px-3 mt-auto">
                                            <div class="row mx-0 my-2">
                                                <div class="col-8 px-1 mx-auto">
                                                    <div class="d-grid hvr-bounce-in"><a class="btn btn-transfer" href="snake-detail.html">
                                                        <div class="text-radiant text-uppercase">buy now</div></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 mb-3">
                                    <div class="walltet-content-box py-4 d-flex align-items-start flex-column">
                                        <div class="content-box-top"><img class="w-100" src="../assets/images/box-ssr.png">
                                            <div class="content-box-top-snake text-center"><img class="snake-img snake-ssr" src="../assets/images/sheron-ssr.png"></div>
                                            <div class="content-box-top-name">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div class="text-radiant text-uppercase text-center">SHERON</div>
                                                    <div class="position-relative ms-2 snake-id"><img class="w-100" src="../assets/images/id-egg.png">
                                                        <div class="position-absolute top-50 start-50 translate-middle">#97920</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center mt-1"><img class="snake-icon me-2" src="../assets/images/cowcoin.png">
                                                    <div class="text-radiant text-uppercase text-center snake-price">100COWS</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-box-bottom px-3 mt-auto">
                                            <div class="row mx-0 my-2">
                                                <div class="col-8 px-1 mx-auto">
                                                    <div class="d-grid hvr-bounce-in"><a class="btn btn-transfer" href="snake-detail.html">
                                                        <div class="text-radiant text-uppercase">buy now</div></a></div>
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
import MarketMenu from "@/components/MarketMenu";
export default {
    name: 'Marketplace',
    components: {
        MarketMenu,
        LeftTab
    }
}
</script>
