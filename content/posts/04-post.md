---
title: "Four Lightning Talk"
date: 2026-02-23T19:00:00+02:00
draft: false
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
**Tema:** Librerías de alto rendimiento y aceleración por hardware en Go.

- **Contenido (10 min):**
    - **Gonum al rescate:** Introducción a la librería estándar de facto para computación numérica en Go.
    - **Multiplicación Matricial Profesional:** Implementación de `mat.MulVec` superando las limitaciones de los bucles manuales {{< sandboxlink "06/main.go" >}}06-GonumMul{{< \/sandboxlink >}}.
    - **CGO y el "Metal":** 
        - Paralelismo masivo con **Intel oneAPI (SYCL)** para abstracción de GPU {{< sandboxlink "06_oneapi/main.go" >}}06-oneAPI{{< \/sandboxlink >}}.
        - Control de bajo nivel con **Intel Level Zero**, exprimiendo el hardware directamente desde Go {{< sandboxlink "06_level_zero/main.go" >}}06-LevelZero{{< \/sandboxlink >}}.
    - **Duelo de Rendimiento:** Comparativa en vivo de *CPU (Go)* vs *GPU (SYCL/L0)* y el concepto de *Speedup* {{< sandboxlink "06_compare/simulation.go" >}}06-Compare{{< \/sandboxlink >}}.
    - **La Realidad del Hardware:** Simulación de límites de memoria (VRAM) para modelos Transformer sobre una **Intel Arc B580 (12GB)**, analizando el impacto de FP16 vs INT4 y el peso del *KV Cache*.
    - **Cerrando el Nodo:** Completar la ecuación lineal ($y = Wx + b$) sumando el vector de sesgo con `mat.AddVec` {{< sandboxlink "07/main.go" >}}07-GonumBias{{< \/sandboxlink >}}.

- **Dudas y Preguntas (5 min):** 
    - ¿Por qué `mat.Dense` es más eficiente que un `[][]float64`? (Localidad de memoria y *cache lines*).
    - ¿Cuándo compensa el "coste de transferencia" (latencia) de enviar datos a la GPU?

---

## Bloque 3: Anatomía Visual del Aprendizaje (00:30 - 00:45)
**Línea Argumental:** Ver para Creer: De la Regla de la Cadena a las Gráficas 2D  
**Tema:** Entendiendo el entrenamiento, la función Sigmoide, los Pesos y los Sesgos.

- **Contenido (10 min):**
    - **La Hora de la Verdad (El Bucle de Entrenamiento):** 
        - Implementación del ciclo completo de aprendizaje en {{< sandboxlink "07-train/main.go" >}}07-train{{< \/sandboxlink >}} aprendiendo la puerta XOR con Gonum.
        - *Forward Pass*: Propagación hacia adelante a través de las capas oculta y de salida.
        - *Función de Pérdida*: Midiendo el error de predicción frente al objetivo.
        - *Backpropagation*: La derivada de la sigmoide como "sensor de cambio" ($s \cdot (1 - s)$) y la propagación de la culpa hacia atrás mediante la regla de la cadena.
        - *Weight Update*: Descenso de gradiente estocástico (SGD) ponderado por el *Learning Rate*.
    - **Diseccionando la Activación:**
        - ¿Por qué estrujar números entre 0 y 1? Anatomía aislada de la función Sigmoide en {{< sandboxlink "08-sigmoid/main.go" >}}08-sigmoid{{< \/sandboxlink >}}.
    - **Poniendo Cara a las Matemáticas con Gonum Plot:**
        - La ciencia de datos sin gráficos es un vuelo a ciegas: graficando la curva en "S" en 2D con `gonum/plot` en {{< sandboxlink "09-sigmoid-graph/main.go" >}}09-sigmoid-graph{{< \/sandboxlink >}}.
    - **Pesos y Sesgos en Acción:**
        - Comparativa visual de la curva pura frente a la neurona ponderada en {{< sandboxlink "10-neuron/main.go" >}}10-neuron{{< \/sandboxlink >}}.
        - *El Peso ($W$)* cambia la pendiente y escala el espacio; *El Sesgo ($b$)* desplaza horizontalmente el umbral de activación.
    - **El Sesgo en el Mundo Real:**
        - Predicción de temperaturas a lo largo del día según las horas en {{< sandboxlink "10-neuron-temperatura/main.go" >}}10-neuron-temperatura{{< \/sandboxlink >}}: comprendiendo por qué el sesgo es crítico para que a las 12:00 y a las 18:00 tengamos salidas distintas para la misma entrada base.
    - **El Ecosistema Moderno en Go:**
        - Mención al estado del arte en Go: librerías como [Hugot](https://github.com/knights-analytics/hugot) y [Cybertron](https://github.com/nlpodyssey/cybertron) para inferencia de modelos Transformer nativos en Go.

- **Dudas y Preguntas (5 min):** 
    - ¿Por qué la función Sigmoide ha ido cayendo en desuso en capas profundas frente a ReLU o GELU? (El problema del *Vanishing Gradient* o desvanecimiento del gradiente).
    - ¿Cómo explicarías de forma intuitiva qué hace el sesgo (*bias*) sin recurrir a fórmulas matemáticas?

---

## Bloque 4: La Vida en Tiempo Real y el Tejido Neuronal (00:45 - 01:00)
**Línea Argumental:** El Gran Final: IA Dinámica, Ebiten y la Hipótesis del Manifold  
**Tema:** Graficando el aprendizaje en tiempo real y doblando el espacio geométrico.

- **Contenido (10 min):**
    - **De la Gráfica Estática a los 60 FPS con Ebiten:**
        - Adiós a los archivos PNG estáticos: renderizado inmediato en 2D sin estado con [Ebiten](https://ebiten.org/).
        - El simulador XOR interactivo en {{< sandboxlink "10-neuron-js-golang/main.go" >}}10-neuron-js-golang{{< \/sandboxlink >}}:
            - Círculos cuya transparencia (*alpha*) refleja la intensidad de activación neuronal.
            - Sinapsis con código de color dinámico (verde para pesos positivos, rojo para negativos) y grosor proporcional a la magnitud del peso.
            - *Tú eres el optimizador*: Teclas para forzar pasos de entrenamiento/desentrenamiento en vivo y ajustar la inercia (*Learning Rate*) viendo la curva de error reaccionar en tiempo real.
    - **El Clímax: Deep Space Stretching (La Hipótesis del Manifold):**
        - Conexión directa con las clases magistrales de NYU (Yann LeCun & Alfredo Canziani): {{< sandboxlink "11-juego-final/main.go" >}}11-juego-final{{< \/sandboxlink >}}.
        - La red neuronal como deformador del tejido espacial: cómo una red de capas densas rota, estira y pliega una cuadrícula 2D (la "manta") para desenredar problemas linealmente inseparables (espirales y anillos).
        - **La Pizarra de Cálculo en vivo**: Inspección matemática transparente de operaciones tensoriales capa por capa.
        - **Multiplexación de Motores**: Conmutando en caliente entre cálculo Standard, Parallel, AVX, Level Zero (GPU) y la versión compilada para navegador en **WebAssembly (WASM)**.
    - **Conclusiones de la Serie:** ¿Hacia dónde va Go en el ecosistema de Machine Learning?

- **Dudas y Preguntas (5 min):** 
    - ¿Es Go un lenguaje viable para producción y despliegue de modelos de Machine Learning frente al monopolio de Python y C++?
    - ¿Qué ventajas ofrece WebAssembly (WASM) en Go para la visualización educativa y la divulgación de IA sin necesidad de servidores pesados?

---

## Bloque 5: Del Cloud al Silicio Libre: Redes Neuronales sobre RISC-V y RVV 1.0 (01:00 - 01:15)
**Línea Argumental:** De los motores AVX (x86) y Level Zero (Intel Arc GPU) al Edge AI en hardware abierto con Go.  
**Tema:** Cross-compiling nativo y aceleración vectorial *Vector-Length Agnostic* sobre el SoC Kendryte K230.

- **Contenido (10 min):**
    - **La Placa CanMV-K230 (Kendryte K230):** Arquitectura heterogénea Dual-Core RISC-V T-Head C908 (`RV64GCB` a 800 MHz para gestión y `RV64GCBV` a 1.6 GHz con unidad vectorial **RVV 1.0 de 128 bits**).
    - **Cross-Compiling sin dolor en Go:** Compilar un binario estático listo para correr en Linux RISC-V con `CGO_ENABLED=0 GOOS=linux GOARCH=riscv64 GORISCV64=rva22u64` sin el infierno de toolchains C++ cruzados.
    - **De AVX2 (`02/matrix_avx`) a RISC-V RVV 1.0:** Programando `vector_riscv64.s` en ensamblador Go (`VSETVLI`, `VLE32.V`, `VFADD.VV`, `VFMACC.VV`, `VFREDUSUM.VS`) en {{< sandboxlink "12-riscv-rvv/main.go" >}}12-riscv-rvv{{< /sandboxlink >}}.
    - **Integración en la arquitectura de motores:** Proyección de `nn/riscv` como sexto backend de inferencia en el simulador *Deep Space Stretching* (`11-juego-final`).

- **Dudas y Preguntas (5 min):**
    - ¿En qué se diferencia la filosofía *Vector Length Agnostic (VLA)* de RISC-V RVV 1.0 frente a SIMD tradicional de longitud fija como AVX-256 o AVX-512?
    - ¿Por qué Go es un candidato ideal para desplegar inferencia ligera en dispositivos Edge RISC-V frente al peso del runtime de Python?

---

## 🎬 Detrás de las Cámaras: Producción Automatizada de las Sesiones 3 y 4 con GPU Intel Arc

Mientras que las dos primeras sesiones se grabaron como sesiones de vídeo interactivas en directo con [LiveKit](https://livekit.io/), para las Sesiones 3 y 4 dimos el salto a una **cadena de producción de vídeo programática, local y determinista** en Linux:

1. **Locución en Dúo (Host & Copiloto Jarvis):**  
   Generación de audio con **Kokoro-TTS** en CPU, utilizando dos voces diferenciadas en español (`em_alex` para Jose y `em_santa` para Jarvis). Para Jarvis, un script en Python genera además un **Orbe holográfico reactivo** (`512x512`) que pulsa y gira en tiempo real según la envolvente RMS del audio.
2. **Animación Facial con SadTalker en GPU Intel Arc:**  
   La GPU **Intel Arc B580 (12 GB VRAM)** procesa la imagen del presentador en plató mediante **SadTalker** con aceleración PyTorch XPU / Level Zero en FP16, generando planos generales 16:9 para las introducciones y cierres, y planos recortados (`512x512`) para las cajas de Picture-in-Picture.
3. **Tarjetas de Código Híbridas 1080p:**  
   En lugar de grabaciones saturadas de VSCode, un script en Python con Pillow renderiza lienzos oscuros (`1920x1080`) con resaltado de sintaxis exacto de los archivos de Go de `sandbox/14_nyu_00`, salidas reales de terminal, gráficas de `gonum/plot` y un viewport reservado de `350x350 px` para la cámara en vivo.
4. **Grabación Autónoma de Ebiten a 60 FPS:**  
   Mediante `python-xlib` y `ffmpeg -f x11grab`, el sistema lanza automáticamente los simuladores interactivos (`10-neuron-js-golang` y `11-juego-final`), simula pulsaciones de teclado (`Enter`, `T`, `S`, `X`) y graba clips de juego a 60 FPS sin necesidad de intervención manual.
5. **Montaje Virtual en Blender VSE:**  
   Un script headless en Blender (`bpy`) lee el manifiesto de tiempos (`manifest_audio.json`), ensambla las pistas de audio, los fondos y las capas PiP con transformación de color `Standard`, renderizando el máster H.264/AAC a 25 FPS en minutos.
6. **Subida Automática a YouTube:**  
   Publicación desatendida mediante el CLI de Go **`yutu`** (OAuth 2.0) al canal [@equilibristofgolang6247](https://www.youtube.com/@equilibristofgolang6247), inyectando títulos, descripciones estructuradas y marcas de tiempo (timestamps).

---

## Recursos Adicionales:
- {{< sandboxlink "" >}}Ejemplos de código en NYU Sandbox{{< \/sandboxlink >}}
- [Curso NYU Deep Learning (Yann LeCun & Alfredo Canziani)](https://atcold.github.io/NYU-DLSP20/)
- [Grabación en Youtube (Sesión 1)](https://www.youtube.com/watch?v=Ghk5mH8soaI)
- [Grabación en Youtube (Sesión 2)](https://youtu.be/JyzpeTP6Jxw)
- [Grabación en Youtube (Sesión 3 - Redes Neuronales desde Cero con Gonum)](https://youtu.be/MJhAxBhwWLw)
- [Grabación en Youtube (Sesión 4 - Redes a 60 FPS con Ebiten y WebAssembly)](https://youtu.be/V7Yi1aIkHKA)
- [Grabación en Youtube (Sesión 5 - Del Cloud al Silicio Libre: RISC-V y RVV 1.0 en Kendryte K230)](https://youtu.be/-HztBkFKcoU)
- [🔥 Documental Completo (1 Hora de Deep Learning en Go sobre Silicio Libre RISC-V)](https://youtu.be/e7C8aLB1fNU)
- [Normas de la Comunidad y Código de Conducta](https://github.com/equilibristofgo/blog/blob/main/CODE_OF_CONDUCT.md)
- [Podcast en iVoox]()