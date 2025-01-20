FROM php:8.3-fpm

# Instalando dependências
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Instalando extensões PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalando Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurando diretório de trabalho
WORKDIR /var/www/html

# Copiando arquivo de configuração do PHP
COPY .docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini

COPY --chown=www-data:www-data . /app

WORKDIR /app

RUN chmod -R 775 storage/
RUN chmod -R 775 bootstrap/cache/
RUN chmod -R 775 storage/logs/
RUN chmod -R 775 storage/framework/

COPY .docker/entrypoint.sh /entrypoint.sh

RUN composer install --optimize-autoloader --no-dev

WORKDIR /app
RUN chmod +x /entrypoint.sh
ENTRYPOINT sh /entrypoint.sh

EXPOSE 9000
