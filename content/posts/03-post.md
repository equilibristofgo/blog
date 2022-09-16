---
title: "Third Lightning Talk"
date: 2022-10-11T19:00:00+02:00
draft: true
---

# Temas a tratar en la tercera sesión


## Mutex y lock ejemplo (05_mutex)
https://github.com/equilibristofgo/sandbox/tree/feat/mutex_example/05_race_condition

## Testing api rest
- https://github.com/intercloud/venom/tree/executor-tavern/executors/tavern
- Repasar de la libreria de http la parte de mockear las llamadas...
    -  https://github.com/friendsofgo/killgrave 

## Visibilidades dentro y fuera de un paquete para los atributos
- La cuestion aqui esta en que atributos de una clase son privados o publicos

    t.Run(tt.name, func(t *testing.T) {
        h := serverHttp.ExampleStruct{
            Visible: "",
            appServices: nil,
            logger:      tt.fields.logger,
        }   

## Paquetería interna no exportable en go
- Aqui el tema esta, no solo para atributos sino paquetes enteros.
- https://stackoverflow.com/questions/59342373/use-of-internal-package-not-allowed
    - https://go.dev/doc/go1.4#internalpackages
    - https://pkg.go.dev/cmd/go#hdr-Internal_Directories
-  https://www.practical-go-lessons.com/chap-11-packages-and-imports#the-internal-directory
- [Codigo de ejemplo](https://github.com/equilibristofgo/sandbox/tree/main/04_internal/app)
