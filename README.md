# Liderar con propósito — Portafolio de María Fernanda Blanco

Sitio de portafolio personal de María Fernanda Blanco Pinto, enfocado en dirección
comercial y desarrollo de negocios. El contenido se organiza en tres capítulos:
**Saber ser**, **Saber saber** y **Saber hacer**.

## Stack

- **React 19** + **TypeScript** sobre **Vite 7**
- **Tailwind CSS 4** y componentes **shadcn/ui** (Radix)
- **Three.js** vía `@react-three/fiber` y `@react-three/drei` para el avatar 3D
- **wouter** para el enrutado
- **Express** para servir el build en producción

## Requisitos

- Node.js 20 o superior
- pnpm 10 (`corepack enable` o `npx pnpm`)

## Puesta en marcha

```bash
pnpm install
pnpm dev
```

El sitio queda en http://localhost:3000. No hacen falta variables de entorno:
todos los recursos son locales.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Compila el cliente a `dist/public` y el servidor a `dist` |
| `pnpm start` | Sirve el build de producción |
| `pnpm check` | Verifica los tipos con TypeScript |
| `pnpm format` | Formatea el código con Prettier |

## Estructura

```
client/
  index.html          Documento raíz
  public/assets/      Avatar .glb e imágenes optimizadas
  src/
    pages/Home.tsx    Página principal (todo el contenido editorial)
    components/       AvatarStage (escena 3D) y el kit shadcn/ui
    index.css         Sistema de diseño completo
server/index.ts       Servidor Express para producción
shared/               Código compartido entre cliente y servidor
```

## Recursos gráficos

`client/public/assets/` contiene todo lo que el sitio necesita:

| Archivo | Peso | Nota |
| --- | --- | --- |
| `avatar.glb` | 1,2 MB | Malla simplificada, texturas WebP y compresión Meshopt |
| `saber-*.webp` | 36–58 KB | Imágenes de cada capítulo, 1200 px de ancho |
| `mfb-monogram.webp` | 11 KB | Monograma para cabecera y favicon |

Para regenerar el avatar a partir de un `.glb` original:

```bash
npx @gltf-transform/cli optimize entrada.glb client/public/assets/avatar.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify true --simplify-ratio 0.12 --simplify-error 0.002
```

## Notas de contenido

`content-source.md` recoge los datos verificados del CV que sustentan el texto del
sitio; `ideas.md` documenta la dirección de diseño. Conviene actualizar ambos
cuando cambie el contenido.
