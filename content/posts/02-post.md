---
title: "Second Lightning Talk"
date: 2022-09-27T19:00:00+02:00
draft: true
---

# Temas a tratar en la segunda sesión

## Uso del contexto

- Links a organizar...
    - https://www.digitalocean.com/community/tutorials/how-to-use-contexts-in-go
    - https://stackoverflow.com/questions/40379960/context-withvalue-how-to-add-several-key-value-pairs
    - https://dev.to/gopher/getting-started-with-go-context-l7g
    - https://www.calhoun.io/pitfalls-of-context-values-and-how-to-avoid-or-mitigate-them/

## Interface en struct y extensión de clases

- Links a organizar
    - https://www.talkgolang.com/2021/05/08/extend-packages/
    - https://eli.thegreenplace.net/2020/embedding-in-go-part-3-interfaces-in-structs/

## Introducción a cgo
TemasCompilacion cruzada windows desde linux con cgo
https://dh1tw.de/2019/12/cross-compiling-golang-cgo-projects/
https://go.dev/blog/cgo 
https://rotemtam.com/2020/10/30/bazel-building-cgo-bindings/ 
https://freshman.tech/snippets/go/cross-compile-go-programs/
https://blog.modest-destiny.com/posts/building-golang-cgo-with-bazel/
https://egghead.io/lessons/go-configure-go-build-constraints-in-vs-code-to-work-with-webassembly
https://github.com/AlekSi/cgo-by-example/blob/master/main.go
https://riptutorial.com/go/example/21315/cgo--first-steps-tutorial
https://stackoverflow.com/questions/16931700/is-it-possible-to-use-environment-variables-in-a-cgo-cflags-comment
https://www.ardanlabs.com/blog/2013/08/using-cgo-with-pkg-config-and-custom.html
https://zchee.github.io/golang-wiki/cgo/
https://dave.cheney.net/2013/10/12/how-to-use-conditional-compilation-with-the-go-build-tool
https://www.digitalocean.com/community/tutorials/customizing-go-binaries-with-build-tags-es
https://www.digitalocean.com/community/tutorials/building-go-applications-for-different-operating-systems-and-architectures-es
https://blog.marlin.org/cgo-referencing-c-library-in-go
https://kofo.dev/build-tags-in-golang
https://pkg.go.dev/cmd/cgo
https://dh1tw.de/2019/12/cross-compiling-golang-cgo-projects/
https://stackoverflow.com/questions/54048688/compiling-cgo-files-in-golang-package
https://github.com/golang/net/blob/master/nettest/nettest_windows.go
https://github.com/rogchap/networking/blob/master/02/digger.go
https://pkg.go.dev/golang.org/x/sys/windows
https://zetcode.com/golang/socket/
https://stackoverflow.com/questions/42475093/go-raw-winsock
https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/WinSock/windows-sockets-1-1-blocking-routines-and-einprogress-2.md
https://medium.com/a-journey-with-go/go-builds-linkers-timeline-b312084ddf7d


## Librerías fhe
## Aplicación para voto de día en el que quedar
- https://github.com/josejuanmontiel/lattigo-polls-demo

## Gopls y los monorepos (con VSCode y muchos módulos Bazel y uno solo go.mod)
Cuando tu proyecto es un monorepo gigante, todo empieza a ralentizarse ¿por que?. La idea es tratar como se comporta el IDE (que en el caso de GoLang) suele delegar en Gopls.

- ¿que hace Gopls cuando escanea un monorepo? 
- ¿como se parametriza el ide para ese escaneo?
- Si ademas el proyecto usa Bazel como se comporta el deamon ante los cambios que hace el IDE/¿gopls?
- ¿Que integracion LSP/Gopls tiene bazel daemon con VSCode?

https://microsoft.github.io/language-server-protocol/
https://github.com/golang/tools/tree/master/gopls
https://github.com/bazelbuild/rules_go/wiki/Editor-setup
https://github.com/bazelbuild/rules_go/wiki/Editor-and-tool-integration
https://github.com/golang/tools/blob/master/gopls/doc/workspace.md
https://stackoverflow.com/questions/55411277/how-can-i-setup-vscode-for-go-project-built-with-bazel
