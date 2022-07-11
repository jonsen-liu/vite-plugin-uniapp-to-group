####  vite-plugin-uniapp-to-group

`vite-plugin-uniapp-to-group` 是 `uni-app` 开发字节小程序的时候，使用抖音团购模板的 `vite` 转换插件


```javascript
  npm i vite-plugin-uniapp-to-group -D
  or
  yarn add vite-plugin-uniapp-to-group -D
```

```javascript
  // vite.config.ts
  
  // 这样直接引入使用好像会报错
  import UniappToGroup from 'vite-plugin-uniapp-to-group'
  // 这样引入引入使用不会  原因目前未知，欢迎提出解决
import UniappToGroup from './node_modules/vite-plugin-uniapp-to-group/src/index'


  export default defineConfig({
    plugins: [
      ..., // 你的其他vite插件
      UniappToGroup({
        // 对应 package.json 中引入插件步骤
        package: {
          ttPlugins: {
            dependencies: {
              'microapp-trade-plugin': {
                version: '1.0.5',
                isDynamic: true
              }
            }
          }
        },
        /**
         * app 中可以是任何字段，插件会将字段和app.json对比，有就合并字段，没有就添加字段
         * 合并字段 目前只处理 Array 和 Object 类型(注：[]和{}才会合并， null 类型不会合并)
         * Object 类型字段合并，在key相同的情况会覆盖value
         * Array 类型合并 是将两个数组合并
        */
        app: {
          pages: [
            // 下单页
            'ext://microapp-trade-plugin/order-confirm',
            // 退款申请页
            'ext://microapp-trade-plugin/refund-apply',
            // 退款详情页
            'ext://microapp-trade-plugin/refund-detail'
          ]
        }
      })
    ]
  })
```
