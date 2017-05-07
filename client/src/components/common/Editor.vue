<template>
  <div class="editor-box">
    <input type="text" placeholder="文章标题" v-model="articleTitle" />
    <ul>
      <li v-for="(tag, index) in articleTags">{{ tag }}<span @click="deleteCurrentTag(index)">&nbsp;&nbsp;&nbsp;X</span>
      </li>
    </ul>
    <input type="text" placeholder="回车添加文章标签" v-model="articleTag" @keyup.enter="AddTag" />
    <textarea id="editor"></textarea>
    <button @click="create" v-if="currentArticle.id === -1">创建</button>
    <button @click="saveArticle" v-else>保存</button>
    <template v-if="currentArticle.id !== -1">
      <button @click="publishArticle" v-if="!currentArticle.publish">发布</button>
      <button @click="notPublishArticle" v-else>撤回发布</button>
    </template>
    <button @click="deleteArticle">删除</button>
  </div>
</template>
<script>
  import SimpleMDE from 'simplemde';
  import css from 'simplemde/dist/simplemde.min.css';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  let simplemde;
  export default {
    name: 'editor',
    data() {
      return {
        articleTitle: this.title,
        articleContent: this.content,
        articleTags: this.tags
      }
    },
    computed: {
      ...mapGetters([
        'currentArticle',
        'allTags'
      ]),
    },
    props: {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      tags: {
        type: Array,
        required: true
      }
    },
    mounted: function() {
      //do something after mounting vue instance
      simplemde = new SimpleMDE({
        element: document.getElementById('editor'),
        spellChecker:false,
      });
      simplemde.codemirror.on('change', () => {
        let value = simplemde.value();
        if (this.articleContent === value) {
          return;
        }
        if (this.currentArticle.save) {
          this.changeArticle();
          if (this.currentArticle.id !== -1) {
            //this.saveArticle();
          }
        }
        this.articleContent = value;
      })
    },
    methods: {
      ...mapActions([
        'getAllArticles',
        'getCurrentArticle',
        'createArticle',
        'changeArticle'
      ]),
       create() {
         let abstract;
         if (this.articleContent.indexOf('<!--more-->') !== -1) {
           abstract = this.articleContent.split('<!--more-->')[0];
         } else {
           this.$message.error('请填写摘要');
           return;
         }
        const info = {
          title: this.articleTitle,
          content: this.articleContent,
          publish: false,
          abstract: abstract,
          tags: this.currentArticle.tags
        }
        this.createArticle(info).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          }
        })
        .then(() => this.getAllArticles())
        .then(() => this.getCurrentArticle(0))
        .catch((err, res) => {
          this.$message.error(err.response.data);
        });
      },
      saveArticle() {
        let abstract;
        if (this.articleContent.indexOf('<!--more-->') !== -1) {
          abstract = this.articleContent.split('<!--more-->')[0];
        } else {
          this.$message.error('请填写摘要');
          return;
        }
        const article = {
          title: this.articleTitle,
          content: this.articleContent,
          abstract: abstract,
          tags: this.articleTags,
          lastEditTime: new Date()
        }
        this.$store.dispatch('saveArticle', {
          id: this.currentArticle.id,
          article
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          }
        })
        .then(() => this.getAllArticles())
        .catch(err => {
          this.$message.error(err.response.data.error);
        })
      },
      publishArticle() {
        this.$store.dispatch('publishArticle', {
          id: this.currentArticle.id
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          }
        }).catch(err => {
          this.$message.error(err.response.data.error);
        })
      },
      notPublishArticle() {
        this.$store.dispatch('notPublishArticle', {
          id: this.currentArticle.id
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: '撤回发布成功',
              type: 'success'
            });
          }
        }).catch(err => {
          this.$message.error(err.response.data.error);
        })
      },
      deleteArticle() {
        this.$confirm('此操作将永久删除文章，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          if (this.currentArticle.id === -1) {
            this.getCurrentArticle(0)
            return;
          }
          this.$store.dispatch('deleteArticle', {
            id: this.currentArticle.id,
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
      },
      AddTag() {
        if (this.articleTags.indexOf(this.articleTag) !== -1) {
          this.$message.error('该标签已存在')
        } else {
          this.articleTags.push(this.articleTag);
          this.articleTag = "";
        }
      },
      deleteCurrentTag(index) {
        this.articleTags.splice(index, 1);
      }
    },
    watch: {
      content(val) {
        this.articleContent = val;
        simplemde.value(this.articleContent);
      },
      title(val) {
        this.articleTitle = val;
      },
      tags(val) {
        this.articleTags = val;
      },
      ariticleContent(val) {

      },
      articleTitle(val) {
        if (this.title !== val && this.currentArticle.id !== -1) {
          this.changeArticle();
          //this.saveArticle();
        }
      },
      articleTag(val) {

      }
    }
  }
</script>
