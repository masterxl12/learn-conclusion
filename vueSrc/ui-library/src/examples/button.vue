<template>
  <div>
    <ui-button type="primary">主要的</ui-button>
    <ui-button type="warning">警告</ui-button>
    <ui-button type="danger" :loading="true">危险的</ui-button>
    <ui-button type="success">成功的</ui-button>
    <ui-button type="info">信息</ui-button>
  </div>
</template>

<script>
export default {};
</script>