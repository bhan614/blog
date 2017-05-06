import * as types from '../mutation-types';
import api from '../../api/article.js';

const state = {
  articleList: [],
  currentArticle: {
    id: -1,
    index: -1,
    title: '',
    content: '<!--more-->',
    tags: [],
    save: true,
    publish: false
  }
}

const getters = {
  articleList: state => state.articleList.sort((a, b) => {
    return new Date(a.createTime) - new Date(b.createTime);
  }),
  currentArticle: state => state.currentArticle,
  allTags: state => {
    const map = {};
    let result = [];
    for (var i = 0; i < state.articleList.length; i++) {
      const tag = state.articleList[i].tags;
      if (tag.length !== 0 && !map[tag]) {
        map[tag] = true;
        result = result.concat(tag);
      }
    }
    console.log(result);
    return result;
  }
}

const actions = {
  createArticle({ commit, state }, { title, content, publish, tags }) {
    return api.createArticle(title, content, publish, tags).then(res => {
      if (res.data.success) {
        const article = {
          save: true
        }
        Object.assign(article, res.data.article)
        commit(types.CREATE_ARTICLE, article);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
  saveArticle({ commit, state }, { id, article }) {
    return api.saveArticle(id, article).then(res => {
      if (res.data.success) {
        commit(types.SAVE_ARTICLE, { id, article });
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
  publishArticle({ commit, state }, { id }) {
    return api.saveArticle(id).then(res => {
      if (res.data.success) {
        commit(types.PUBLISH_ARTICLE, { id });
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
  notPublishArticle({ commit, state }, { id }) {
    return api.saveArticle(id).then(res => {
      if (res.data.success) {
        commit(types.NOT_PUBLISH_ARTICLE, { id });
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
  getAllArticles({ commit, state }) {
    return api.getAllArticles().then(res => {
      if (res.data.success) {
        commit(types.GET_ALL_ARTICLES, res.data.articleArr);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
  getCurrentArticle({ commit, state }, index) {
    let article;
    if (state.articleList.length == 0 || index == -1) {
      article = {
        id: -1,
        index: -1,
        title: "",
        content: '<!--more-->',
        tags:[],
        save: true,
        publish: false,
      }
    }  else {
      article = {
        id: state.articleList[index].id,
        index: index,
        title: state.articleList[index].title,
        content: state.articleList[index].content,
        tags: state.articleList[index].tags,
        save: true,
        publish: state.articleList[index].publish,
      }
    }
    commit(types.GET_CURRENT_ARTICLE, article);
  },
  changeArticle({ commit, state }) {
    commit(types.CHANGE_ARTICLE);
  },
  deleteArticle({ commit, state }, { id, index }) {
    return api.deleteArticle(id).then(res => {
      if (res.data.success) {
        if (state.articleList.length <= 1) {
          let article = {
            id: -1,
            index: 0,
            title: "",
            content: '',
            save: false,
            publish: false,
          }
          //commit(types.GET_CURRENT_ARTICLE, article)
        }
        //commit(types.DELETE_ARTICLE, index)
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },
}

const mutations = {
  [types.CREATE_ARTICLE](state, article) {
    state.currentArticle = article;
  },
  [types.SAVE_ARTICLE](state, { id, article }) {
    state.currentArticle.save = true;
  },
  [types.PUBLISH_ARTICLE](state, id) {
    state.currentArticle.publish = true;
    state.articleList.find(p => p.id === id).publish = true;
  },
  [types.NOT_PUBLISH_ARTICLE](state, id) {
    state.currentArticle.publish = false;
    state.articleList.find(p => p.id === id).publish = false;
  },
  [types.GET_ALL_ARTICLES](state, articleList) {
    state.articleList = articleList;
  },
  [types.GET_CURRENT_ARTICLE](state, article) {
    state.currentArticle = article;
  },
  [types.CHANGE_ARTICLE](state) {
    state.currentArticle.save = false;
  },
  [types.DELETE_ARTICLE](state, index) {

  }
}

export default { state, getters, actions, mutations }
