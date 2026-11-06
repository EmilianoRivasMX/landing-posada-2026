# 🎄 Posada 2026 — Landing RSVP

> Landing page interactiva para confirmar asistencia a la posada navideña. Estilo lotería mexicana, mobile-first, con fondo ilustrado y envío automático a Google Sheets.

![Preview](img/fondo-posada-plano.jpg)

---

## ✨ Características

- **Tres cartas de Lotería** — El Valiente, La Bola y El Ausente, cada una con su propia respuesta y lógica de RSVP
- **Validación de nombre** — Modal con copy coloquial que bloquea el envío sin nombre
- **Respuesta personalizada para El Ausente** — Título especial: *¡Ni hablar, mi burrito sabanero!* 🫏
- **Envío a Google Sheets** — Vía Google Apps Script, sin servidor
- **Diseño mobile-first** — Espaciados táctiles, tipografía fluida y sin desbordamiento horizontal
- **Fondo ilustrado** — Escena de posada mexicana con difuminado radial en los bordes
- **Papel picado animado** — Componente decorativo en la cabecera

---

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 + Vite 6 |
| Estilos | Tailwind CSS v3 |
| Tipografías | Google Fonts — Rye, Courier Prime |
| Backend | Google Apps Script (Sheets) |
| Deploy | Vercel |
| Control de versiones | Git + GitHub |

---

## 📁 Estructura del proyecto

```
landing-posada-2026/
├── index.html              # Entry point de Vite
├── index.vanilla.html      # Versión standalone (sin build, abre directo en browser)
├── vite.config.js
├── package.json
│
├── css/
│   └── style.css           # Estilos globales, fondo, sombra-dura, fuentes
│
├── js/
│   └── app.js              # Lógica vanilla: modal, selección de carta, envío a Sheets
│
├── img/
│   ├── el-valiente.svg     # Carta 1 — ilustración vectorial
│   ├── la-bola.svg         # Carta 2 — ilustración vectorial
│   ├── el-ausente.svg      # Carta 3 — ilustración vectorial
│   ├── pinata-posada-plana.png  # Piñata central decorativa
│   └── fondo-posada-plano.jpg   # Fondo ilustrado de posada
│
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        ├── LoteriaCard.jsx  # Componente de carta de Lotería
        └── PapelPicado.jsx  # Componente decorativo de papel picado
```

---

## 🚀 Comandos

### Instalación

```bash
npm install
```

### Desarrollo local (con hot reload)

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Vista rápida sin build

Abre directamente `index.vanilla.html` en Chrome — no requiere Node ni servidor.

### Build para producción

```bash
npm run build
```

Los archivos compilados quedan en `dist/`.

### Preview del build antes de desplegar

```bash
npm run preview
```

### Deploy a Vercel (una vez configurado)

```bash
vercel --prod
```

---

## 🔗 Google Sheets — Configuración del backend

El formulario envía los datos a un Google Apps Script desplegado como Web App.

1. Crea una hoja de cálculo en Google Sheets con columnas: `Timestamp`, `Nombre`, `Respuesta`
2. En el editor de Apps Script (`Extensiones → Apps Script`) pega la función `doPost`:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.nombre, data.respuesta]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Despliega como Web App → acceso: **Cualquier persona**
4. Copia la URL y actualízala en `js/app.js` en la constante `SCRIPT_URL`

---

## 🎨 Personalización rápida

| Qué cambiar | Dónde |
|-------------|-------|
| Colores del fondo | `css/style.css` → `background-color` y gradiente radial |
| Texto de las cartas | `index.vanilla.html` → secciones con `data-carta` |
| Respuesta para El Ausente | `js/app.js` → `mensajesAusente` |
| Imagen de fondo | Reemplaza `img/fondo-posada-plano.jpg` |
| Ilustraciones de cartas | Edita los SVGs en `img/` |

---

## 📱 Responsive

Diseño mobile-first probado en:
- iPhone SE (375px) ✅
- iPhone 14 Pro (393px) ✅
- iPad (768px) ✅
- Desktop 1440px ✅

---

## 🌐 Deploy

El sitio está desplegado en Vercel:

**https://landing-posada-2026.vercel.app**

Cada `git push` a `main` puede configurarse para redeploy automático desde el dashboard de Vercel conectando el repositorio de GitHub.

---

## 👨‍💻 Autor

Hecho con ❤️ y mucho ponche de guayaba por **Emiliano Rivas**.
