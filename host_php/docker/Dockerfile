FROM php:7.3.4-apache

RUN apt-get update && \
    apt-get install -y \
        git

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install \
        sockets \
        bcmath

WORKDIR /var/www/host_php
COPY ./composer.json .
COPY ./composer.lock .
#RUN composer require php-amqplib/php-amqplib
RUN composer install