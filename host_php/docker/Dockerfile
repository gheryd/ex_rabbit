FROM php:7.3.4-apache

RUN apt-get update && \
    apt-get install -y apt-utils git
RUN apt-get install -y libzip-dev

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install \
        sockets \
        bcmath \
        zip

WORKDIR /var/www/host_php
COPY ./composer.json /var/www/host_php/composer.json
#COPY ./composer.lock /var/www/host_php/composer.lock
#RUN composer update nothing
#RUN composer init
#RUN composer require php-amqplib/php-amqplib
#RUN composer require predis/predis
RUN composer install --no-interaction