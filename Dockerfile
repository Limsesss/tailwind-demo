# Используем Node.js
FROM node:18

# Рабочая директория
WORKDIR /app

# Копируем package.json и lock-файлы (сервер)
COPY package*.json ./

# Устанавливаем зависимости backend
RUN npm install

# Копируем client отдельно
COPY client/package*.json ./client/

# Копируем весь остальной проект
COPY . .

# Устанавливаем зависимости и билдим фронт
RUN cd client && npm install && npm run build

# Экспонируем порт
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]