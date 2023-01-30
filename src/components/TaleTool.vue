<template>
  <div class="table-tool">
    <div class="table-tool-left">
      <slot name="left"></slot>
    </div>
    <div class="table-tool-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.table-tool {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  .table-tool-left {
    flex: 1;
  }
}
</style>
