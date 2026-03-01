---
title: "Four Lightning Talk"
date: 2026-02-23T19:00:00+02:00
draft: true
---

# Guion de Podcast: Go & Machine Learning (Sesión 04)

Ya hace tiempo comente como ibamos a usar [LiveKit y Telegram](https://equilibristofgo.github.io/blog/posts/puliendo_detalles/) dentro de esta iniciativa, y ahora en este segundo intento muchas cosas en el mundo de la tecnologia (de calle) han evolucionado, y en este re-arranque voy a usar alguna de ellas.

En mi setup local, he pasado de solo usar [livekit server standalone](https://docs.livekit.io/transport/self-hosting/local/) a configurarlo para usar un [egress](https://docs.livekit.io/transport/media/ingress-egress/egress/) que me permita grabar las sesiones. Nota, hay que configurar (y activar en la configuracio) un redis para que el server y el egress se comuniquen. Y el trigger para grabar lo codique usando la [sdk de go](https://docs.livekit.io/reference/other/egress/examples/).

Una vez tenia livekit y la opcion de grabar las sessiones, usaria los elementos que ya tenia en local..
- Un modelo qwen3, desplegado como openvino (model_server) para mi grafica Intel Arc B560M de 12Gb.
- Para que el modelo a traves de model_server, fuera 100% compatible como openai spec, puse por delante un LiteLLM.
- Ademas, para el tema del TTS optimizado para Intel con OpenVino (u soporte intengrado a OpenAI REST) estuve trasteando con Gemini y salio [esto](https://github.com/remsky/Kokoro-FastAPI/pull/444) asi que con Kokoro como un tiro.
- Y para el STT Whisper con el sabor fedirz/faster-whisper-server.
- Y luego necesitaria tener tambien "ojos" (a parte de orejas y boca) asi que buscando empece con Florence, pero no parece que fuera facil el soporte nativo en Intel, asi que termine:
    - Montando un contenedor custom, con las bases que ya habia experimentado con Kokoro para tener soporte de openvino para intel.
    - Monte un ejemplo de FastApi para tener un soporte a /ocr
    - Use el modelo Qwen2-VL pipe = ov_genai.VLMPipeline(MODEL_DIR, target_device) use openvino con python.

Ahora ya tenia las herramientas necesarias para entrar en el mundo de [LiveKit Agents](https://docs.livekit.io/agents/start/voice-ai-quickstart/) y partiendo del starte de python, y con mucha ayuda de Gemini, termine con un [agente](https://github.com/equilibristofgo/sandbox/blob/main/13_livekit_agent/src/agent_vision.py) conectado a la video conferencia, con orejas, boca y ojos, que gracias al LLM podia comentar cosas en mi charla.

Puedes ver una demo de todo esto [aqui](https://youtu.be/5kLvXK_9vaw)

---

## Bloque 1: Cimientos y Paralelismo

El caso es que tenia ganas de meterme con temas de ML y di con este [fantastico curso](https://atcold.github.io/NYU-DLSP20/en/week01/01/) pero aunque lo habia intentado varias veces, no conseguia hacerme con Python, asi que en el ambito de los Equilibriastas del Golang... me propuse una especie de migracion a Golang de [este](https://github.com/Atcold/NYU-DLSP20/blob/master/00-logic_neuron_programming.ipynb) Jupyter Notebooks.  

**Línea Argumental:** La idea es ver que opciones teniamos en Golang para hacer ML ... y oye, hay cosas interesantes.
**Tema:** ¿Por qué Go para ML? La concurrencia como arma secreta y estructuras de datos nativas.

- **Contenido:**
    - Introducción a la serie: Go no es el lenguaje estándar de ML, pero su eficiencia es clave.
    - Concepto de "Worker Pools" y procesamiento paralelo {{< sandboxlink "01/main.go" >}}01-concurrency{{< \/sandboxlink >}}. Empezamos con algo basico de Go (que no terminaremos usando aun) pero puede ayudar.
    - El lienzo en blanco: Representando Tensores con Slices Nativos de Go {{< sandboxlink "02/main.go" >}}02-ManualTensor{{< \/sandboxlink >}}.
    - Un pequeño ejemplo de uso de ensamblador en GOLANG.
    - La primera neurona artesanal usando structs {{< sandboxlink "03/main.go" >}}03-FirstNeuron{{< \/sandboxlink >}}.
    - El infierno del *Index out of range*: Multiplicando tensores a mano en {{< sandboxlink "04/main.go" >}}04-ManualFeedForward{{< \/sandboxlink >}} y por qué duele en {{< sandboxlink "05/README.md" >}}05-IndexError{{< \/sandboxlink >}}.
- **Dudas y Preguntas (5 min):** ¿Cuándo usar concurrencia puede ser contraproducente en ML?

---

## Bloque 2: El Dolor Manual y la Llegada de Gonum (00:15 - 00:30)
**Línea Argumental:** El Dolor del Escalado y El Motor Profesional
**Tema:** Librerías y manejo de matrices en Go con Gonum.

- **Contenido (10 min):**
    - Introducción a [Gonum](https://github.com/gonum/gonum) al rescate.
    - Multiplicación matricial segura y rápida con `mat.MulVec` {{< sandboxlink "06/main.go" >}}06-GonumMul{{< \/sandboxlink >}}.
    - Entre medias, un ejemplo de compilacion de matrices usando las librerias de intel con CGO para acceder a la potencia de la GPU.
    - Completando la ecuación lineal sumando el sesgo {{< sandboxlink "07/main.go" >}}07-GonumBias{{< \/sandboxlink >}}.
- **Dudas y Preguntas (5 min):** ¿Por qué no usar simplemente slices multidimensionales `[][]float64`?

---

## Bloque 3: Anatomía Visual del Aprendizaje (00:30 - 00:45)
**Línea Argumental:** Ver para Creer (Visualización Estática)
**Tema:** Entendiendo Pesos, Sesgos y Activaciones a través de Gráficas.

- **Contenido (10 min):**
    - La hora de la verdad: El entrenamiento de la red aprendiendo XOR con Gonum {{< sandboxlink "07-train/main.go" >}}07-train{{< \/sandboxlink >}}.
    - Poniendo cara a las matemáticas: Anatomía de la función {{< sandboxlink "08-sigmoid/main.go" >}}08-sigmoid{{< \/sandboxlink >}} y graficándola con Gonum Plot en {{< sandboxlink "09-sigmoid-graph/main.go" >}}09-sigmoid-graph{{< \/sandboxlink >}}.
    - Comparando la forma pura frente al output de la neurona {{< sandboxlink "10-neuron/main.go" >}}10-neuron{{< \/sandboxlink >}}.
    - Llevándolo a la práctica real: Predicción de temperaturas, donde los sesgos importan {{< sandboxlink "10-neuron-temperatura/main.go" >}}10-neuron-temperatura{{< \/sandboxlink >}}.
- **Dudas y Preguntas (5 min):** ¿Por qué la Sigmoide está cayendo en desuso frente a ReLU?

---

## Bloque 4: La Vida en Tiempo Real (00:45 - 01:00)
**Línea Argumental:** El Gran Final (IA Dinámica)
**Tema:** Graficando el aprendizaje de forma interactiva.

- **Contenido (10 min):**
    - De la gráfica estática de Plot a la interactividad sin estado de memoria de [Ebiten](https://ebiten.org/).
    - Simulador XOR en tiempo real y arquitectura Backprop [10-neuron-js-golang](file:///home/jose/workspace/personal/sandbox/golang/nyu/00/10-neuron-js-golang/main.go).
    - Modificando la inercia (Learning Rate) sobre la marcha.
    - Referencia al origen inspiracional del curso de NYU.
- **Dudas y Preguntas (5 min):** ¿Es Go viable para redes de miles de capas en producción?

---

## Recursos Adicionales:
- {{< sandboxlink "" >}}Ejemplos de código en NYU Sandbox{{< \/sandboxlink >}}
- [Grabación en Youtube]()
- [Podcast en iVoox]()