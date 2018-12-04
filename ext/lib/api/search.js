const express = require('express')
const debug = require('debug')
const log = debug('democracyos:ext:api:filters')
const models = require('lib/models')
const api = require('../db-api')

const Topic = models.Topic
const Forum = models.Forum

const app = module.exports = express()

app.get(
  '/:string/:kind/:author?',
  function(req, res, next) {
    const {
      string,
      kind,
      author
    } = req.params

    const isConsulta = kind.includes('consulta')
    const isEje = kind.includes('eje')

    const regex = createRegex(string)
    const regexAuthor = createRegex(author || '')

    const mainQuery = { '$and': [] }
    const simpleQuery = { '$or' : [] }
    const authorQuery = { '$or': [] }

    if (!(isConsulta || isEje)) next(new Error('Invalid kind argument'))

    if (isConsulta) {
      simpleQuery['$or'].push({ name: regex })
      simpleQuery['$or'].push({ title: regex })
      simpleQuery['$or'].push({ summary: regex })
      simpleQuery['$or'].push({ 'extra.richSummary': regex })
      if (author) {
        authorQuery['$or'].push({ 'extra.owner': regexAuthor })
      }
    }

    if (isEje) {
      simpleQuery['$or'].push({ mediaTitle: regex })
      if (author) {
        authorQuery['$or'].push({ 'author': regexAuthor })
      }
    }


    mainQuery['$and'].push(simpleQuery)
    if (authorQuery['$or'].length) {
      mainQuery['$and'].push(authorQuery)
    }

    return Promise.all([Forum.find(mainQuery), Topic.find(mainQuery)])
      .then((response) => {
        return res.json(response)
      })
      .catch(next)
  }
)

const createRegex = (string) => ({ '$regex': string, '$options': 'i' })
