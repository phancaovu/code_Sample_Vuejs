<template>
  <div style="text-align: center; margin: 5px;">
    <button
      type="button"
      class="btn btnRedirect"
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
    >
      ←
    </button>
    Page
    <input type="text" style="width: 45px" v-model="inputPage" @keyup.enter="onEnterPage" />

    of {{ totalPages }}

    <button
      type="button"
      class="btn btnRedirect"
      @click="onClickNextPage"
      :disabled="isInLastPage"
    >
      →
    </button>
  </div>
<!--  <ul>-->
    <!--    <li>-->
    <!--      <button-->
    <!--        type="button"-->
    <!--        @click="onClickFirstPage"-->
    <!--        :disabled="isInFirstPage"-->
    <!--      >-->
    <!--        First-->
    <!--      </button>-->
    <!--    </li>-->

<!--    <li>-->

<!--    </li>-->

    <!-- Visible Buttons Start -->

<!--    <li-->
<!--      v-for="page in pages"-->
<!--      :key="page.name"-->
<!--    >-->
<!--      <button-->
<!--        type="button"-->
<!--        @click="onClickPage(page.name)"-->
<!--        :disabled="page.isDisabled"-->
<!--      >-->
<!--        {{ page.name }}-->
<!--      </button>-->
<!--    </li>-->

    <!-- Visible Buttons End -->

<!--    <li>-->

<!--    </li>-->

    <!--    <li>-->
    <!--      <button-->
    <!--        type="button"-->
    <!--        @click="onClickLastPage"-->
    <!--        :disabled="isInLastPage"-->
    <!--      >-->
    <!--        Last-->
    <!--      </button>-->
    <!--    </li>-->
<!--  </ul>-->
</template>

<script>
export default {
  name: "Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      inputPage: 1
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      if (this.currentPage === 1) {
        this.inputPage = 1
      }
      return this.currentPage === 1;
    },
    isInLastPage() {
      if (this.currentPage === this.totalPages) {
        this.inputPage = this.totalPages
      }
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.inputPage = this.currentPage - 1
      this.$emit('pagechanged', this.inputPage);
    },
    onClickNextPage() {
      this.inputPage = this.currentPage + 1
      this.$emit('pagechanged', this.inputPage);
    },
    onEnterPage() {
      this.inputPage = this.inputPage.trim()
      if (isNaN(parseInt(this.inputPage)) || parseInt(this.inputPage) < 1) {
        this.inputPage = 1
      }
      if (parseInt(this.inputPage) > this.totalPages) {
        this.inputPage = this.totalPages
      }
      this.inputPage = parseInt(this.inputPage)
      this.$emit('pagechanged', this.inputPage);
    }
  }
}
</script>

<style scoped>
.btnRedirect {
  color: #fff9ae;
  border: 1px solid #fff9ae;
  border-radius: 0;
}
</style>
