<template>
  <div class="admin">
    <div class="admin__list">
      <list></list>
    </div>
    <div class="admin__editor">
      <editor :content='currentArticle.content' :title="currentArticle.title"></editor>
    </div>
  </div>
</template>
<script>
import Axios from 'axios';
import Editor from './common/Editor.vue';
import List from './common/List.vue';
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'admin',
  components: {
    Editor,
    List
  },
  data() {
    return {}
  },
  created() {

  },
  methods() {

  },
  computed: {
    ...mapGetters([
      'currentArticle'
    ]),
  }
}
</script>

<style lang="stylus" scoped>
.admin
  display flex
  flex-flow row wrap
  &__list
    width 500px
  &__editor
    flex 1
</style>
