<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-01 15:22:08
 * @Description: 主题开发
-->

来做一个赛博朋克风格的主题吧！

## 🌃 赛博朋克

参考：`app/theme/light.scss`

### 1. 编写样式文件

> `app/themes/punk.scss`

```scss
/*
 * 基底
 */

#app {
  @apply bg-indigo-600 bg-opacity-40;
}

/*
 * 文字
 */

.text-primary {
  @apply text-gray-200;
}

.text-secondary {
  @apply text-amber-300;
}

.text-dark {
  @apply text-indigo-600;
}

.text-theme {
  @apply text-red-400;
}

/*
 * 主题
 */

.bg-theme {
  @apply bg-orange-400;
}

.border-theme {
  @apply border-orange-400;
}

/*
 * 模态框
 */

.modal {
  @apply bg-indigo-600 bg-opacity-40;
}

/*
 * 设置
 */

.setting {
  ul {
    @apply bg-amber-200 ring-indigo-400 ring-opacity-50;

    // 设置内容
    li {
      @apply bg-amber-100 shadow;

      label {
        @apply text-indigo-700;
      }

      select {
        @apply bg-gray-200 text-indigo-500 shadow-inner focus:text-indigo-600;
      }

      button {
        @apply bg-blue-500 hover:bg-blue-600;
      }

      input[type='checkbox'] {
        @apply accent-indigo-500;
      }

      input[type='number'],
      input[type='text'] {
        @apply bg-gray-200 text-indigo-500 shadow-inner focus:text-indigo-600;
      }
    }

    // 设置操作
    ol {
      button:last-child {
        @apply btn-indigo;
      }
    }
  }
}
```

### 2. 编辑主题样式

> `app/theme/base.scss`

```scss
/**
 * 主题
 */
.dark {
  @import 'dark.scss';
}

.light {
  @import 'light.scss';
}

.punk {
  @import 'punk.scss';
}
```

### 3. 增加主题图标

> `app/assets/theme/punk.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6.357 9C3.72 9.68 2 10.845 2 12.175C2 14.282 6.405 16 11.85 16c.74 0 1.26-.039 1.95-.097"></path>
    <path d="M9.837 15.9c-.413-.596-.806-1.133-1.18-1.8c-2.751-4.9-3.488-9.77-1.63-10.873c1.15-.697 3.047.253 4.974 2.254"></path>
    <path d="M6.429 15.387c-.702 2.688-.56 4.716.56 5.395c1.783 1.08 5.387-1.958 8.043-6.804c.36-.67.683-1.329.968-1.978"></path>
    <path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85-1.102 1.121-5.972-1.633-10.873c-.384-.677-.777-1.204-1.18-1.8"></path>
    <path d="M17.66 15c2.612-.687 4.34-1.85 4.34-3.176C22 9.714 17.592 8 12.155 8c-.747 0-1.266.029-1.955.087"></path>
    <path d="M8 12c.285-.66.607-1.308.968-1.978c2.647-4.844 6.253-7.89 8.046-6.801c1.11.679 1.262 2.706.56 5.393"></path>
    <path d="M12.26 12.015h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24"></path>
  </g>
</svg>
```

### 4. 增加主题配置

> `config/theme.ts`

```ts
export const themeList: theme[] = debugFilter([{ name: 'dark' }, { name: 'light' }, { name: 'punk' }])
```
