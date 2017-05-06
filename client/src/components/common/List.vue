<template>
  <div>
    <ul class="list">
      <li v-for="(article, index) in articleList" @click="switchArticle(index)" class="list__item">
        {{ article.title }}
        <span @click="deleteArticle" v-if="currentArticle.index == index">X</span>
      </li>
      <li @click="createArticle">
        新建
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
  name: 'list',
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
    ]),
    switchArticle(index) {
      if (!this.currentArticle.save) {
        this.$message.error('请先保存文章');
        return;
      }
      this.getCurrentArticle(index);
    },
    createArticle() {
      this.getCurrentArticle(-1);
    },
    deleteArticle() {
      this.$confirm('此操作将永久删除文章，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.currentArticle._id === -1) {
          this.getCurrentArticle(0)
          return;
        }
        this.$store.dispatch('deleteArticle', {
          id: this.currentArticle._id,
          index: this.currentArticle.index
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
        .then(() => this.getAllArticles())
        .then(() => {
          if (this.currentArticle.index === 0) {
            this.getCurrentArticle(0);
          } else {
            this.getCurrentArticle(this.currentArticle.index - 1);
          }
        })
      })
    }
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
