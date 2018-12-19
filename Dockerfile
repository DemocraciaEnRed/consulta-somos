FROM democracyos/democracyos:2.11.15

MAINTAINER Matías Lescano <matias@democraciaenred.org>

ENV LOCALE=es \
  AVAILABLE_LOCALES=es,en \
  ENFORCE_LOCALE=true \
  MODERATOR_ENABLED=true \
  MULTI_FORUM=true \
  RESTRICT_FORUM_CREATION=true \
  FAVICON=/ext/lib/boot/favicon.ico \
  LOGO=https://consultapublica.blob.core.windows.net/assets/Logo_Presidencia.svg \
  LOGO_MOBILE=https://consultapublica.blob.core.windows.net/assets/Logo_Presidencia.svg \
  NOTIFICATIONS_MAILER_EMAIL=gobiernoabierto@modernizacion.gob.ar \
  NOTIFICATIONS_MAILER_NAME='Consulta Pública Argentina' \
  ORGANIZATION_EMAIL=gobiernoabierto@modernizacion.gob.ar \
  ORGANIZATION_NAME='Consulta Pública Argentina' \
  SOCIALSHARE_SITE_NAME='Consulta Pública Argentina' \
  SOCIALSHARE_SITE_DESCRIPTION='Plataforma de participación ciudadana de la República Argentina.' \
  SOCIALSHARE_IMAGE=https://cldup.com/Y7mWiU4D1Q.png \
  SOCIALSHARE_DOMAIN=consultapublica.argentina.gob.ar \
  SOCIALSHARE_TWITTER_USERNAME=@ModernizacionAR \
  TWEET_TEXT='Estoy tratando de mejorar esta propuesta “{topic.mediaTitle}” ¡Participá vos también! #GobiernoAbierto'
