FROM democracyos/democracyos:2.5.1

MAINTAINER Matías Lescano <matias@democraciaenred.org>

ENV LOCALE=es \
  AVAILABLE_LOCALES=es,en \
  ENFORCE_LOCALE=true \
  MODERATOR_ENABLED=true \
  MULTI_FORUM=true \
  RESTRICT_FORUM_CREATION=true \
  FAVICON=/boot/favicon-gob.ico \
  LOGO=https://cldup.com/_ZriYFdZN4.svg \
  LOGO_MOBILE=https://cldup.com/_ZriYFdZN4.svg \
  NOTIFICATIONS_MAILER_EMAIL=gobiernoabierto@modernizacion.gob.ar \
  NOTIFICATIONS_MAILER_NAME='Consulta Pública Argentina' \
  ORGANIZATION_EMAIL=gobiernoabierto@modernizacion.gob.ar \
  ORGANIZATION_NAME='Consulta Pública Argentina' \
  SOCIALSHARE_SITE_NAME='Consulta Pública Argentina' \
  SOCIALSHARE_IMAGE=https://cldup.com/quswAMk9Ns.png \
  SOCIALSHARE_DOMAIN=consultapublica.argentina.gob.ar \
  SOCIALSHARE_TWITTER_USERNAME=@ModernizacionAR \
  TWEET_TEXT='Estoy tratando de mejorar esta propuesta “{topic.mediaTitle}” ¡Participá vos también! #GobiernoAbierto'
