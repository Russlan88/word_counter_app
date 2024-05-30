# Utilizza una immagine di base ufficiale di Node.js
FROM node:14

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia il package.json e il package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia i sorgenti del progetto
COPY . .

# Compila il progetto TypeScript
RUN npm run build

# Definisci il comando da eseguire quando il container viene avviato
CMD ["node", "dist/index.js"]
