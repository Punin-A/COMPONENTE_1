# Páginas Abiertas — reseñas de libros

Aplicación web full stack para publicar y consultar reseñas de libros. El proyecto implementa el flujo completo solicitado:

```text
Formulario React → petición HTTP → API Express → archivo JSON → consulta y visualización en React
```

## Tecnologías

- React 19 y React Router para la SPA.
- Vite para desarrollo y compilación del frontend.
- Node.js y Express para la API REST.
- Archivo JSON para persistencia local.
- Fetch para comunicar React con la API.
- Node Test Runner para pruebas de integración.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.
- Puertos `5173` y `3001` disponibles durante el desarrollo.

Puede comprobar las versiones instaladas con:

```bash
node --version
npm --version
```

## Estructura del repositorio

```text
COMPONENTE PRÁCTICO-1/
├── backend/
│   ├── data/                 # Archivo JSON persistente
│   ├── src/
│   │   ├── controllers/      # Respuestas y reglas de cada operación
│   │   ├── middleware/       # Manejo centralizado de errores
│   │   ├── repositories/     # Lectura y escritura del archivo JSON
│   │   ├── routes/           # Rutas GET y POST
│   │   └── utils/            # Validación y normalización
│   └── test/                 # Pruebas de integración de la API
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/            # Pantallas asociadas a las rutas
│   │   ├── services/         # Comunicación HTTP con la API
│   │   ├── styles/           # Estilos adaptables
│   │   └── utils/            # Validación del formulario
│   └── .env.example          # Ejemplo de dirección de la API
├── .gitignore
├── package.json              # Comandos generales y workspaces
└── package-lock.json         # Versiones bloqueadas de dependencias
```

## Instalación

1. Clone el repositorio y entre en la carpeta:

   ```bash
   git clone https://github.com/Punin-A/COMPONENTE_1.git
   cd COMPONENTE_1
   ```

2. Instale todas las dependencias desde la raíz:

   ```bash
   npm install
   ```

   El proyecto usa npm workspaces, por lo que este comando instala las dependencias del frontend y del backend. No es necesario ejecutar `npm install` dentro de cada carpeta.

3. Inicie frontend y backend al mismo tiempo:

   ```bash
   npm run dev
   ```

4. Abra `http://localhost:5173` en el navegador.

## Puertos y direcciones

| Servicio | Dirección predeterminada |
| --- | --- |
| Frontend React | `http://localhost:5173` |
| API Express | `http://localhost:3001` |
| Comprobación de salud | `http://localhost:3001/salud` |

El frontend lee la dirección de la API desde `VITE_API_URL`. Si la variable no existe, utiliza `http://localhost:3001`.

Para cambiarla, copie `frontend/.env.example` como `frontend/.env` y modifique el valor. Los archivos `.env` no se suben al repositorio porque pueden contener configuración privada.

## Comandos disponibles

Ejecute los comandos desde la raíz del repositorio:

| Comando | Función |
| --- | --- |
| `npm install` | Instala las dependencias de ambos proyectos. |
| `npm run dev` | Inicia la API y el frontend en modo desarrollo. |
| `npm run start` | Inicia solamente la API sin modo de observación. |
| `npm test` | Ejecuta las pruebas de integración del backend. |
| `npm run build` | Genera la versión de producción del frontend. |

## Rutas de la aplicación

- `/`: bienvenida y navegación principal.
- `/registro`: formulario controlado para publicar una reseña.
- `/lista`: consulta y visualización de las reseñas almacenadas.

## API REST

### Consultar todos los registros

```http
GET /registros
```

Ejemplo con PowerShell:

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/registros"
```

Respuesta correcta: código `200` y un arreglo JSON.

```json
[]
```

### Crear un registro

```http
POST /registros
Content-Type: application/json
```

Ejemplo con PowerShell:

```powershell
$reseña = @{
  libro = "Cien años de soledad"
  nombre = "María Pérez"
  email = "maria@example.com"
  descripcion = "Una novela memorable sobre la familia Buendía."
  fecha = "2026-10-14"
  categoria = "Clásico"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/registros" `
  -ContentType "application/json" `
  -Body $reseña
```

Respuesta correcta: código `201` y el registro creado con `id` y `creadoEn` generados por el servidor.

```json
{
  "id": "7e73b80b-17a7-4a02-8440-3efba1a33a38",
  "libro": "Cien años de soledad",
  "nombre": "María Pérez",
  "email": "maria@example.com",
  "descripcion": "Una novela memorable sobre la familia Buendía.",
  "fecha": "2026-10-14",
  "categoria": "Clásico",
  "creadoEn": "2026-10-14T15:30:00.000Z"
}
```

Si los datos son inválidos, la API responde con código `400` y mensajes por campo.

## Validaciones

El frontend y el backend validan:

- título del libro, nombre, email, descripción, fecha y género obligatorios;
- formato válido del email;
- descripción de 10 a 1000 caracteres;
- fecha real que no esté en el futuro;
- género incluido en las opciones permitidas.

La validación del servidor es obligatoria aunque el navegador ya haya validado el formulario.

## Persistencia

Los registros se almacenan en `backend/data/registros.json`. Si el archivo no existe, el backend lo crea con una lista vacía. Cada registro nuevo se agrega sin borrar los anteriores. Los datos continúan disponibles después de reiniciar el servidor.

## Pruebas y compilación

Ejecute:

```bash
npm test
npm run build
```

Las pruebas comprueban:

- consulta de una lista vacía;
- rechazo de información inválida con código `400`;
- creación con código `201` y posterior consulta con código `200`;
- persistencia de los registros al recrear la aplicación.

## Seguridad del repositorio

- `node_modules`, compilaciones, archivos temporales y variables `.env` están excluidos mediante `.gitignore`.
- No se deben confirmar contraseñas, tokens, claves privadas ni otras credenciales.
- `frontend/.env.example` contiene únicamente una configuración pública de ejemplo.
