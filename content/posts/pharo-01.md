---
title: "Pharo (I)"
date: 2023-02-28T19:00:00+02:00
draft: true
---

# Temas a tratar en la sesión de Pharo (I)

	
para mí
- Repaso a la visualizacion... a ver si puedo sacar algo mas en claro...
- Moose
- http://themoosebook.org/book/index.html#h1mooseinanutshell
- self select: [ :each | each isAnnotatedWith: 'RestController' ].
- self select: [ :each | each clientTypes isEmpty]
| view |
view := RTMondrian new.
view nodes: (self, (self flatCollect: #clientTypes)) asSet.
view layout grid.
view


| view |
view := RTMondrian new.
view shape circle
if: [ :each | each isAnnotatedWith: 'RestController' ]
color: Color red.
view nodes: (self, (self flatCollect: #clientTypes)) asSet.
view layout grid.
view

| view |
view := RTMondrian new.
view shape circle
if: [ :each | each isAnnotatedWith: 'RestController' ]
color: Color red.
view nodes: (self, (self flatCollect: #clientTypes)) asSet.
view edges connectFromAll: #clientTypes.
view layout grid.
view view pushBackEdges.
view
