# Consulta Pública Argentina

Fork de la plataforma [DemocracyOS](https://github.com/DemocracyOS/democracyos) con modificaciones específicas para Gobierno Abierto de Argentina

## Para empezar

1. Asegurate tener instalado [Docker 1.13.0+](https://www.docker.com/).
2. Cloná este repositorio.
3. Copiá el archivo `docker-compose.override.yml.example` a `docker-compose.override.yml`, y agregá tu mail en la variable `STAFF`. De este modo vas a poder administrar el contenido. (**Edit 10/01/2019**: Revisar el apartado "Nota")
4. Empezá el servidor con `docker-compose up --build` _(la primera vez puede llevar un ratito)_
5. Navegá a [http://localhost:3000](http://localhost:3000)
6. Registrate, entrá, y podés empezar a crear contenido en http://localhost:3000/ajustes/administrar

#### ⚠️ NOTA - Variables de entorno para Mi Argentina

De acuerdo a los ultimos cambios implementados en el sprint para agregar el login con Mi Argentina, se agregan las siguientes variables de entorno. **Importante de agregar al ENV del docker-compose**

```
CUSTOM_SIGNIN=true
OIDC_ISSUER=
OIDC_AUTH=
OIDC_TOKEN=
OIDC_USER=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_CALLBACK=
```

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
* En el archivo `docker-compose.override.yml` podes configurar DemocracyOS con cualquiera de las variables de entorno listadas acá: http://docs.democracyos.org/configuration.html
* El puerto `27017` está expuesto para que puedas administrar la base de datos con algún cliente de MongoDB, por ejemplo con [Robomongo](https://robomongo.org/).
* Todas las vistas personalizadas para Consulta Pública se encuentran en [`/ext`](ext). Siguiendo el mismo patrón de carpetas que [DemocracyOS/democracyos](https://github.com/DemocracyOS/democracyos).

## Corriendo en Producción

Usar de referencia el repositorio [DemocracyOS/onpremises](https://github.com/DemocracyOS/onpremises). Utiliza Ansible para el aprovisionamiento, y Docker Compose para correr el servidor.

### Imagen de Docker

La imagen se encuentra en: https://hub.docker.com/r/datosgobar/democracyos/

Para buildear la imagen:
* `docker build . -t datosgobar/democracyos:latest`

Para subir la imagen:
* `docker push datosgobar/democracyos:latest`

Todo junto:
```
docker build . -t datosgobar/democracyos:latest && docker push datosgobar/democracyos:latest
```
