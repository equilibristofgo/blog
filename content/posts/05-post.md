---
title: "Fifth Lightning Talk: Agente Neuro-Simbólico en Go: MCP, Modelos de Decisión y Guardarraíles Deterministas"
date: 2026-03-01T19:00:00+01:00
draft: true
---

# Sesión 05: Agente Neuro-Simbólico en Go: MCP, Modelos de Decisión y Guardarraíles Deterministas

En la sesión anterior ([Sesión 04: Go & Machine Learning](https://equilibristofgo.github.io/blog/posts/04-post/)) exploramos desde los cimientos matemáticos de una neurona artesanal hasta la inferencia en tiempo real a 60 FPS con Ebiten y el salto al silicio libre en procesadores RISC-V con ensamblador RVV 1.0.

En esta quinta entrega damos el salto al siguiente gran reto de la ingeniería moderna: **¿Cómo construir un agente de desarrollo autónomo que no delire, no rompa interfaces y no despilfarre cientos de miles de tokens leyendo repositorios a ciegas?**

Hoy desgranamos el proyecto desarrollado en `sandbox/golang/mpc`: un **Agente Neuro-Simbólico** escrito 100% en Go que combina el protocolo **MCP (Model Context Protocol)**, modelos locales de decisión (**Clef-Flash**), modelos generadores (**Qwen-Coder** en GPU Intel Arc) y la incomparable batería de análisis estático del compilador de Go.

---

## 1. El Problema de los Agentes de Código Actuales: La Fuerza Bruta No Escala

La mayoría de herramientas actuales de IA (Cursor, Devin, Claude Engineer) siguen un enfoque de fuerza bruta:
1. Vuelcan decenas de archivos completos en una ventana de contexto gigantesca (100k - 200k tokens).
2. Piden al LLM que reescriba el archivo entero para cambiar 3 líneas de código.
3. El LLM introduce sutiles errores de sintaxis, rompe firmas de interfaces, pierde imports o intenta silenciar variables no usadas con el infame identificador en blanco `_`.
4. El coste por cada feature menor se dispara en latencia y factura de API.

En **Equilibristas de Golang** buscamos el equilibrio: **la IA solo debe intervenir donde la computación determinista no llega**. Si el compilador de Go, el servidor de lenguaje (`gopls`), el analizador SSA (`nilness`) o el depurador (`dlv`) pueden resolver o acotar un problema en 0 milisegundos y 0 tokens, el LLM jamás debería ser consultado.

---

## 2. Arquitectura Neuro-Simbólica: Sistema 1 + Sistema 2 + Context Provider

Inspirado en la teoría cognitiva de Daniel Kahneman (*Pensar rápido, pensar despacio*), el agente divide la inteligencia en tres capas bien diferenciadas:

```
[ Objetivo del Usuario ]
          │
          ▼
   ┌──────────────┐
   │  CLEF-FLASH  │ ──> Sistema 1: Decisión rápida (~100ms, bajo coste).
   └──────────────┘     Clasifica intención (¿Es rename? ¿Requiere tests? ¿Qué símbolos?).
          │
          ▼
   ┌──────────────┐
   │  GOPLS MCP   │ ──> Context Provider Determinista (AST exacto de Go).
   └──────────────┘     Localiza target entity, referencias y blast radius sin tokens.
          │
          ▼
   ┌──────────────┐
   │ TRANSACTION  │ ──> Snapshot en memoria + Git Stash automático.
   └──────────────┘
          │
          ▼
   ┌──────────────┐
   │  QWEN-CODER  │ ──> Sistema 2: Generación Quirúrgica (Search-Replace Diffs).
   │   O HUMANO   │     Corriendo en GPU Intel Arc B580 con OpenVINO (o Developer con -human).
   └──────────────┘
          │
          ▼
   ┌──────────────────────────────────────────────────────────┐
   │         BATERÍA DETERMINISTA DE GUARDARRAÍLES GO         │
   │  1. gopls (Diagnósticos de Compilación + DAG Topológico) │
   │  2. go vet (copylocks, lostcancel, sync/atomic)          │
   │  3. go/ssa nilness (Detección de punteros nulos en grafo)│
   │  4. fieldalignment (Optimización de padding de structs)  │
   │  5. go test -race (Detector de condiciones de carrera)   │
   │  6. Delve dlv rpc2 (Breakpoints efímeros ante fallos)    │
   └──────────────────────────────────────────────────────────┘
          │
          ├──> [¿Errores?] ──> Bucle de autocorrección quirúrgico
          │
          ▼
   [ ✅ Diagnósticos Limpios & Tests 100% Pasados -> Commit Git Convencional ]
```

---

## 3. El Servidor MCP Nativo (`go-clef-agent -serve-mcp`)

El agente no solo funciona como CLI autónomo, sino que implementa nativamente la especificación JSON-RPC del **Model Context Protocol (MCP)** sobre `stdio`. Esto permite conectarlo directamente a entornos como **Continue.dev**, **Cursor** o **Roo Code**.

### Herramientas MCP Expuestas:
1. **`implement_go_feature`** *(Macro-Tool)*: Ejecuta el pipeline completo de extremo a extremo con reporte de telemetría.
2. **`go_plan_impact`** *(Fase 1: Lectura)*: Calcula el impacto en el AST, referencias cruzadas y archivos afectados sin tocar una sola línea de código.
3. **`go_apply_feature`** *(Fase 2: Generación)*: Genera parches quirúrgicos con tolerancia a variaciones de espacios en blanco (*fuzzy whitespace matching*) y formateo canónico con `goimports`.
4. **`go_verify_and_autofix`** *(Fase 3: Autocorrección)*: Bucle cerrado de compilación, análisis estático y tests unitarios.
5. **`go_debug_snapshot`** *(Fase 4: Inspección Runtime)*: Inyecta un breakpoint efímero no bloqueante con Delve en un test específico y extrae el árbol de variables locales y call stack en memoria.

### Streaming en Tiempo Real:
Mediante las notificaciones `notifications/progress` y `$/progress`, el servidor MCP emite en streaming el porcentaje de avance, la etapa activa y los tokens consumidos directamente a la barra de estado del IDE.

---

## 4. Guardarraíles Programáticos Nativos en Go (Zero-Token Verification)

El núcleo de innovación del proyecto reside en [internal/agent/](https://github.com/equilibristofgo/sandbox/tree/main/golang/mpc/internal/agent), donde implementamos protecciones que superan ampliamente a las herramientas comerciales:

1. **🧩 Satisfacción de Interfaces (`go/types.MissingMethod`):**
   Si una modificación altera una interfaz, el agente intercepta el método faltante mediante el sistema de tipos de Go y genera el stub exacto con coste **0 tokens de LLM**.
2. **🕵️ Cazador de Punteros Nulos SSA (`nilness`):**
   Utilizando `golang.org/x/tools/go/analysis/passes/nilness`, analiza el grafo de control de flujo estático antes de lanzar los tests, interceptando desreferencias que causarían un `panic` en tiempo de ejecución.
3. **📐 Optimización de Memoria en Structs (`fieldalignment`):**
   Audita el alineamiento de memoria de 64 bits para eliminar padding innecesario y reducir la huella de memoria.
4. **🚰 Detector de Fugas de Goroutines (`runtime.NumGoroutine`):**
   Monitorea la creación y destrucción de goroutines durante la ejecución de los tests concurrentes, alertando si alguna goroutine queda huérfana bloqueada en un canal.
5. **✏️ Refactorización Determinista con `gopls rename`:**
   Si el modelo de decisión detecta que el objetivo es un simple renombrado de símbolo (`refactor_rename`), delega en `gopls` sobre todo el workspace con coste **0 tokens de Qwen**.
6. **📦 Arquitectura Multi-Paquete con Ordenación Topológica (`04_clean_arch`):**
   Construye el grafo acíclico dirigido (`DAG`) de dependencias entre paquetes (`domain -> repo -> service`) y extrae los contratos exportados (`skeleton.go`) para que las capas superiores compilen a la primera pasada.
7. **🏎️ Detección de Condiciones de Carrera (`-race`):**
   Ejecuta `go test -race` y, ante colisiones concurrentes, guía la reparación hacia primitivas atómicas (`sync/atomic`) o exclusión mutua.
8. **🐞 Diagnóstico con Delve (`dlv rpc2`):**
   Si un test falla, Delve ejecuta el test compilado con un breakpoint efímero de un solo disparo, capturando los valores exactos de los parámetros en el momento del fallo sin dejar procesos colgados.

---

## 5. El Modo "LLM Humano" (0 Tokens de Inferencia)

Una de las características más sorprendentes es el flag `-human`:
```bash
./bin/go-clef-agent -workspace ./sandboxes/01_task_service -human -goal "Añadir campo Priority en Task"
```
En este modo, el agente prepara quirúrgicamente la mesa de trabajo:
1. `Clef-Flash` y `gopls` localizan el archivo objetivo y los esqueletos de tipos.
2. Se genera el archivo `.clef_human_prompt.md` con las instrucciones precisas y enlaces directos.
3. El agente se pausa esperando tu intervención.
4. El programador humano escribe las líneas en su IDE y pulsa `[ENTER]`.
5. El agente aplica `goimports`, calcula el diff exacto, corre toda la batería (`gopls` + `go vet` + `nilness` + `race`) y genera el commit transaccional.
6. **Resultado:** Una sesión completa de desarrollo asistido con **0 tokens consumidos de Qwen**.

---

## 6. Visualización y Animación ASCII: La Ventana al Protocolo MCP

Para el vídeo que acompañará a este artículo, exploraremos una técnica visual única: **animaciones ASCII retro-terminal a 60 FPS** para observar el comportamiento interno del protocolo MCP y la máquina de estados del agente:

* **TUI Dinámica en Go (Charmbracelet Bubbletea + VHS):**
  Un panel triple con tráfico JSON-RPC en tiempo real, el DAG de paquetes iluminándose en caracteres ASCII y el volcado de memoria de Delve.
* **Escena Remotion CRT / Retro-Phosphor:**
  Renderizado en 1080p simulando un monitor de fósforo verde o ámbar con scanlines, tecleo mecánico sincronizado con la locución y efectos de sonido de protocolo.

---

## 7. Recursos y Código Fuente

* 📂 **Código completo del Agente Neuro-Simbólico:**  
  [sandbox/golang/mpc](https://github.com/equilibristofgo/sandbox/tree/main/golang/mpc)
* 🧪 **Plan de Pruebas para Humanos (Paso a Paso):**  
  [PLAN_DE_PRUEBAS_PARA_HUMANOS.md](https://github.com/equilibristofgo/sandbox/blob/main/golang/mpc/PLAN_DE_PRUEBAS_PARA_HUMANOS.md)
* 📜 **Normas de la Comunidad y Código de Conducta:**  
  [CODE_OF_CONDUCT.md](https://github.com/equilibristofgo/blog/blob/main/CODE_OF_CONDUCT.md)
