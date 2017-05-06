<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

</script>

<style lang="stylus">
  @import './style/main.styl'
  #app
    width 100%
  .fade-enter-active, .fade-leave-active
    transition all .5s
  .fade-enter, .fade-leave-active
    opacity 0
  .fade-enter
    transform translateY(50px);
  .fade-leave-active
    transform translateY(-50px);
</style>
