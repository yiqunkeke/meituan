export default {
    dbs: "monogodb://127.0.0.1:27017/student", //配置mongodb数据库（协议//主机:端口/数据库名称）

    // 配置 redis 数据库-->
    redis: {
        get host(){
            return "127.0.0.1" // 主机
        },
        get port(){
            return 6379 // 端口
        }
    },

    // 配置 smtp 服务-->
    smtp: {
        get host() {
            return "smtp.qq.com" // 主机
        },
        get user() {
            return "1431806069@qq.com" // 邮箱账号
        },
        get pass() {
            return "xuwkoppdlihljajg" // 授权码
        }
    },

    // 生成验证码
    get code(){
        return ()=>{
            return Math.random().toString(16).slice(2,6).toUpperCase()
        }
    },

    // 设置验证码过期时间
    // （技巧点：返回一个函数，以保证每次返回的值是唯一的，否则返回的就是一个常量）
    get expire() {
        return ()=>{
           return new Date().getTime() + 60*60*1000
        }
    }
}