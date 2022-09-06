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
## Librerías fhe
## Aplicación para voto de día en el que quedar
- https://github.com/josejuanmontiel/lattigo-polls-demo

## Gopls y los monorepos (con VSCode y muchos módulos Bazel y uno solo go.mod)
Cuando tu proyecto es un monorepo gigante, todo empieza a ralentizarse ¿por que?. La idea es tratar como se comporta el IDE (que en el caso de GoLang) suele delegar en Gopls.

- ¿que hace Gopls cuando escanea un monorepo? 
- ¿como se parametriza el ide para ese escaneo?
- Si ademas el proyecto usa Bazel como se comporta el deamon ante los cambios que hace el IDE/¿gopls?
- ¿Que integracion LSP/Gopls tiene bazel daemon con VSCode?