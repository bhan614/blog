import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import config from '../../configs';

export default async(router) => {
  let user = await User.find().exec().catch(err => {
    console.log(err);
  });
  //console.log(user);
  if (user.length === 0) {
    user = new User({
      name: 'bh',
      username: 'admin',
      password: 'password',
      avatar: '',
      createTime: new Date()
    })
    await user.save().catch(err => {
      console.log(err);
    });
  }
  router.post('/token', async(ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    //console.log(username, password);
    let user = await User.find({username: username}).exec().catch(err => {
      console.log(err);
    });
    if (user !== null) {
      if (user[0].password === password) {
        const token = jwt.sign({
          uid: user._id,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 hour
        }, config.jwt.secret);
        ctx.body = {
          success: true,
          uid: user._id,
          name: user.name,
          token: token
        }
      } else {
        ctx.throw(401, '密码错误')
      }
    } else {
      ctx.throw(401, '用户名错误')
    }
  })
}
