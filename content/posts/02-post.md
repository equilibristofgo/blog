---
title: "Second Lightning Talk"
date: 2023-04-25T19:00:00+02:00
---

# Temas a tratar en la segunda sesión

## Interface en struct y extensión de clases
En el mundo clásico de la orientación a objetos, por ejemplo en Java, una interfaz define los métodos de una clase que se deben implementar para cumplir con esa interfaz. Y si una clase extiende a otra, esta hereda los métodos que tenga implementados la clase padre.

En Golang, si un struct (clase) implementa (entre otros) los métodos de una interfaz, entonces podemos usar ese struct allá donde la interfaz, pero si añadimos la interfaz dentro del struct, entonces de alguna manera extendemos ademas las implementaciones de la interfaz que hemos añadido.

Links
[Embedding in go (part 3) Interfaces in structs](https://eli.thegreenplace.net/2020/embedding-in-go-part-3-interfaces-in-structs/)
[Extend packages](https://www.talkgolang.com/2021/05/08/extend-packages/)
[Explicacion de como funciona la libreria de ordenacion](https://yourbasic.org/golang/how-to-sort-in-go/)

### Ejemplos de código 
- [Aquí](https://github.com/equilibristofgo/sandbox/tree/main/07_embedding_interface/README.md)

## Uso del contexto
En Golang, la manera de poder compartir valores a lo largo del proceso, y que distintos hilos no mezclen valores es el uso del contexto.

En Java, por ejemplo, tenemos el ThreadLocal un objeto que la JVM nos proporciona durante el flujo de ejecución para albergar esos valores.

En el caso de Go, el objeto esta preparado para que sea "thread-safe" y de alguna manera se apilan los valores que se van guardando.

Algunos links de interés.
[Tutorial básico del uso del contexto](https://www.digitalocean.com/community/tutorials/how-to-use-contexts-in-go)
[¿Como almacenar mas de una clave?](https://stackoverflow.com/questions/40379960/context-withvalue-how-to-add-several-key-value-pairs) recordar que el objeto context solo admite una clave...
```
context.WithValue(ctx, "key", "test-value")
```
por tanto si queremos almacenar mas de una... debemos aprovechar almacenar estructuras que permitan una información estructurada.
[Mas tutoriales](https://dev.to/gopher/getting-started-with-go-context-l7g)
[Algunas notas generales](https://www.calhoun.io/pitfalls-of-context-values-and-how-to-avoid-or-mitigate-them/)

### Ejemplos de código 
- [Aquí](https://github.com/equilibristofgo/sandbox/tree/main/06_context/README.md) donde veremos
    - Un ejemplo sencillo de como se almacenan y se estraen los elementos del contexto, a partir de ahi podemos usar el contexto como parametro entre metodos para hacerlo viajar asegurando su consistencia.
    - En el segundo ejemplo, vemos como podemos extender un contexto en otro, y acceder al contexto nativo a traves de otras implementaciones (a parte de ver como implementar un middleware proxy).

## Visibilidades dentro y fuera de un paquete para los atributos
Basicamente la regla se resume en, si esta en mayuscula ... es visible, pero sino, no... y eso aplica a todo, metodos, atributos...

```
    t.Run(tt.name, func(t *testing.T) {
        h := serverHttp.ExampleStruct{
            Visible: "",
            appServices: nil,
            logger:      tt.fields.logger,
        }
```
esta bien recordarlo a la hora de construir tus estructuras y metodos visibles de un paquete, porque a veces te olvidas y dices... ¿porque no veo tal atributo? ... y esto aplica cuando el objeto se serializa...

[Aqui](https://www.digitalocean.com/community/tutorials/understanding-package-visibility-in-go) puedes ver un pequeño tutorial.

### Ejemplos de código 
- [Aquí]()


## Introducción a cgo y webassembly
En este punto, vamos a hacer un repaso por distintas características del lenguaje que lo hacen diferente a otros, de como puede integrarse con otros lenguajes... incluyendo webassembly.

Empecemos con la idea de cross-compiler. Recuerdo cuando en mis inicios con Linux, me dio por instalarme Gentoo, y de como empezó la fiebre por la compilación, todo lo que se instalaba se tenia que compilar... también me dio por cacharrear con alguna placa de microcontroladores, y ahi apareció el tema de las toolchains, incluso como funcionaba el tema del multiarch en Debian. En estos casos, no era necesario compilar algo en la maquina que se iba a usar, si podías montar un entorno cross-compile ya lo tenias resuelto.

Pues en Golang, ya de fabrica, puedes compilar para distintas arquitecturas de una manera nativa, y [para el caso con el que empezamos](https://dh1tw.de/2019/12/cross-compiling-golang-cgo-projects/) incluso compilar para Windows desde Linux. [Alguna referencia mas](https://freshman.tech/snippets/go/cross-compile-go-programs/).

A partir de ahi, si cogemos [CGO](https://go.dev/blog/cgo) podríamos incluso mezclar distintos lenguajes "parecidos" como C y GO... en [este](https://blog.marlin.org/cgo-referencing-c-library-in-go) caso llamar desde GO a código C.

Aqui tendriamos un listado con mas ejemplos
- https://zchee.github.io/golang-wiki/cgo/
- https://riptutorial.com/go/example/21315/cgo--first-steps-tutorial
- https://github.com/AlekSi/cgo-by-example/blob/master/main.go

Ahora bien, que tu codigo este preparado para poder compilar en distintas arquitecturas, quiza requiera que distintas partes de ese codigo usen cosas especificas para ese sistema (y que en el otro, no puedan ser compiladas). Para solucionar esta casusisticas de inclusion condicional, aparence los tags de compilacion.
- https://kofo.dev/build-tags-in-golang
- https://www.digitalocean.com/community/tutorials/customizing-go-binaries-with-build-tags-es
- https://www.ardanlabs.com/blog/2013/08/using-cgo-with-pkg-config-and-custom.html
- https://dave.cheney.net/2013/10/12/how-to-use-conditional-compilation-with-the-go-build-tool

Una casusistica donde esto suele pasar es en la gestion avanzada de red, como por ejemplo el [netpoll](https://www.sobyte.net/post/2021-09/golang-netpoll/) pues si solo ciertas librerias funcionan en windows, entonces usaremos los tags para que compilen esa parte...

### Bola extra. Webassembly
Solo comentar que otro lenguaje que podemos generar [desde Go es Webassembly](https://github.com/golang/go/wiki/WebAssembly#getting-started) Y mas adelante veremos [como usarlo](https://egghead.io/lessons/go-configure-go-build-constraints-in-vs-code-to-work-with-webassembly)

### Ejemplos de código 
- En [este](https://github.com/equilibristofgo/sandbox/tree/main/09_cgo/README.md) ejemplo veremos como 
relacionar el codigo go con c y viceversa.

## Breves

### code generator
La generación de código (antes claro esta de la aparición de ChatGPT) siempre ha sido una opción para ciertas casuísticas, y tampoco tiene que ser mal mirado, puedes necesitar repetir ciertos soluciones en distintos lugares, por distintos motivos...

- [A Yeoman Generator to Scaffold Golang-project](https://morioh.com/p/90906ca5c28e) Yeoman es una solución para generar proyectos de código completo siguiendo plantillas, como Helm para generar deployments en Kubernetes.
- [Is a scaffolding generator that will produce basic CRUD project complete with server and client code based on script input](https://github.com/mirzaakhena/zapp)
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen) Bajo el mismo concepto que dada una especificación de una api se construyen un cliente/servidor... pues [esta](https://goswagger.io/generate/client.html) es la que lo genera en GoLang.
- [Este enfoque quizas cambia un poco las ideas](https://github.com/awalterschulze/goderive)

### ides en go
- [editor](https://github.com/jmigpin/editor)
- [fynedesk no es un ide, pero es interesante](https://github.com/fyne-io/fynedesk)
- [Source code editor in pure Go](https://github.com/jmigpin/editor)
- [micro is a terminal-based text editor that aims to be easy to use and intuitive](https://github.com/zyedidia/micro)
- [It’s about 1000 lines of go code for an editor](https://github.com/bediger4000/kilo-in-go/blob/master/kilo.go)
- [Discontinued??? - Frontend & Backend editor concept](https://github.com/limetext/lime)
- [Discontinued - Stretto is a text-based editor halfway between modal editors such as Emacs or Vim, and user-friendly ones such as Atom or SublimeText.](https://github.com/stretto-editor/stretto)
- Clasicos - Emacs
    - [emacs-lsp-go](https://geeksocket.in/posts/emacs-lsp-go/)
    - [emacs tour](https://dr-knz.net/a-tour-of-emacs-as-go-editor.html)
