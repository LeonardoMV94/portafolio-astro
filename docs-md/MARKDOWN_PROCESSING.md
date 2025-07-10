# Procesamiento de Markdown con Astro

## Descripción General

El sistema de procesamiento de markdown utiliza las capacidades nativas de Astro junto con Tailwind Typography para renderizar contenido markdown de manera profesional y consistente.

## Características

### 🎨 **Estilos Integrados**
- Usa Tailwind Typography para estilos profesionales
- Soporte completo para modo oscuro
- Estilos personalizados para todos los elementos markdown
- Diseño responsive y accesible

### 📝 **Soporte de Markdown Completo**
- **Headers**: `# ## ### #### ##### ######`
- **Texto**: Bold, italic, strikethrough
- **Código**: Inline y bloques de código
- **Enlaces**: Con estilos personalizados
- **Listas**: Ordenadas y no ordenadas
- **Blockquotes**: Con estilos de borde
- **Tablas**: Con estilos de tabla completos
- **Imágenes**: Con bordes redondeados
- **Separadores**: Líneas horizontales

## Arquitectura del Sistema

### **`src/utils/markdown.ts`**
Función principal de conversión de markdown a HTML:

```typescript
export async function markdownToHtml(markdown: string): Promise<string>
```

**Características:**
- Usa la librería `marked` estándar
- Conversión robusta y probada
- Soporte completo para GitHub Flavored Markdown
- Función async para mejor rendimiento

### **`src/components/markdown-content.astro`**
Componente para renderizar contenido markdown:

```astro
<MarkdownContent content={htmlContent} />
```

**Características:**
- Estilos Tailwind Typography
- Modo oscuro automático
- Estilos personalizados con CSS
- Componente reutilizable

## Estilos Aplicados

### **Headers**
```css
h1: text-2xl font-bold mt-10 mb-6
h2: text-xl font-semibold mt-8 mb-4
h3: text-lg font-semibold mt-6 mb-3
h4: text-base font-semibold mt-4 mb-2
```

### **Texto**
```css
p: mb-4 text-neutral-600 dark:text-neutral-400 leading-relaxed
strong: font-semibold text-neutral-900 dark:text-neutral-100
em: italic
```

### **Código**
```css
code: bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono
pre: bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto my-4
```

### **Enlaces**
```css
a: text-blue-600 dark:text-blue-400 hover:underline
```

### **Listas**
```css
ul, ol: ml-6 mb-4 space-y-1
li: text-neutral-600 dark:text-neutral-400
```

### **Blockquotes**
```css
blockquote: border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 my-4 italic
```

### **Tablas**
```css
table: min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg
th: px-4 py-2 bg-neutral-50 dark:bg-neutral-800 font-semibold
td: px-4 py-2 text-neutral-600 dark:text-neutral-400 border
```

## Uso

### **En Páginas Astro**
```astro
---
import MarkdownContent from '../components/markdown-content.astro';
import { markdownToHtml } from '../utils/markdown.js';

const markdownContent = "# Título\n\nContenido markdown...";
const htmlContent = await markdownToHtml(markdownContent);
---

<MarkdownContent content={htmlContent} />
```

### **Con Contenido Dinámico**
```astro
---
import MarkdownContent from '../components/markdown-content.astro';
import { markdownToHtml } from '../utils/markdown.js';

// Obtener contenido desde API o archivo
const readmeContent = await fetchReadme(username, repoName);
const htmlContent = readmeContent ? await markdownToHtml(readmeContent) : '';
---

{htmlContent ? (
  <MarkdownContent content={htmlContent} />
) : (
  <p>No hay contenido disponible</p>
)}
```

## Ventajas del Sistema

### **1. Rendimiento**
- Conversión en tiempo de build
- No requiere JavaScript en el cliente
- HTML optimizado y pre-renderizado

### **2. Consistencia**
- Estilos uniformes en toda la aplicación
- Integración perfecta con el diseño existente
- Soporte completo para modo oscuro

### **3. Mantenibilidad**
- Código centralizado y reutilizable
- Fácil personalización de estilos
- Separación clara de responsabilidades

### **4. Accesibilidad**
- HTML semántico correcto
- Estructura de headers apropiada
- Enlaces con atributos de seguridad

## Personalización

### **Modificar Estilos**
Edita el archivo `src/components/markdown-content.astro`:

```css
.prose h1 {
  @apply text-3xl font-bold; /* Cambiar tamaño de h1 */
}

.prose code {
  @apply bg-blue-100 text-blue-800; /* Cambiar colores de código */
}
```

### **Agregar Nuevos Elementos**
Extiende la función `markdownToHtml` en `src/utils/markdown.ts`:

```typescript
// Agregar soporte para strikethrough
.replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>')
```

## Integración con GitHub

El sistema se integra perfectamente con la obtención de README.md desde GitHub:

1. **Obtener contenido**: `fetchReadme(username, repoName)`
2. **Convertir markdown**: `markdownToHtml(content)`
3. **Renderizar**: `<MarkdownContent content={html} />`

## Ejemplo Completo

```astro
---
import MarkdownContent from '../components/markdown-content.astro';
import { fetchReadme, markdownToHtml } from '../utils/github.js';

const readmeContent = await fetchReadme('username', 'repo');
const htmlContent = readmeContent ? await markdownToHtml(readmeContent) : '';
---

<div class="max-w-4xl mx-auto">
  <h2 class="text-2xl font-bold mb-6">Documentación del Proyecto</h2>
  
  {htmlContent ? (
    <MarkdownContent content={htmlContent} />
  ) : (
    <p class="text-neutral-500">No hay documentación disponible</p>
  )}
</div>
```

## Mejoras Futuras

1. **Sintaxis highlighting**: Para bloques de código
2. **Plantillas personalizadas**: Para diferentes tipos de contenido
3. **Plugins de markdown**: Para funcionalidades avanzadas
4. **Caché de contenido**: Para mejorar rendimiento
5. **Validación de contenido**: Para mayor seguridad 