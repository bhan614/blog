<template>
  <div>
    <ul class="article__list">
      <li v-for="(article, index) in articleList">
        {{ article.title }}
        <span>{{ article.lastEditTime }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'article',
  computed: {
    ...mapGetters([
      'articleList',
      'currentArticle'
    ]),
  },
  data() {
    return {
      "activeIndex": 0
    }
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getCurrentArticle'
    ])
  },
  mounted() {
    this.getAllArticles().then(res => {
      this.getCurrentArticle(0);
    });
  }
}
</script>
<style lang="stylus" scoped>

</style>
