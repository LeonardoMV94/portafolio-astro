# Integración con GitHub

## Descripción General

El sistema de integración con GitHub permite obtener automáticamente el contenido del README.md y las estadísticas de los repositorios de cada proyecto en el portafolio.

## Características

### 📖 **README.md Automático**
- Obtiene el contenido del README.md desde GitHub
- Convierte markdown a HTML con estilos personalizados
- Maneja errores cuando no hay README disponible
- Soporta ramas `main` y `master`

### 📊 **Estadísticas del Repositorio**
- Muestra estrellas, forks, watchers e issues
- Detecta el lenguaje principal del proyecto
- Se actualiza automáticamente en cada build

## Funcionamiento

### **Extracción de Información**
El sistema extrae automáticamente el username y nombre del repositorio desde las URLs de GitHub:

```typescript
// Ejemplo: https://github.com/LeonardoMV94/link-shortener
const username = "LeonardoMV94";
const repoName = "link-shortener";
```

### **Obtención de README**
1. Intenta obtener README.md desde la rama `main`
2. Si falla, intenta desde la rama `master`
3. Convierte el markdown a HTML con estilos Tailwind
4. Muestra el contenido en la página de detalles

### **Estadísticas de GitHub**
1. Usa la API pública de GitHub
2. Obtiene estadísticas en tiempo real
3. Muestra métricas relevantes del proyecto

## Archivos del Sistema

### `src/utils/github.ts`
Contiene las funciones principales:

- `fetchReadme(username, repoName)`: Obtiene el README.md
- `extractUsername(githubUrl)`: Extrae el username de la URL
- `extractRepoName(githubUrl)`: Extrae el nombre del repositorio
- `markdownToHtml(markdown)`: Convierte markdown a HTML

### `src/components/github-stats.astro`
Componente que muestra las estadísticas del repositorio.

### `src/pages/projects/[slug].astro`
Página que integra README y estadísticas.

## Conversión de Markdown

El sistema convierte automáticamente:

- **Headers**: `# ## ###` → `<h1> <h2> <h3>`
- **Bold**: `**texto**` → `<strong>texto</strong>`
- **Italic**: `*texto*` → `<em>texto</em>`
- **Code**: `` `código` `` → `<code>código</code>`
- **Code blocks**: ```` ``` ````` → `<pre><code>...</code></pre>`
- **Links**: `[texto](url)` → `<a href="url">texto</a>`
- **Lists**: `* item` → `<li>item</li>`

## Estilos Aplicados

### **Headers**
```css
h1: text-2xl font-bold mt-10 mb-6
h2: text-xl font-semibold mt-8 mb-4
h3: text-lg font-semibold mt-6 mb-3
```

### **Code**
```css
inline: bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono
blocks: bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto my-4
```

### **Links**
```css
text-blue-600 dark:text-blue-400 hover:underline
```

## Manejo de Errores

### **README No Disponible**
- Muestra un mensaje informativo
- Proporciona enlace directo al repositorio
- Icono visual para indicar ausencia de documentación

### **API de GitHub**
- Maneja errores de red graciosamente
- No bloquea la carga de la página
- Logs de errores para debugging

## Limitaciones

### **API de GitHub**
- Límite de 60 requests por hora para IPs no autenticadas
- Para mayor volumen, considerar usar GitHub Token

### **README.md**
- Solo obtiene desde ramas `main` o `master`
- No soporta README en otras ubicaciones
- Conversión básica de markdown (no soporta tablas complejas)

## Mejoras Futuras

1. **Soporte para GitHub Token**: Para mayor límite de requests
2. **Más formatos de markdown**: Tablas, listas numeradas, etc.
3. **Caché de contenido**: Para evitar requests repetidos
4. **Soporte para otros archivos**: LICENSE, CHANGELOG, etc.
5. **Estadísticas más detalladas**: Contribuidores, commits, etc.

## Uso

El sistema funciona automáticamente. Solo necesitas:

1. Asegurar que las URLs de proyectos apunten a GitHub
2. Tener un README.md en el repositorio
3. El sistema hará el resto automáticamente

## Ejemplo de URL Válida

```
https://github.com/LeonardoMV94/link-shortener
```

El sistema extraerá:
- Username: `LeonardoMV94`
- Repository: `link-shortener`
- Buscará: `https://raw.githubusercontent.com/LeonardoMV94/link-shortener/main/README.md` 