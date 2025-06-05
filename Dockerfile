# Используем Node.js
FROM node:18

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json из корня и устанавливаем зависимости сервера
COPY package*.json ./
RUN npm install

# Копируем client package.json и устанавливаем клиентские зависимости
COPY client/package*.json ./client/
RUN cd client && npm install && npm run build

# Копируем остальной код
COPY . .

# Экспонируем порт, на котором будет работать Express
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]