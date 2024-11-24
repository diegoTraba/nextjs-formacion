## Next.js Dashboard

Proyecto hecho siguiendo el tutorial de la pagina oficial nextjs.

## Prerequisitos
- Instalar git -> https://git-scm.com/downloads
- Instalar pnpm -> npm install -g pnpm

## Crear nuevo proyecto
npx create-next-app@latest nextjs-dashboard --use-pnpm
    [1]                    [2]              [3]      

1. create-next-app@latest -> Crea un proyecto nuevo con la ultima version de NextJS
2. nextjs-dashboard -> Nombre que le damos al proyecto
3. --use-pnpm -> Para usar pnpm como gestor de paquetes en lugar de npm o yarn que son mas lentos

## Estructura del proyecto
![alt text](learn-folder-structure.avif)

## Ejecutar el proyecto
pnpm dev

## Push a github
git add .  
git commit -m "Descripción de los cambios"  
git pull origin main --rebase (cogemos los cambios del repositorio)  
git push -u origin main (primera vez, resto de veces sin el -u)  

## Pull de remoto a local
git pull origin main
