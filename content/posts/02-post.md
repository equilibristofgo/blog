---
title: "Second Lightning Talk"
date: 2022-10-12T19:00:00+02:00
---

# Temas a tratar en la segunda sesión

## Uso del contexto
En Golang, la manera de poder compartir valores a lo largo del proceso, y que distintos hilos no mezclen valores es el uso del contexto.

En Java, por ejemplo, tenemos el ThreadLocal un objeto qeu la JVM nos proporciona durante el flujo de ejecución para albergar esos valores.

En el caso de Go, el objeto esta preparado para que sea "thread-safe" y de alguna manera se apilan los valores que se van guardando.

- Links a organizar...
    - https://www.digitalocean.com/community/tutorials/how-to-use-contexts-in-go
    - https://stackoverflow.com/questions/40379960/context-withvalue-how-to-add-several-key-value-pairs
    - https://dev.to/gopher/getting-started-with-go-context-l7g
    - https://www.calhoun.io/pitfalls-of-context-values-and-how-to-avoid-or-mitigate-them/

### Ejemplos de código 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/06_context/README.md)

## Interface en struct y extensión de clases
En el mundo clásico de la orientación a objetos, por ejemplo en Java, una interfaz define los métodos de una clase que se deben implementar para cumplir con esa interfaz. Y si una clase extiende a otra, esta hereda los métodos que tenga implementados la clase padre.

En Golang, si un struct (clase) implementa (entre otros) los métodos de una interfaz, entonces podemos usar ese struct allá donde la interfaz, pero si añadimos la interfaz dentro del struct, entonces de alguna manera extendemos ademas las implementaciones de la interfaz que hemos añadido.

- Links a organizar
    - https://eli.thegreenplace.net/2020/embedding-in-go-part-3-interfaces-in-structs/
    - https://www.talkgolang.com/2021/05/08/extend-packages/

### Ejemplos de código 
- [Aqui](https://github.com/equilibristofgo/sandbox/tree/main/07_embedding_interface/README.md)

## Visibilidades dentro y fuera de un paquete para los atributos
- La cuestión aqui esta en que atributos de una clase son privados o públicos

    t.Run(tt.name, func(t *testing.T) {
        h := serverHttp.ExampleStruct{
            Visible: "",
            appServices: nil,
            logger:      tt.fields.logger,
        }

### Ejemplos de código 
- [Aqui]()

## Gopls y los monorepos (con VSCode y muchos módulos Bazel y uno solo go.mod)
Cuando tu proyecto es un monorepo gigante, todo empieza a ralentizarse ¿por que?. La idea es tratar como se comporta el IDE (que en el caso de GoLang) suele delegar en Gopls.

- ¿que hace Gopls cuando escanea un monorepo? 
- ¿como se parametriza el ide para ese escaneo?
- Si ademas el proyecto usa Bazel como se comporta el deamon ante los cambios que hace el IDE/¿gopls?
- ¿Que integracion LSP/Gopls tiene bazel daemon con VSCode?

- Links a organizar
    - https://microsoft.github.io/language-server-protocol/
    - https://github.com/golang/tools/tree/master/gopls
    - https://github.com/bazelbuild/rules_go/wiki/Editor-setup
    - https://github.com/bazelbuild/rules_go/wiki/Editor-and-tool-integration
    - https://github.com/golang/tools/blob/master/gopls/doc/workspace.md
    - https://stackoverflow.com/questions/55411277/how-can-i-setup-vscode-for-go-project-built-with-bazel

### Ejemplos de código 
- [Aqui]()

## Breves

### code generator
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen)
- [https://morioh.com/p/90906ca5c28e]()
- [https://github.com/mirzaakhena/zapp]()

### ides en go
- [editor](https://github.com/jmigpin/editor)
- [fynedesk no es un ide, pero es interesante](https://github.com/fyne-io/fynedesk)