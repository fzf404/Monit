import { useSetting } from '@/hooks/setting'

export default async () => {
  useSetting({
    text: {
      type: 'text',
      value: 'test',
      label: {
        cn: '文本',
        en: 'Text',
      },
      length: 6,
    },
    number: {
      type: 'number',
      value: 1,
      label: {
        cn: '数字',
        en: 'Number',
      },
      length: 4,
    },
    switch: {
      type: 'switch',
      value: true,
      label: {
        cn: '开关',
        en: 'Switch',
      },
    },
    button: {
      type: 'button',
      value: 'test',
      label: {
        cn: '按钮',
        en: 'Button',
      },
      help: 'https://monit.fzf404.art/',
      click: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('success')
          }, 1000)
        })
      },
    },
    select: {
      type: 'select',
      value: 'a',
      label: {
        cn: '选择器',
        en: 'Select',
      },
      options: {
        a: 'abc',
        b: 'bcd',
        c: 'cdf',
      },
    },
  })
}
