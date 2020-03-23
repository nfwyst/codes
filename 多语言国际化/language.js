const http = require('http')

const langPacks = {
  'zh-CN': {
    title: '欢迎光临'
  },
  'en': {
    title: 'welcome'
  }
}

http
  .createServer(function (req, res) {
    const acceptLanuage = req.headers['accept-language']
    let langKey = 'en'
    if (acceptLanuage) {
      const langs = acceptLanuage
        .split(',')
        .map(item => {
          const [lang, q = 'q=1'] = item.split(';')
          const [_, qv] = q.split('=')
          return {
            lang,
            q: parseFloat(qv)
          }
        })
        .sort((a, b) => b.q - a.q)
      for (let index = 0; index < langs.length; index++) {
        const { lang } = langs[index];
        if (langPacks[lang]) {
          langKey = lang
          break
        }
      }
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    return res.end(langPacks[langKey].title)
  })
  .listen(8080, () => console.log('服务器启动在端口 8080'))
