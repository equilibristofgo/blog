---
title: "1º PRs"
date: 2023-02-28T19:00:00+02:00
draft: true
---

# Temas a desarrollar en las PRs

## Gnet
Compatibilidad con windows
https://github.com/panjf2000/gnet/issues/339#issuecomment-1112291076
https://github.com/panjf2000/gnet/compare/dev...josejuanmontiel:gnet:interface_refactor

Ejemplos de red en windows...
    - https://github.com/golang/net/blob/master/nettest/nettest_windows.go
    - https://github.com/rogchap/networking/blob/master/02/digger.go
    - https://pkg.go.dev/golang.org/x/sys/windows
    - https://zetcode.com/golang/socket/
    - https://stackoverflow.com/questions/42475093/go-raw-winsock
    - https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/WinSock/windows-sockets-1-1-blocking-routines-and-einprogress-2.md
    - https://medium.com/a-journey-with-go/go-builds-linkers-timeline-b312084ddf7d

## kala
actualizar rama para dejar preparado el del liveness... 
descargar de otro mail las cosas y guardar para mirar... en drive… 
Retomar concurrencia kala y tambien la parte de lanzar el git bisect con el sh...

## csvq-driver ... 
aumentar el tamaño del "batch" en los test ... 
echarle un vistazo a los videos de yacc, y entender como conecta el driver con el nativo para el envio de lineas y la conexion de las tx con el cierre del fichero

https://github.com/cespare/prettybench
https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go
https://go.dev/doc/database/execute-transactions

## sql-jobber ... 
terminar ejemplo de reload de ficheros de configuracion y sobre todo... sqls...
https://github.com/knadh/sql-jobber/issues/18
https://github.com/knadh/sql-jobber/issues/19
https://github.com/knadh/sql-jobber/issues/20
    https://github.com/remast/go-for-testcontainers/blob/main/user_repository_test.go
    
https://github.com/knadh/sql-jobber/issues/22

## sql-jobber ...
ejemplo de plugins (con wasm) viendo notas que comenta en la issue sobre plugins en go... 
y aprovechar para hacer un backend "fake" que escriba en csv a mano

## sql-jobber ... 
cuando responda a los issues ... terminar de darle una vuelta a los todos ... 
opciones de lectura en batch, poder configurar los commits de la tx en destino, tamaño de los batch configurable, desacoplar con channels, backend de csv a mano...

