if [ "${APP_ENV}" = "local" ]; then
  composer install --optimize-autoloader
  composer clear-cache
  php artisan optimize:clear
  find public -type l -delete
else
  php artisan key:generate
  php artisan optimize
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
fi

php artisan storage:link
php artisan migrate --force

chown -R www-data:www-data /app/storage
chmod -R 775 /app/storage

nginx

php-fpm
