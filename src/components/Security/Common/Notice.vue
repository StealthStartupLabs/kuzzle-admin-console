<template functional>
  <div class="SecurityNotice card-panel blue lighten-4">
    For more information about securities policies please visit
    <a
      class="blue-text lighten-2"
      href="https://docs.kuzzle.io/guide/1/essentials/security/"
      target="_blank"
      >https://docs.kuzzle.io/guide/1/essentials/security
      <i class="fa fa-external-link-alt"
    /></a>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
.SecurityNotice {
  max-width: $container-width;
}
</style>

<script>
export default {
  name: 'SecurityNotice'
}
</script>
