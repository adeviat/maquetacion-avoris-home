# Waveless – Landing de viajes en Angular

Proyecto front‑end que replica la landing de “Waveless”: un grid de viajes con desglose de precios y una barra lateral de filtros totalmente responsive (mobile, tablet y desktop).

---

## 1. Decisiones técnicas

### Framework y arquitectura

- **Angular con Standalone Components**  
  Se ha utilizado Angular en modo standalone para evitar NgModules y tener componentes más aislados y fáciles de reutilizar y razonar. Cada pieza de UI (header, hero, filtros, grid, card, footer…) es un componente standalone que declara explícitamente sus dependencias en `imports`.[web:24][web:25]

- **Arquitectura por Atomic Design**  
  La estructura de componentes sigue una aproximación inspirada en Atomic Design:
  - **Atoms**: botones, tipografías y tokens de diseño definidos en SCSS.
  - **Molecules**: `TripCardComponent`, elementos de formulario, etc.
  - **Organisms**: `TripGridComponent`, `FiltersComponent`, `Header`, `Footer`.
  Esto ayuda a mantener separación de responsabilidades y facilita modificar secciones sin romper el resto.

### Estilos

- **SCSS modular**  
  Se utilizan ficheros SCSS separados (`globals`, `mixins`, `components`, `semantic`) con:
  - Variables de espaciado, colores y tipografías.
  - Mixins de **breakpoints** (`respond-up(tablet|desktop)`) para el diseño responsive.
  - Clases BEM (`o-`, `m-`, `a-`) para distinguir nivel de componente.

- **Bootstrap 5 (solo UI / comportamiento ligero)**  
  Se usa Bootstrap 5 para:
  - **Accordion** de la barra de filtros, aprovechando el comportamiento de colapso y la clase `collapsed` para estados visuales.[web:5]
  - **Tooltips** para los iconos de información de cada actividad (Quads, Parapente, etc.), inicializados mediante la instancia global `window.bootstrap`.

  No se utiliza Bootstrap para el layout general (se prioriza SCSS propio) para ceñirse fielmente al diseño.

### Lógica de negocio y filtrado

- **Modelo de viaje tipado**  
  Interfaz `Trip` con propiedades como `region`, `country`, `days`, `priceFrom`, `tag`, `image`, `breakdown`, `finalPrice` y `activities` (array de actividades asociadas).

- **Filtrado por actividades en el grid**  
  - `TripGridComponent` mantiene un `Set<string> selectedActivities` con las actividades activas.
  - Un getter `filteredTrips` filtra el array original según las actividades seleccionadas.
  - `sections` agrupa los viajes filtrados por región para pintarlos bajo el título de región correspondiente.

- **Comunicación filtros ↔ grid**  
  - `FiltersComponent` expone:
    - `@Input() valueActivities` para recibir el estado actual de actividades.
    - `@Output() activitiesChange` para emitir el nuevo `Set` cuando cambia un checkbox.
  - El grid consume estos outputs y actualiza `selectedActivities`, lo que reactiva el getter `filteredTrips`.

- **Popup de desglose de precios por card**  
  Cada `TripCardComponent` controla su propio estado `showBreakdown` y muestra un popup con:
  - Resumen del viaje (país, días).  
  - Lista de líneas de desglose (`breakdown`).  
  - Precio final (`finalPrice`).

  Esta responsabilidad se mantiene en la card para encapsular el comportamiento y evitar estados compartidos innecesarios.

### Responsive y UX

- **Barra de filtros según viewport**  
  - **Mobile**: panel tipo *offcanvas* que entra desde la derecha sobre el contenido.
  - **Tablet**: panel que entra desde la izquierda sobre el grid (como en el layout de diseño).
  - **Desktop**: barra fija a la izquierda, integrada en el layout de dos columnas.

  El comportamiento se resuelve principalmente mediante CSS (`position: fixed` + transform) y la clase `o-filters--open`.

- **Hover y feedback visual**  
  - Cards: elevación y sombra suave en hover.
  - Botón “Reservar”: pasa de borde a fondo sólido morado y texto en blanco en hover.
  - Secciones de filtros: el título se pinta en naranja cuando el panel del accordion está abierto, aprovechando `:not(.collapsed)`.

---

## 2. Instalación y ejecución en local

### Requisitos previos

- Node.js (versión LTS recomendada).

  
- npm instalado.

### 1. Clonar el repositorio

git clone <URL_DEL_REPO>
cd <CARPETA_DEL_REPO>

### 2. Instalar dependencias

npm install

Esto instalará Angular y las dependencias del proyecto.

### 3. Arrancar el servidor de desarrollo

npm start

o, según configuración:
ng serve

Por defecto, la aplicación se servirá en:
http://localhost:4200

Abre esa URL en el navegador.

### 4. Visualizar el proyecto

- Ver la **home** con:
  - Hero principal.
  - Sección “Vive tus propias aventuras”.
  - Grid de 9 cards agrupadas por región.
- Probar el botón **“Ver filtros”**:
  - En mobile: panel desde la derecha.
  - En tablet: panel desde la izquierda.
  - En desktop: barra fija (botón puede reutilizarse como atajo, pero la barra siempre está visible).
- Probar:
  - Checkboxes de **Quads**, **Parapente**, **Explora** en “Aventura”.
  - Cambiar las combinaciones y observar cómo se actualiza el grid.
  - Botón **“Ver desglose”** en las cards para ver el popup de precios.

---

## 3. Comentarios adicionales para la evaluación


- **Extensibilidad**  
  - El modelo `Trip` y el filtro por actividades están pensados para poder ampliarse fácilmente a más criterios (precio, alojamiento, destinos) sin alterar la arquitectura base.
  - La barra de filtros puede migrarse a un sistema de datos real (por ejemplo, valores obtenidos desde API) sustituyendo el array estático de viajes.

- **Uso de Bootstrap limitado y controlado**  
  Se usan solo aquellas partes donde aporta valor inmediato (accordion y tooltips), manteniendo el resto del diseño con SCSS propio para tener control total sobre la maquetación.

- **Posibles mejoras futuras**
  - Conectar filtros de precio a un sistema de rango real.
  - Animaciones adicionales para el popup de desglose usando Angular animations.
  - Tests unitarios básicos para la lógica de filtrado y la apertura/cierre de popups.
