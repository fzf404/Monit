<!--
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 17:36:57
 * @Description: Monit è¯´æææ¡£
-->

## ð¡ å±ç¤º

![show](show.jpeg)

## ð å®è£

> ä½¿ç¨ Github Action èªå¨æåï¼æ éæå¿å®å¨é®é¢

åå¾ [Release](https://github.com/fzf404/Monit/releases) / [å½åéå](https://hub.fastgit.xyz/fzf404/Monit/releases) å¯»æ¾æä½ç³»ç»å¯¹åºçå®è£å

- Windows

  > å¨åè½æ¯æ

- Linux

  > å¼æºèªå¯åè½å¯è½ä¼å¤±æ

- Mac

  > ç±äºæ²¡æ Apple å¼åèè´¦å·ï¼æå¼æ¶å¦åºç° `Monit.app å·²æå`ï¼è¯·æ§è¡å¦ä¸æä»¤

  ```bash
  sudo xattr -rd com.apple.quarantine [åºç¨ä½ç½®](å°åºç¨ç¨åºä¸­ç Monit æè¿æ¥)
  ```

## â¨ åè½

> VueC æ Composition APIï¼VueO æ Options API

| æä»¶å   | åè½              | ææ¯                         | ç¶æ |
| -------- | ----------------- | ---------------------------- | ---- |
| welcome  | ä½¿ç¨æå¼          | Vue Composition API          | â   |
| count    | è®¡æ°å¨            | Vue Options API              | â   |
| github   | github ä¿¡æ¯çæ§   | VueO + Axios + Grid          | â   |
| clock    | æ¶éç¿»çå¨        | VueC + Scss + Keyframes      | â   |
| todo     | å¾åäºé¡¹ç®¡ç      | VueC + Pug + Draggable       | â   |
| camera   | ç¸æºçæ§          | VueC + Canvas + MediaPipe    | â   |
| live2d   | èæè§è²è·è¸ª      | VueC + Kalidokit + MediaPipe | âï¸  |
| music    | ç½æäºé³ä¹æ­æ¾    |                              | âï¸  |
| bilibili | bilibili ä¿¡æ¯çæ§ |                              | âï¸  |
| weather  | å¤©æ°ä¿¡æ¯çæ§      |                              | âï¸  |

## ð å¼å

Monit æ¯ä¸ä¸ªå¼æºçæ¡é¢å°ç»ä»¶ï¼ä½¿ç¨ MIT åè®®å¼æºï¼æ¨å¯ä»¥èªç±ä½¿ç¨é¡¹ç®ä¸­çä»£ç ã

åºäº Electron + Vue å¼åï¼æ¸²æè¿ç¨ä½¿ç¨ JS + Vueï¼ä¸»è¿ç¨ä½¿ç¨ JS è°ç¨ Electron APIã

- å¦ææ¨äºè§£ Vueï¼å¹¶ä¸äºè§£ Electronï¼ä½¿ç¨æ¬é¡¹ç®å³å¯å¿«éå¼ååºèªå·±çæ¡é¢å°ç»ä»¶ã

- å¦ææ¨åå­¦ Vueï¼å¯¹å¶ä»ææ¯ä¸æ æç¥ï¼å¯ä»¥éè¿æ¬é¡¹ç®ç»§ç»­äºè§£ Vue å `package.json` éåå«çææåºçåºæ¬ä½¿ç¨ã

- å¦ææ¨å¯¹ Vue å NodeJS ä¸æ æç¥ï¼è¯·åå»äºè§£ç¸å³ææ¯ååæ¥æ¥çæ¬é¡¹ç®ï¼å¨å¤±æçç¦»å¼ä¹åå«å¿äºçä¸ä¸ä¸ª starã

### ð ä»£ç ç»æ

> é¡¹ç®ç»æåºäºä¸ªäººåå¥½ï¼å¯è½éæ¶åç**éå¤§è°æ´**
>
> æä»¶å¤´é¨åæåè½æè¿°

```bash
Monit
âââ app # æ¸²æè¿ç¨
â   âââ assets # éæèµæº
â   âââ layouts # å¸å±ç»ä»¶
â   âââ themes # ä¸»é¢
â   âââ plugins # æä»¶
âââ core # ä¸»è¿ç¨
â   âââ main.js # åºç¨å¥å£
â   âââ tray.js # æçè¿ç¨
â   âââ window.js # çªå£ç®¡ç
âââ custom # èªå®ä¹å·¥å·
â   âââ access.ts # æéè·å
â   âââ event.ts # äºä»¶å¤ç
â   âââ ipc.ts # IPCéä¿¡
â   âââ plugin.ts # æä»¶éç½®
â   âââ store.ts # Pinia éç½®
âââ lib # åºæä»¶
â   âââ camera.ts # æåå¤´æ§å¶
â   âââ hoslistic.ts # MediaPipe æ§å¶
â   âââ request.ts # è¯·æ±å°è£
â   âââ statistic.ts # ç»è®¡å°è£
â   âââ storage.ts # æ¬å°å­å¨å°è£
âââ public # éææä»¶
âââ .prettier # ä»£ç æ ¼å¼åéç½®
âââ tailwind.config.js # tailwindcss éç½®
âââ postcss.config.js # postcss éç½®
âââ tsconfig.json # typescript éç½®
âââ vue.config.js # vue-cli éç½® & electron æåéç½®
```

### â¨ ææ¯

- Electron 18
  - è·¨å¹³å°çæ¡é¢åºç¨ç¨åºæå»ºå·¥å·
  - [å®æ¹ææ¡£](https://www.electronjs.org/zh/docs/latest)
  - å¯è·¨å¹³å°ä½¿ç¨å¤ç§æä½ç³»ç» API
- Vue 3
  - JavaScript åç«¯æ¡æ¶
  - [å®æ¹ææ¡£](https://v3.cn.vuejs.org/guide/introduction.html)
  - å¯ä½¿ç¨ setup è¯­æ³å¼å
- Tailwindcss 3
  - åè½ç±» CSS è¯­æ³ç³
  - [å®æ¹ææ¡£](https://www.tailwindcss.cn/docs)
  - å¯éåè½ï¼å¯åªä½¿ç¨ css è¿è¡æä»¶å¼å
- TypeScript 4
  - JavaScript ç±»åç³»ç»
  - [å®æ¹ææ¡£](https://www.tslang.cn/docs/home.html)
  - æ¯æç±»åå®ä¹

### ð å¿«éå¼å§

> æ¥åä¸ä¸ªè®¡æ°å¨å§
>
> æ¨èä½¿ç¨ vscode ä½ä¸ºä»£ç ç¼è¾å¨
>
> å®è£ tailwindcss æä»¶åï¼å°é¼ æ ç§»è³ class ä¸å¯æ¥çæ ·å¼ css

1. clone æ¬é¡¹ç®
   ```bash
   git clone https://github.com/fzf404/Monit.git --depth-1
   ```
2. å®è£é¡¹ç®ä¾èµ

   ```bash
   # åå¦æ¨ä½¿ç¨ npmï¼è¯·å®è£ pnpm
   npm i -g pnpm
   # ä½¿ç¨ pnpm å®è£ä¾èµ
   pnpm i
   ```

3. ç¼åæä»¶é¡µé¢ `app/plugins/count-new.vue`

   ```vue
   <template>
     <main>
       <!-- çªå£æ§å¶å¨ -->
       <Layout />
       <!-- é¡µé¢åå®¹ -->
       <article class="h-screen">
         <!-- è®¾ç½® -->
         <aside class="setting setting-sm" v-show="store.setting">
           <!-- ä¸­å¿æ¡ -->
           <ul>
             <!-- æ°å¼ -->
             <li>
               <label for="count-number">æ°å¼</label>
               <input
                 id="count-number"
                 type="number"
                 oninput="if(value.length > 5) value = value.slice(0, 5)"
                 v-model.lazy="count"
                 @keyup.enter="store.setting = false"
               />
             </li>
             <!-- æ­¥é¿ -->
             <li>
               <label for="step-number">æ­¥é¿</label>
               <input
                 id="step-number"
                 type="number"
                 oninput="if(value.length > 3) value = value.slice(0, 3)"
                 v-model.lazy="step"
                 @keyup.enter="store.setting = false"
               />
             </li>
             <!-- ä¿å­ -->
             <ol>
               <button @click="store.setting = false">OK</button>
             </ol>
           </ul>
         </aside>
         <!-- ä¸»ä½ -->
         <section class="h-full flex-col-center space-y-2">
           <h1 class="text-intro">è®¡æ°å¨</h1>
           <p class="text-5xl">{{ count }}</p>
           <!-- å¢å  & åå° -->
           <p class="space-x-4 pt-2">
             <button class="btn btn-sq bg-red-500 hover:bg-red-600" @click="reduce"><SubSVG class="w-5" /></button>
             <button class="btn btn-sq bg-green-500 hover:bg-green-600" @click="increase">
               <AddSVG class="w-5" />
             </button>
           </p>
         </section>
       </article>
     </main>
   </template>

   <script>
   import { useMainStore } from '#/store'
   import { storage } from '~/storage'

   import AddSVG from '@/assets/count/add.svg'
   import SubSVG from '@/assets/count/sub.svg'
   import Layout from '@/layouts/macto.vue'

   // åå§å storage
   const { set, get } = storage('count')

   export default {
     setup() {
       // åå§å store
       return { store: useMainStore() }
     },
     components: {
       Layout,
       AddSVG,
       SubSVG,
     },
     data() {
       return {
         // è¯»å count å¼
         count: get('count', 0), // æ°å­
         // è¯»å step å¼
         step: get('step', 1), // æ­¥é¿
       }
     },
     methods: {
       increase() {
         // æµ®ç¹æ°è¿ç®ç²¾åº¦
         this.count = Number((this.count + this.step).toFixed(2))
       },
       reduce() {
         // æµ®ç¹æ°è¿ç®ç²¾åº¦
         this.count = Number((this.count - this.step).toFixed(2))
       },
     },
     // çå¬ count åå
     watch: {
       count() {
         set('count', this.count)
       },
       setp() {
         set('step', this.step)
       },
     },
   }
   </script>
   ```

4. å¢å æä»¶éç½® `coustom/plugin.ts`

   ```ts
   export const pluginList: pluginList[] = [
     // ...æ·»å å¦ä¸è¡
     { name: 'count-new', size: [1, 1], description: 'è®¡æ°å¨', debug: true },
   ]
   ```

5. å¯å¨ & æå

   ```bash
   # è°è¯åºç¨
   pnpm serve
   # å¨æçä¸­å¯å¨ count æä»¶

   # æå»ºåºç¨
   pnpm build
   # æå»ºæååå³å¯å¨ dist_electron æ¾å°å®è£å
   ```

### ä¸»é¢å¼å

åèï¼`app/layouts/macto.vue`

...å¾ç»­

### ð» API è¯´æ

1. Layout å¸å±ï¼`app/layouts/macto.vue`
2. Pinia å°è£ï¼`custom/store.ts`
3. Notice å°è£ï¼`custom/ipc.ts`
4. Axios å°è£ï¼`lib/request.ts`
5. Storage å°è£ï¼`lib/storage.ts`
   - éç½®æä»¶
     - Macï¼`/Users/[user]/Library/Application Support/monit/config.json`
     - Windowsï¼`C:\Users\[user]\AppData\Roaming\monit\config.json`
     - Linuxï¼`/home/[user]/.config/monit/config.json`

> å¾ç»­...

### ð¥ æäº¤ä»£ç 

1. æäº¤ä»£ç è¯·å° beta åæ¯
2. æ§è¡ commit æä½æ¶ä¼èªå¨è¿è¡ä»£ç æ ¼å¼å
