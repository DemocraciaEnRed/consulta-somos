# Consulta Pública Argentina

Fork de la plataforma [DemocracyOS](https://github.com/DemocracyOS/democracyos) con modificaciones específicas para Gobierno Abierto de Argentina

## Para empezar

1. Asegurate tener instalado [Docker 1.13.0+](https://www.docker.com/).
2. Cloná este repositorio.
3. Copiá el archivo `docker-compose.override.yml.example` a `docker-compose.override.yml`, y agregá tu mail en la variable `STAFF`. De este modo vas a poder administrar el contenido.
4. Empezá el servidor con `docker-compose up --build` _(la primera vez puede llevar un ratito)_
5. Navegá a [http://localhost:3000](http://localhost:3000)
6. Registrate, entrá, y podés empezar a crear contenido en http://localhost:3000/ajustes/administrar

### Comandos

```
# Para abrir el server local
docker-compose up
```

```
# Si cambiás alguna dependencia en el package.json, tenes que volver a buildear la imagen de Docker con:
docker-compose up --build
```

```
# Para poder entrar al container de DemocracyOS:
docker exec -it dos bash
```

### Referencias

* El archivo `docker-compose.override.yml` se encuentra en el `.gitignore` para estar seguros de no subir cualquier información sensible al repo, como keys, etc.
* Si querés saber más sobre `docker-compose`, acá está toda la documentación: https://docs.docker.com/compose/
* En el archivo `docker-compose.override.yml` podes todas las opciones listadas acá: http://docs.democracyos.org/configuration.html
* El puerto `27017` se encuentra expuesto para que puedas administrar la base de datos con algún cliente de MongoDB como [Robomongo](https://robomongo.org/).
* Todas las vistas personalizadas para Consulta Pública se encuentran en `/ext`. Siguiendo el mismo patrón de carpetas que [DemocracyOS/democracyos](https://github.com/DemocracyOS/democracyos).

## Corriendo en Producción
Usar de referencia el repositorio [DemocracyOS/onpremises](https://github.com/DemocracyOS/onpremises). Utiliza Ansible para el aprovisionamiento, y Docker Compose para correr el servidor.
