# App de Tareas Estilo Kanban

Esta app permite crear tareas, administrarlas, cambiarlas de stage, ademas tiene pomodoro, y la posibilidad de ganar coins por cada tarea echa, y poder cangearlo por recompensas.

## Multiples Stages para Organizar las tareas

![alt imagen](https://firebasestorage.googleapis.com/v0/b/hostingimage-8a5bd.appspot.com/o/images%2FScreenshot%202023-10-04%20124002.png?alt=media&token=ba0eb279-d47b-47fd-9512-4342ef614788 "Stages")

## Cada Tarea Grande, Tiene sub Tareas y Notas

![alt imagen](https://firebasestorage.googleapis.com/v0/b/hostingimage-8a5bd.appspot.com/o/images%2FScreenshot%202023-10-04%20124043.png?alt=media&token=83c3f7bb-4298-44aa-8a2b-574bfbc75d03 "SubTareas y Notas")

Las SubTareas pueden ser creadas para un solo dia, o para repetir cada dia que se necesite.

**Cada Nota Puede contener**:

- Imagenes
- Texto
- Titulos
- Videos De Yt

**Tiene dos botones**:

- Uno para Subir Archivos
- El otro para Utilizar la pizarra

  ![alt imagen](https://firebasestorage.googleapis.com/v0/b/hostingimage-8a5bd.appspot.com/o/images%2FScreenshot%20s-10-04%20124043.png?alt=media&token=c12908c7-a577-450f-bbb1-3344387e23c3 "Botones")
  La Pizzara:

  ![alt imagen](https://firebasestorage.googleapis.com/v0/b/hostingimage-8a5bd.appspot.com/o/images%2FScreenshot%202023-10-04%20124154.png?alt=media&token=7280c6c8-61b2-48fd-a8cd-2b102660ad6b "Botones")

## Tareas del Dia

Donde Se muestran las tareas pendientes del Dia, Ademas de los premios que se pueden cangear por los puntos.

## ![alt imagen](https://firebasestorage.googleapis.com/v0/b/hostingimage-8a5bd.appspot.com/o/images%2FScreenshot%202023-10-04%20124252.png?alt=media&token=f4f52a6e-7697-4e7f-979e-affedfa2faa5 "Tareas del Dia")

## Instalacion

```bash
sudo docker compose up -d back
sudo docker compose up -d front
```

> Es necesario inicializar las coins en cero

```bash
curl http://<ip o url>/v1/initcoin
```
