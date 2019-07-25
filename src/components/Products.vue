<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 建立新產品 -->
    <CreateProduct
      :tempProduct="tempProduct"
      :status="status"
      @openModal="openModal"
      @updateProduct="updateProduct"
      @uploadFile="uploadFile"
    ></CreateProduct>
    <!-- 列表表頭 -->
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="80">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price|currency}}</td>
          <td class="text-right">{{item.price|currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <DeleteProduct
              :tempProduct="tempProduct"
              :item="item"
              @openDelModal="openDelModal"
              @updateProduct="updateProduct"
            ></DeleteProduct>
            <EditProduct :item="item" @openModal="openModal"></EditProduct>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁列表 -->
    <Pagination
      :pageData="pagination"
      @setPage="getProducts"
      class="d-flex justify-content-center"
    />
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "./Pagination";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default {
  components: {
    Pagination,
    CreateProduct,
    DeleteProduct,
    EditProduct
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isDel: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true; //更新項目時啟用loading效果
      this.$http.get(api).then(response => {
        //取得API後端的產品列表，回傳response Object
        console.log(response.data);
        vm.isLoading = false; //更新完關閉loading效果
        vm.products = response.data.products; //將回傳產品的項目放入products[]
        vm.pagination = response.data.pagination;
      });
      console.log("抓取成功");
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show"); //打開新增產品的介面
    },
    openDelModal(item) {
      this.isDel = true;
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show"); //打開新增產品的介面
      console.log(this.isDel);
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      let modalName = "#productModal";

      if (vm.isDel) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "delete";
        modalName = "#delProductModal";
        vm.isDel = false;
      } else if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        //將新增的產品物件上傳到後端
        console.log(response.data);
        if (response.data.success) {
          //如果上傳成功
          $(modalName).modal("hide"); //關閉新增產品視窗
          vm.getProducts(); //重新取得刷新產品列表
        } else {
          $(modalName).modal("hide"); //關閉新增產品視窗
          console.log("新增失敗");
        }
      });
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new window.FormData();
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;

      formData.append("file-to-upload", uploadedFile);
      vm.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    //使用created function確保getProducts執行
    this.getProducts();
  }
};
</script>