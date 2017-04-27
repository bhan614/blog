import verify from '../../middleware/verify.js';
export default (router) => {
  router.post('/123', verify, ctx => {
    ctx.body = { success: true };

  });
}
