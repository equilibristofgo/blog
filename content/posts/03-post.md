---
title: "Third Lightning Talk"
date: 2023-04-11T19:00:00+02:00
---

# Temas a tratar en la tercera sesión

## Mutex
En golang existe el patron CSP que facilita mucho la concurrencia, pero de el hablaremos otro dia, hoy simplemente nos quedamos con los mutex, que nos permiten sincronizar bloques de codigo usando objetos que permiten el bloqueo de lectura o lectura/escritura.

...

### Ejemplos de código 
- La idea de estos ejemplos, es ver como con un ejemplo de codigo simplificado podemos pasar de:
    - La necesidad de sincronizar el acceso a variables comunes, descubierto por unos test unitarios, corridos para detectar "race ocndition"
    - ...
    - Ha como se puede reorganizar el codigo para dejar de usar los mutex y pasar al enfoque CSP.
    - Puedes ver la evolucion [aqui](https://github.com/equilibristofgo/sandbox/tree/feat/mutex_example/05_race_condition)

## Testing api rest
Golang tiene bien integrado en sus bases el mundo del testing, y para test de APIS rest, existe una utilidad para poder moquear los servidores de tal forma que podamos probar facilmente esas apis.

Como ejemplo de proxy, realizado por la comunidad, tenemos a parte de los clasicos... a Killgrave.

- Links a organizar
    - https://github.com/intercloud/venom/tree/executor-tavern/executors/tavern
    - https://github.com/friendsofgo/killgrave 

### Ejemplos de código 
- [Aqui]()

## Paquetería interna no exportable en go
Aqui el tema esta, no solo para atributos sino paquetes enteros.

- Links a organizar
    - https://stackoverflow.com/questions/59342373/use-of-internal-package-not-allowed
        - https://go.dev/doc/go1.4#internalpackages
        - https://pkg.go.dev/cmd/go#hdr-Internal_Directories
    -  https://www.practical-go-lessons.com/chap-11-packages-and-imports#the-internal-directory

### Ejemplos de código 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/04_internal/app)

## Introducción a cgo
Como podemos compilar nativo o para webassembly... y ademas como podemos compilar en linux para windows (o viceversa)

- Links a organizar
    - https://dh1tw.de/2019/12/cross-compiling-golang-cgo-projects/
    - https://go.dev/blog/cgo 
    - https://rotemtam.com/2020/10/30/bazel-building-cgo-bindings/ 
    - https://freshman.tech/snippets/go/cross-compile-go-programs/
    - https://blog.modest-destiny.com/posts/building-golang-cgo-with-bazel/
    - https://egghead.io/lessons/go-configure-go-build-constraints-in-vs-code-to-work-with-webassembly
    - https://github.com/AlekSi/cgo-by-example/blob/master/main.go
    - https://riptutorial.com/go/example/21315/cgo--first-steps-tutorial
    - https://stackoverflow.com/questions/16931700/is-it-possible-to-use-environment-variables-in-a-cgo-cflags-comment
    - https://www.ardanlabs.com/blog/2013/08/using-cgo-with-pkg-config-and-custom.html
    - https://zchee.github.io/golang-wiki/cgo/
    - https://dave.cheney.net/2013/10/12/how-to-use-conditional-compilation-with-the-go-build-tool
    - https://www.digitalocean.com/community/tutorials/customizing-go-binaries-with-build-tags-es
    - https://www.digitalocean.com/community/tutorials/building-go-applications-for-different-operating-systems-and-architectures-es
    - https://blog.marlin.org/cgo-referencing-c-library-in-go
    - https://kofo.dev/build-tags-in-golang
    - https://pkg.go.dev/cmd/cgo
    - https://dh1tw.de/2019/12/cross-compiling-golang-cgo-projects/
    - https://stackoverflow.com/questions/54048688/compiling-cgo-files-in-golang-package
    - https://github.com/golang/net/blob/master/nettest/nettest_windows.go
    - https://github.com/rogchap/networking/blob/master/02/digger.go
    - https://pkg.go.dev/golang.org/x/sys/windows
    - https://zetcode.com/golang/socket/
    - https://stackoverflow.com/questions/42475093/go-raw-winsock
    - https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/WinSock/windows-sockets-1-1-blocking-routines-and-einprogress-2.md
    - https://medium.com/a-journey-with-go/go-builds-linkers-timeline-b312084ddf7d

    - https://blog.modest-destiny.com/posts/building-golang-cgo-with-bazel/

### Ejemplos de código 
- [Aqui]()