const translations = require('democracyos-notifier/lib/translations')

const t = translations.t

const overrides = {
  'templates.email.greeting': 'Estimado/a, USER_NAME',
  'templates.email.signature': 'Subsecretaría de Innovación Pública y Gobierno Abierto',

  'templates.welcome-email.subject': 'Bienvenido a Consulta Pública',
  'templates.welcome-email.body': 'Para completar su registro haga <a href="VALIDATE_MAIL_URL">click aquí.</a>',
  'templates.welcome-email.ps': 'Si no ha sido usted quien se registró, por favor ignore este correo electrónico.'
}

Object.assign(t.es, overrides)
Object.assign(t.en, overrides)
