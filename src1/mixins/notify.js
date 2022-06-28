import Vue from 'vue'
import * as toastr from 'toastr'

Vue.mixin({
    created: function () {
        toastr.options.progressBar = false;
        toastr.options.closeButton = true;
        toastr.options.escapeHtml = true;
        toastr.options.timeOut = 5000;
        toastr.options.closeDuration = 5000;
    },
    methods: {
        info(message) {
            toastr.info(message)
        },
        warning(message) {
            toastr.warning(message)
        },
        success(message) {
            toastr.success(message)
        },
        error(message) {
            toastr.error(message)
        },
    }
})
