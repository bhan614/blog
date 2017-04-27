<template>
  <div class="login">
    <div class="login__header">
      <h1 class="login__title">博客后台登录</h1>
    </div>
    <div class="login__item">
      <el-input placeholder="用户名" />
    </div>
    <div class="login__item">
      <el-input type="password" placeholder="密码" />
    </div>
    <div class="login__item">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        this.$router.push('./admin')
      }
    }
  }
</script>

<style lang="stylus">
@import '../style/settings.styl'
.login
  max-width 640px
  margin 150px auto 0 auto
  &__header
    margin 0 auto 50px auto
    text-align center
  &__item
    margin-bottom 10px
    padding 0 10px 0 10px
    input
      display block
      width 300px
      height 50px
      margin 0 auto
      padding-left 10px
    button
      display block
      width 300px
      height 50px
      margin 20px auto
</style>
