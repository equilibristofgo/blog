---
title: "First Lightning Talk"
date: 2022-08-31T23:00:00+02:00
draft: true
---

# Temas a tratar en la primera sesión

## Test y las capas
La idea a tratar aquí es: bajo el punto de vista del testing en GoLang, testing unitario en el sentido que no levanta piezas auxiliares (de integración)

- ¿como se deben comportar los test con las distintas capas de tu proyecto (controller/service,onion,clean...)?
- ¿Deben los test intentar cruzar todas las capas?
- En caso de que no... ¿que pasa con la comunicación entre capas y la transformación de modelos (en los que los tengan diferenciados)?
- ¿Un test unitario, se considera unitario si recorre todas las capas?
- ¿Que dificultades plantean las capas? ¿transformaciones?

## Logs contextuales
Parece estar de moda que los logs sean "contextuales", vamos que los atributos no esten dentro de una linea [que tiempos aquellos donde parseabas la linea de log](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html) para evitarlo, ahora los logs se escriben el json, y asi es todo mas facil.

- ¿opción producción o development? 
- ¿trazas de excepción sin salto de linea (solo \n en texto?
- ¿linea del log?
- ¿fecha completa?
- ¿busqueda en google cloud?
- ¿cambia la manera de redactar el log por añadir los "parámetros" al contexto json?
- Impresion de parametros dentro de esos json [un ejemplo](https://golangbyexample.com/print-struct-variables-golang/) y [otro](https://gosamples.dev/print-struct-variables/)

- wrappers para logger que redirija la salida de unos a otros? Tipo los Bridge de slf4j?
    https://github.com/uber-go/zap/issues/654
    https://stackoverflow.com/questions/70512120/how-to-access-fields-in-zap-hooks

- Ejemplos de codigo [aqui](sanbox/01_bridge_logging/README.md)

## ¿Echo o chi? 
¿Tomcat o jetty? La idea a tratar aqui es como condiciona mi desarrollo la eleccion de un framework u otro.
- ¿En que se diferencian? 
- ¿A mis handlers (controller) les puede dar igual? 
- ¿Abstracción de framework web en GO? 
- ¿Contexto específico y add-ons? 
- ¿Middeleware intercambiables?
- Ejemplos de codigo [aqui](sanbox/02_echo_chi/README.md)

## Go mod con replace y dependencias "locales"... 
Si en mi proyecto tengo un go.mod con replace de unas librerías personalizadas...
- ¿Como debo montar el Dockerfile en relacion a eso?
    - https://www.codervlogger.com/dockerfile-for-a-go-project-with-mod-replace-directive/

## Breves

### code generator
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen)
- [https://morioh.com/p/90906ca5c28e]()
- [https://github.com/mirzaakhena/zapp]()

### ides en go
[editor](https://github.com/jmigpin/editor)
[fynedesk no es un ide, pero es interesante](https://github.com/fyne-io/fynedesk)