export default {
    dbs:'mongodb://127.0.0.1:27017/student',
    redis:{
        get host(){
            return '127.0.0.1'
        },
        get post(){
            return 6379
        }
    },
    //smtp发送验证码
    smtp:{
        get host(){
            return 'smtp.qq.com'
        },
        get user(){
            return '657809680@qq.com'
        },
        //SMTP授权码
        get pass(){
            return 'ngqgjafivsahbaje'
        },
        //随机验证码
        get code() {
            return () => {
              return Math.random().toString(16).slice(2, 6).toUpperCase()
            }
          },
          get expire() {
            return () => {
              return new Date().getTime() + 60 * 60 * 1000
            }
          }
        },
        sign: "a3c9fe0782107295ee9f1709edd15218",
        requestUrl: "http://cp-tools.cn"
}