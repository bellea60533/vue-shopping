<template>
  <div style="float:right">
    <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {}
  },
  methods: {
    openModal(isNew, item) {
      this.$emit("openModal", isNew, item);
    }
  }
};
</script>
