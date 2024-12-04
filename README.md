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

## ESLint  
ESLint se utiliza para ayudar a detectar problemas de accesibilidad de forma temprana. Advierte si tiene imágenes sin alttexto, utiliza los  atributos aria-* y  role de forma incorrecta, etc.  
Para activarlo, solo hay que incluir el parametro en la seccion scripts de package.json de la siguente maneran: "lint": "next lint"  y a continuación, en la terminal escribimos pnpm lint y lo instalaremos. Una vez finalizada la instalacion, simplemente escribiremos en la terminal de visual studio pnpm lint y nos mostrara los errores. Si hacemos click en un error, nos llevara a la linea que está produciendo el error.

## Errores comunes  
Es posible que en la consola de Next.js aparezca el siguiente error: Failed to get source map: [Error: Unknown url scheme] { code: 'GenericFailure' }  
Este error ocurre por culpa de una incidencia de NEXT 15 con turboPack. Normalmente sale cuando tienes la consola del navegador abierta y dejan de salir cuando la cierrras.  

## Push a github
git add .  
git commit -m "Descripción de los cambios"  
git pull origin main --rebase (cogemos los cambios del repositorio)  
git push -u origin main (primera vez, resto de veces sin el -u)  

## Pull de remoto a local
git pull origin main
