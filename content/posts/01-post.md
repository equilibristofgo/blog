---
title: "First Lightning Talk"
date: 2022-09-13T19:00:00+02:00
---

# Temas a tratar en la primera sesión

## Test y las capas
La idea a tratar aquí es: bajo el punto de vista del testing en GoLang, testing unitario en el sentido que no levanta piezas auxiliares (de integración)

- ¿como se deben comportar los test con las distintas capas de tu proyecto (controller/service,onion,clean...)?
- ¿Deben los test intentar cruzar todas las capas?
- En caso de que no... ¿que pasa con la comunicación entre capas y la transformación de modelos (en los que los tengan diferenciados)?
- ¿Un test unitario, se considera unitario si recorre todas las capas?
- ¿Que dificultades plantean las capas? ¿transformaciones de modelos?

### Ejemplos de codigo 
* https://github.com/quii/learn-go-with-tests
    * https://quii.gitbook.io/learn-go-with-tests/

### Para tratar mas adelante... pero comentamos de pasada
* go test -race ¿como funciona por dentro?
    * Arranque de gorutines del test
    * Control de lectura concurrente de variables

* Idea: ¿Y si se pudieran encadenar test de alguna manera?
    * Como bien cuantan [aqui](https://stackoverflow.com/questions/59064256/is-it-possible-to-call-a-test-func-from-another-file-to-start-the-testing) los test estan pensados para estar junto a las clases que testean dentro de un paquete, y de alguna manera puede considerarse que la funciones de test, reciben una especie de contesto (t) que les prove de valores del ejecutor del los test.
    * Ademas, existen las suites... e incluso los test de benchmarl.
    * Pero que pasaria si la salida de un test, su estado se pudiera conectar en una especie de suite con otro test, que por si solo funcionara, pero si viniera la llamada de otro test trajera su contexto... como si fueran las llamadas entre capas.

## Logs contextuales
Parece estar de moda que los logs sean "contextuales", vamos que los atributos no esten dentro de una linea [que tiempos aquellos donde parseabas la linea de log](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html) para evitarlo, ahora los logs se escriben el json, y asi es todo mas facil.

- ¿opción producción o development? 
- ¿trazas de excepción sin salto de linea (solo \n en texto) en modo production, porque van dentro del json?
- ¿No se lleva imprimir la linea que genero el log? ¿Como sabemos donde buscar en codigo?... Cobra importancia los mensajes especificos.
- ¿Que pasa con fecha, solo hora, no añadimos dia?
- ¿busqueda en google cloud?
- ¿cambia la manera de redactar el log por añadir los "parámetros" al contexto json?

### Ejemplos de codigo 
- Impresión de parámetros dentro de esos json [un ejemplo](https://golangbyexample.com/print-struct-variables-golang/) y [otro](https://gosamples.dev/print-struct-variables/)

- ¿wrappers para logger que redirija la salida de unos a otros? Tipo los Bridge de slf4j
    - En estas libreria [zap](https://github.com/uber-go/zap/issues/654) y [aqui](https://stackoverflow.com/questions/70512120/how-to-access-fields-in-zap-hooks) y tratan el tema, merece la pena echarle un vistazo. 

- Ejemplos de codigo [aqui](https://github.com/equilibristofgo/sandbox/tree/main/01_bridge_logging/README.md)
    - En el ejemplo se escriben varias lineas de codigo usando dos librerias, y se intenta con los mecanismo que se proveen en este caso en zap... le añadimos un encoder que imprimer los logs en zerolog.

## ¿Echo o chi? 
- ¿Tomcat o jetty? La idea a tratar aqui es como condiciona mi desarrollo la eleccion de un framework u otro.
    - El otro dia con [estas](https://youtu.be/JDRPfIlNqEs) conferencias, y debo admitir que me sono a que iban a implementar un servidor estandarizado en go, pero la idea de la mini-charla era explicar porque no usar frameworks al inicio de un proyecto.
- Podriamos preguntarnos ¿En que se diferencian los distintos framework?
    - Aqui podemos ver una [comparativas](https://github.com/CoderVlogger/go-web-frameworks) sobre frameworks implementando las mismas funcionalidades en distintos frameworks.
- Pero si pensamos en los handlers, que es un concepto "vanilla" de go... ¿A mis handlers (controller) les puede dar igual el framework que elija? 
- ¿Existe una abstracción de framework web en GO? Seria el estandar, pero... que pasa con los objetos (de contexto por ejemplo) especificos del framework. 
- ¿Contexto específico y add-ons? 
- ¿Middeleware intercambiables?

### Ejemplos de codigo
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/02_echo_chi/README.md)
- Las redes [batalla de frameworks](https://twitter.com/preslavrachev/status/1557739724286349312)

## Go mod con replace y dependencias "locales"... 
- Si en mi proyecto tengo un go.mod con replace de unas librerías privadas... ¿Como debo montar el Dockerfile en relacion a eso?
- En [este](https://www.codervlogger.com/dockerfile-for-a-go-project-with-mod-replace-directive/) hay un par de videos que lo explican muy bien.
- Basicamente la clave esta en vendorizar durante el proceso de build de docker. Habria otras maneras de enfocarlo ¿cuales se os ocurren?

### Ejemplos de codigo 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/03_mod_replace/README.md)

### Para tratar mas adelante... pero comentamos de pasada
https://github.com/chris-crone/containerized-go-dev

## Breves

### code generator
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen)
- [https://morioh.com/p/90906ca5c28e]()
- [https://github.com/mirzaakhena/zapp]()

### ides en go
[editor](https://github.com/jmigpin/editor)
[fynedesk no es un ide, pero es interesante](https://github.com/fyne-io/fynedesk)