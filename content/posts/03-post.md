---
title: "Third Lightning Talk"
date: 2030-01-01T19:00:00+02:00
draft: true
---

# Temas a tratar en la tercera sesión

## Mutex
En golang existe el patron CSP que facilita mucho la concurrencia, pero de el hablaremos otro dia, hoy simplemente nos quedamos con los mutex, que nos permiten sincronizar bloques de codigo usando objetos que permiten el bloqueo de lectura o lectura/escritura.

...

### Ejemplos de código 
- La idea de estos ejemplos, es ver como con un ejemplo de codigo simplificado podemos pasar de:
    - La necesidad de sincronizar el acceso a variables comunes, descubierto por unos test unitarios, corridos para detectar "race condition"
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

## Gopls y los monorepos (con VSCode y muchos módulos Bazel y uno solo go.mod)
Cuando tu proyecto es un monorepo gigante, todo empieza a ralentizarse ¿por que?. La idea es tratar de ver como se comporta el IDE (que en el caso de GoLang) suele delegar en Gopls.

- ¿que hace Gopls cuando escanea un monorepo? 
- ¿como se parametriza el ide para ese escaneo?
- Si ademas el proyecto usa Bazel como se comporta el daemon ante los cambios que hace el IDE/¿gopls?
- ¿Que integración LSP/Gopls tiene Bazel daemon con VSCode?

- Links a organizar
    - https://microsoft.github.io/language-server-protocol/
    - https://github.com/golang/tools/tree/master/gopls
    - https://github.com/bazelbuild/rules_go/wiki/Editor-setup
    - https://github.com/bazelbuild/rules_go/wiki/Editor-and-tool-integration
    - https://github.com/golang/tools/blob/master/gopls/doc/workspace.md
    - https://stackoverflow.com/questions/55411277/how-can-i-setup-vscode-for-go-project-built-with-bazel

### Ejemplos de código 
- [Aqui]()