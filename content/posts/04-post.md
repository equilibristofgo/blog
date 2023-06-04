---
title: "Fourth Lightning Talk"
date: 2030-01-01T19:00:00+02:00
draft: true
---

# Temas a tratar en la cuarta sesión

## Mutex
En golang existe el patron CSP que facilita mucho la concurrencia, pero de el hablaremos otro dia, hoy simplemente nos quedamos con los mutex, que nos permiten sincronizar bloques de codigo usando objetos que permiten el bloqueo de lectura o lectura/escritura.
...

### Ejemplos de código 
- La idea de estos ejemplos, es ver como con un ejemplo de codigo simplificado podemos pasar de:
    - La necesidad de sincronizar el acceso a variables comunes, descubierto por unos test unitarios, corridos para detectar "race condition"
    - ...
    - Ha como se puede reorganizar el codigo para dejar de usar los mutex y pasar al enfoque CSP.
    - Puedes ver la evolucion [aqui](https://github.com/equilibristofgo/sandbox/tree/feat/mutex_example/05_race_condition)

## Transaccionalidad de operaciones
Si en un proyecto tienes microservicios de orquestación que por ejemplo actualizan datos en dos bases de datos, cada una de un micro distinto? Si quieres garantizar la coherencia de datos entre esas dos bases de datos. Si la primera llamada al micro1 va bien y la Segunda falla al micro2 que haces con los datos del micro1.. la pregunta de siempre jaja

https://github.com/seata/seata-go
https://cadenceworkflow.io/docs/get-started/golang-hello-world/

### Injeccion de dependencias
https://pkg.go.dev/go.uber.org/fxLibreria 

## Ebiten
https://ebiten.org/
