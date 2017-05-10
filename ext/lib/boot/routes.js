var urlBuilder = require('lib/url-builder')

module.exports = function () {
  urlBuilder.register('site.topic', '/:forum/consulta/:id')
  urlBuilder.register('site.help', '/ayuda')
  urlBuilder.register('site.help.article', '/ayuda/:article')
}
