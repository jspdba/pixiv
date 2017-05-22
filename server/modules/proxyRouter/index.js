import Router from 'koa-router'
import proxy from 'http-proxy-middleware'
import c2k from 'koa2-connect'
import clientConfig from '../../../config'
let router = Router()


// let proxyPixtvTable = ['https://i.pximg.net','https://i3.pixiv.net','https://i1.pixiv.net','https://i2.pixiv.net']
clientConfig.dev.proxyPixtvTable.forEach((item) => {
  router.get('/*',c2k(proxy('/' + item,{
    target: item,
    changeOrigin: true,
    pathRewrite: function (path) {
      return path.replace('/' + item,'')
    },
    headers: {
      Referer: 'http://www.pixiv.net/'
    }
  })))

})

export default router
