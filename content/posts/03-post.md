---
title: "Third Lightning Talk"
date: 2022-10-04T19:00:00+02:00
draft: true
---

# Temas a tratar en la tercera sesión

## Concurrencia
- Aportaciones al repo (original)
    - https://github.com/josejuanmontiel/go-concurrency-patterns

## Testing api rest
- https://github.com/intercloud/venom/tree/executor-tavern/executors/tavern
- Repasar de la libreria de http la parte de mockear las llamadas...
    -  https://github.com/friendsofgo/killgrave 

## Paquetería interna
- https://stackoverflow.com/questions/59342373/use-of-internal-package-not-allowed
    - https://go.dev/doc/go1.4#internalpackages
    - https://pkg.go.dev/cmd/go#hdr-Internal_Directories
-  https://www.practical-go-lessons.com/chap-11-packages-and-imports#the-internal-directory
- [Codigo de ejemplo](https://github.com/equilibristofgo/sandbox/tree/main/04_internal/app)

## Visibilidades dentro y fuera de un paquete
    t.Run(tt.name, func(t *testing.T) {
        h := serverHttp.ExampleStruct{
            Visible: "",
            appServices: nil,
            logger:      tt.fields.logger,
        }   
