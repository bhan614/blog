<template>
  <div class="admin">
    <list></list>
    <editor :content='currentArticle.content' :title="currentArticle.title"></editor>
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

</style>
