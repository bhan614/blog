import Axios from 'axios'
export default {
   createArticle(title, content, publish, abstract) {
    return Axios.post('/api/articles', { title, content, publish, abstract })
  },
  getAllArticles() {
    return Axios.get('/api/articles')
  },
  saveArticle(id, article) {
    return Axios.patch('/api/articles/'+id, article)
  },
  publishArticle(id) {
    return Axios.patch('/api/articles/'+id, { publish: true })
  },
  notPublishArticle(id) {
    return Axios.patch('/api/articles/'+id, { publish: false })
  },
  deleteArticle(id) {
    return Axios.delete('/api/articles/'+id)
  }
}
