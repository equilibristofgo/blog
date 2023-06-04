---
title: "Third Lightning Talk"
date: 2023-06-02T19:00:00+02:00
draft: true
---

# Temas a tratar en la tercera sesión

## Paquetería interna no exportable en go
En la sesión anterior hablamos sobre la [visibilidad]({{< ref "02-post#visibilidad" >}}) de los atributos. En este bloque hablaremos sobre la visibilidad de paquetes enteros...

...para ello aprovecharemos a ver varios tipos de organizaciones clasiscas de paquetes, y como no podemos usar ciertos paquetes en otros...

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
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/12_gopls)



## Go Generate
En la sesion anterior estuvimos hablando de [Code Generator]({{< ref "02-post#code_generator" >}}) y vimos por encima algunas herramientas...

...veamos ahora una opcion nativa en go para generar codigo...

- Links a organizar
    - https://ehrt74.medium.com/go-generate-89b20a27f7f9

### Ejemplos de código 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/11_generate)



## Testing api rest
Golang tiene bien integrado en sus bases el mundo del testing, y para test de APIS rest, existe una utilidad para poder moquear los servidores de tal forma que podamos probar facilmente esas apis.

...Como ejemplo de proxy, realizado por la comunidad, tenemos a parte de los clasicos... a Killgrave.

- Links a organizar
    - https://github.com/intercloud/venom/tree/executor-tavern/executors/tavern
    - https://github.com/friendsofgo/killgrave 

### Ejemplos de código 
- [Aqui]()



## Breves

### sort
https://pkg.go.dev/sort#example-package-SortKeys


## Grabacion de la sesion
...
- [youtube]()
- [ivoox]()