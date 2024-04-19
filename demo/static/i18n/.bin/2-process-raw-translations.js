const langs = require('./data/langs.json')

const fs = require('fs')

const ns = 'common'

let fpath_in, dpath_out, fpath_out, srcArr, dstObj

for (let lang of langs) {
  lang = lang[0]

  fpath_in  = __dirname + '/data/raw_translations/debug.' + lang + '.txt'
  dpath_out = __dirname + '/../' + lang
  fpath_out = dpath_out + '/' + ns + '.json'

  fs.mkdirSync(dpath_out)

  srcArr = fs.readFileSync(fpath_in, {encoding: 'utf8'})
  srcArr = JSON.parse(srcArr)

  dstObj = {
    "Hello": srcArr[0],
    "World": srcArr[1]
  }

  fs.writeFileSync(
    fpath_out,
    JSON.stringify(dstObj, null, 2),
    {encoding: 'utf8'}
  )
}
