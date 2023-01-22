---
title: "Livekit and Telegram Bot"
date: 2022-10-12T19:00:00+02:00
---

# Livekit and Telegram Bot

## Livekit

Hace ya bastante tiempo se definio un estandar [WebRTC](https://webrtc.org/) y haciendo uso de ese estandar aparece [Livekit](https://docs.livekit.io/guides/how-it-works/) que haciendo uso de la estupenda librearia [Pion WebRTC](https://github.com/pion/webrtc).

Si una vez [instalado](https://docs.livekit.io/guides/getting-started/) arrancamos con la [configuracion](https://docs.livekit.io/deploy/)

Basicamente queda

    livekit-server --dev --config config-sample.yml

Y la configuracion deberia ser

    port: 7880
    rtc:
        port_range_start: 50000
        port_range_end: 50100
        tcp_port: 7881
        use_external_ip: true
    keys:
        devkey: secret

Hay que tener en cuenta, que la comunicacion se hace usando [websocket](https://blog.friendsofgo.tech/posts/introduccion-a-los-websockets-en-go/) por lo que para exponer el puerto 7880 desde un servidor al exterior debemos usar un proxy reverso.

Si nos centramos en apache tenemos varias ([una](https://www.serverlab.ca/tutorials/linux/web-servers-linux/how-to-reverse-proxy-websockets-with-apache-2-4/), [dos](https://kevingimbel.de/blog/2021/06/proxy-websocket-connections-with-apache2/) y [tres](https://gist.github.com/mortenege/91ec6fe02dca6f736303a00f8cea2731) opciones de configuracion... y deberia quedar algo asi

    <VirtualHost *:443>
        ServerName livekit.domain.com
        SSLEngine On

        RewriteEngine On
        RewriteCond %{HTTP:Upgrade} websocket [NC]
        RewriteCond %{HTTP:Connection} upgrade [NC]
        RewriteRule ^/?(.*) "ws://127.0.0.1:7880/$1" [P,L]

        ProxyPreserveHost On
        ProxyPass / ws://127.0.0.1:7880/
        ProxyPassReverse / ws://127.0.0.1:7800/
        ProxyRequests off

        DocumentRoot /var/www/domain/livekit
        DirectoryIndex index.html

        ErrorLog /var/log/apache2/error-livekit-domain.log
        CustomLog /var/log/apache2/access-livekit-domain.log combined

        Header always set Access-Control-Allow-Origin "*"
        Header always set Access-Control-Allow-Headers "Authorization"
        Header always set Access-Control-Allow-Methods "GET"
        Header always set Access-Control-Expose-Headers "Content-Security-Policy, Location"
        Header always set Access-Control-Max-Age "600"

        SSLCertificateFile /etc/letsencrypt/live/livekit.domain.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/livekit.domain.com/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf
    </VirtualHost>

y esto incluye los certificados ssl para securizarlo... porque, a parte de hacer un mapeo de puertos al exterior (en el ejemplo 7881 y 7882, no estoy 100% seguro pero si que seguro los 50000-50100) al estilo de como cuentan [aqui](https://docs.livekit.io/deploy/ports-firewall/#firewall)

Una vez configurada la parte servidora, tenemos que montar un [frontal](https://github.com/livekit/livekit-react/tree/master/example)

Com bola extra, estaria preparado para usar TURN (resumido, averiguar tu IP)... en [este articulo](https://bloggeek.me/webrtc-turn/) cuentan de que van los [turn server](https://webrtc.org/getting-started/turn-server)

## Telegram Bot

Para montar un bot de telegram en Go, hay [muchas](https://core.telegram.org/bots/samples#go) opciones disponibles.

Una de las mas interesantes es esta con [go-telegram-bot-api](https://go-telegram-bot-api.dev/) que deja todo el tratamiento [muy conciso](https://github.com/go-telegram-bot-api/telegram-bot-api#example)

Otras opciones pueden ser [esta](https://github.com/tucnak/telebot) y [esta](https://github.com/fpaupier/telegrap) que tiene una explicacion [muy detallada](https://medium.com/swlh/build-a-telegram-bot-in-go-in-9-minutes-e06ad38acef1) incluso detalla la parte del despliegue del [webhook](https://core.telegram.org/bots/webhooks#the-longer-version)

Ah, por cierto, la primera opcion de codigo... hace pooling, con lo que no necesitas exponer un webhook como tal, en la segunda describen como hacer con la parte del webhook.

Lo que me ha llevado a descubrir un par de "webhook" interesantes
* [Este](https://github.com/voxpupuli/webhook-go)
* Y [este otro](https://httpd.apache.org/docs/2.4/developer/hooks.html)
son cosas para investigar.

El bot, simplemente recibe el comando y hace uso del codigo de [livekit-cli](https://github.com/livekit/livekit-cli) para generar un token valido, y construye una url de conexion con los datos necesarios para conectarse al livekit.

### Ejemplos de código 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/08_telegram/README.md)

    Respecto al codigo, es muy basico... usa variables de entorno para el token de Telegram y para la key y la secret de Livekit.

## Obs Broadcaster
Y finalmente para la grabacion de todo el conjunto, la mejor herramienta es [OBS Studio](https://obsproject.com/)

### Plugins
https://medium.com/@mhatrep/remove-video-background-without-a-green-screen-in-obs-studio-f73735b40c65
https://github.com/royshil/obs-backgroundremoval#linux
https://github.com/royshil/obs-backgroundremoval/releases/tag/v0.3.0-beta
    tar --use-compress-program=unzstd -xvf archive.tar.zst

## Bonus - Livekit - Egress
Como bonus, podemos ver como realizar la grabacion de las sesiones desde la parte servidora (el tipico boton de grabar la sesion)

La parte de "performance" se puede testear con el [cli](https://github.com/livekit/livekit-cli)

$ livekit-cli create-token --api-key devkey --api-secret secret --join --room my-first-room --identity user1 --valid-for 24h

$ livekit-cli load-test --api-key devkey --api-secret secret --room my-first-room --publishers 8
$ livekit-cli load-test --api-key devkey --api-secret secret --room my-first-room --subscribers 8

Con esta opcion (y otras que se comentan) se pueden publicar videos (u otras fuentes...)
$ livekit-cli join-room --room yourroom --identity publisher \
  --publish path/to/video.ivf \
  --publish path/to/audio.ogg \
  --fps 23.98


### Sobre la configuracion y envio de clips de video...
https://livekit-users.slack.com/archives/C01KVTJH6BX/p1667980507127079?thread_ts=1667388123.288739&cid=C01KVTJH6BX


Y ahora la parte especifica de [grabar](https://github.com/livekit/livekit-cli#recording--egress): start room composite (recording of room UI)
$ livekit-cli start-room-composite-egress --request request.json

{
  "room_name": "my-room",
  "track_id": "TR_XXXXXXXXXXXX",
  "websocket_url": "wss://my-service.com"
}

La parte de instalacion de [egress](https://docs.livekit.io/guides/egress/) [indica](https://docs.livekit.io/deploy/egress/) que se debe desplegar el [codigo](https://github.com/livekit/egress) que [antiguamente](https://github.com/livekit/livekit-recorder), con esta [configuracion](https://github.com/livekit/egress/blob/main/test/config-sample.yaml)

Ejecucion en [local](https://docs.livekit.io/deploy/egress/#running-locally)

    log_level: debug
    api_key: your-api-key
    api_secret: your-api-secret
    ws_url: ws://192.168.65.2:7880
    insecure: true
    redis:
    address: 192.168.65.2:6379

Para lo que se necesita un [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-linux/) con una [configuracion](https://redis.io/docs/manual/config/) minima de de por ejemplo [256mb](https://blog.armesto.net/limitar-memoria-maxima-de-redis/)

## Grabacion de la sesion
...
- https://www.youtube.com/...
- https://www.ivoox.com/...