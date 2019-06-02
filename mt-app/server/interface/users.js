import Router from 'koa-router'
import Redis from 'koa-redis'  // redis作用：服务端生成验证码发送给客户端时，使得验证码能够对应上用户A和B
import nodeMailer from 'nodemailer' // nodemailer作用：在node中使用SMTP服务，给用户填写的邮箱发送邮件
                                    //(1.除了在邮箱中设置开启SMTP,2.还需要在服务端引入nodemailer程序)
import User from "../dbs/models/users" // 导入User模型
import Email from '../dbs/config' // 配置
import axios from './utils/axios'
import Passport from "./utils/passport"

// 下面开始定义接口
let router = new Router({
    prefix: "/users" // 所有这个文件下的接口，都添加users前缀
})

let Store = new Redis().client // 获取redis客户端

// 定义注册接口
router.post('/signup', async (ctx) => {
    const {
        username,
        password,
        email,
        code
    } = ctx.request.body; // 通过解构赋值，拿到注册时存放在ctx.request.body中的 username,password,email,code
    
    
    console.log(ctx.request.body)
    console.log(username, password, email)

    // 校验code（nodemailer 在发验证码的时候，会在 redis中保存一份）
    if (code) {
        // 这里需要从 redis中读取保存的验证码--作对比
        const saveCode = await Store.hget(`nodemail:${username}`, 'code')
        const saveExpire = await Store.hget(`nodemaile:${username}`, 'expire')

        if (code === saveCode) {
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }

    // 校验用户名username
    let user = await User.find({
        username
    })
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '用户名已被注册'
        }
        return
    }

    // 如果code 和 username都验证通过，则写库
    let nuser = await User.create({
        username,
        password,
        email
    })

    //检查有没有写库
    if (nuser) {
        let res = await axios.post('/users/signin', {
            username, password
        })
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: '注册成功',
                user: res.data.user
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
})


// 定义登录接口
router.post('/signin', async (ctx, next) => {
    // 调用 passport的 local策略
    return Passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                return ctx.login(user)
            } else {
                ctx.body = {
                    code: 1,
                    msg: info
                }
            }
        }
    })(ctx, next)
})

// 定义“发送验证码”接口
router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username
    const saveExpire = await Store.hget(`nodemaile:${username}`, 'expire')
    
    if (saveExpire && Date.getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁，1分钟内1次'
        }
        return false
    }
    // 发邮件
    let transporter = nodeMailer.createTransport({
        host: Email.smtp.host,
        port: 587,
        secure: false,
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })
    // 对外发送哪些信息以及接收方
    let ko = {
        code: Email.smtp.code(), //发送的验证码
        expire: Email.smtp.expire(), //过期时间
        email: ctx.request.body.email, // 发送到哪个邮箱
        user: ctx.request.body.username // 对应哪个用户
    }
    // 邮件中需要显示的信息
    let mailOptions = {
        from: `"认证邮件"<${Email.smtp.user}>`,
        to: ko.email,
        subject: '《慕课网高仿美团网全栈实战》注册码',
        html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
    }
    // 发送邮件动作
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error')
        } else {
            // 存储--redis
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    // 接口响应
    ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
})

// 定义退出接口
router.get('/exit', async (ctx, next) => {
    // 注销
    await ctx.logout()
    // 验证是否注销
    if (!ctx.isAuthenticated()) { // ctx.isAuthenticated()--->固定用法
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
})

// 定义获取用户名接口
router.get('/getUser', async(ctx) =>{
    if (ctx.isAuthenticated()) { // ctx.isAuthenticated()--->固定用法
        const {username, email} = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email:''
        }
    }
})

export default router
