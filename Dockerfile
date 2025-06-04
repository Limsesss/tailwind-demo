# Используем официальное Node-окружение
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем
COPY client/package*.json ./client/
RUN cd client && npm install

# Копируем остальной проект
COPY . .

# Собираем проект
RUN cd client && npm run build

# Используем простой статический сервер
RUN npm install -g serve

# Стартуем сервер
CMD ["serve", "-s", "client/dist"]
