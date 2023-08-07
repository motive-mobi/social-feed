# Cria o container do banco de dados MySQL

FROM mysql:5.6
MAINTAINER motive.mobi@mail.com
ENV MYSQL_ROOT_PASSWORD root
COPY create-database.sql /docker-entrypoint-initdb.d/
EXPOSE 3306