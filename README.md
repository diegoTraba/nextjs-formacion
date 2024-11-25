## Next.js Dashboard

Proyecto hecho siguiendo el tutorial de la pagina oficial nextjs.

## Prerequisitos
- Instalar git -> https://git-scm.com/downloads
- Instalar pnpm -> npm install -g pnpm

## Crear nuevo proyecto
npx create-next-app@latest nextjs-dashboard --use-pnpm     

1. create-next-app@latest -> Crea un proyecto nuevo con la ultima version de NextJS
2. nextjs-dashboard -> Nombre que le damos al proyecto
3. --use-pnpm -> Para usar pnpm como gestor de paquetes en lugar de npm o yarn que son mas lentos

## Estructura del proyecto
![alt text](learn-folder-structure.avif)    

- /app -> Contiene todas las rutas, componentes y lógicas para tu aplicación, aquí es de donde trabajarás principalmente.  
- /app/lib -> Contiene funciones utilizadas en su aplicación, como funciones de utilidad reutilizables y funciones de obtención de datos.  
- /app/ui -> Contiene todos los componentes de la interfaz de usuario para su aplicación, como tarjetas, tablas y formularios. Para ahorrar tiempo, hemos prediseñado estos componentes para usted.  
- /public -> Contiene todos los activos estáticos para su aplicación, como imágenes.   
p
## Ficheros especiales
- /app/lib/definitions.ts -> Definimos los modelos que serán devueltos de la base de datos.  
- /app/ui/global.css -> estilos generales del proyecto.  
- /app/ui/fonts.ts -> fichero que contiene las fuentes del proyecto.

## Ejecutar el proyecto
- pnpm i -> Instala los paquetes del proyecto
- pnpm dev -> Inicia el servidor de desarrollo

## Push a github
git add .  
git commit -m "Descripción de los cambios"  
git pull origin main --rebase (cogemos los cambios del repositorio)  
git push -u origin main (primera vez, resto de veces sin el -u)  

## Pull de remoto a local
git pull origin main
