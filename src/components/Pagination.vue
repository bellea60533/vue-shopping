<template>
  <div>
    <!-- 如果第一頁就把上一頁隱藏，最後一頁就把下一頁隱藏 -->
    <!-- 將傳進來的pagination傳給pageData後用v-for印出，記住要綁定key -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !pageData.has_pre}">
          <!-- 上一頁 -->
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="setPage(pageData.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 數字分頁 -->
        <li
          class="page-item"
          v-for="page in pageData.total_pages"
          :pageData="page"
          :key="page"
          :class="{active: pageData.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="setPage(page)">{{page}}</a>
        </li>
        <!-- 下一頁 -->
        <li class="page-item" :class="{disabled: !pageData.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="setPage(pageData.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props:{
        pageData: {}
    },
    methods:{
        setPage(page){
            this.$emit("setPage",page);
        }
    }
};
</script>

