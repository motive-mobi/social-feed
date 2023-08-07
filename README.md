
# Feed de posts

Feed simples para criação, edição e remoção de posts.
 - Frontend: Angular 12
 - Backend: Laravel 8
 - PHP 7.4
 - MySQL 5.6 (database hospedada localmente via Docker)

## Autor

- Alexandre Tucunduva | [@motive-mobi](https://www.github.com/motive-mobi)


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexandre-tucunduva-671472106/)


## Deploy

Comandos utilizados no deploy deste projeto:

### 1. Criando e executando o container:
```bash
cd social-feed/
docker build -t social-feed-database .
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root social-feed-database
```

### 2. Backend Laravel:

Clona o repositório:
```bash
git clone git@github.com:motive-mobi/social-feed.git
```

Instalação das dependências do backend:
```bash
cd social-feed/backend/
composer install
cp .env.example .env
```
Editar a seguinte seção do .env para apontar corretamente o banco de dados criado no docker:
```bash
DB_CONNECTION=mysql
DB_HOST=172.17.0.2
DB_PORT=3306
DB_DATABASE=social
DB_USERNAME=admin
DB_PASSWORD=admin
```
Gerar a chave da aplicação:
```bash
php artisan key:generate
```
Migração das tabelas do banco de dados:
```bash
php artisan migrate
```
Populando o banco de dados inicial (OPCIONAL):
```bash
php artisan db:seed --class=PostSeeder
```
Iniciando a aplicação localmente:
```bash
php artisan serve
```

### 3. Frontend Angular:
Instalação das dependências do frontend:
```bash
cd social-feed/frontend/
npm install
```
Iniciando a aplicação localmente:
```bash
ng serve
```
Após o deploy, a aplicação pode ser acessada via browser:
http://localhost:4200
## Referências

- [Download e instalação do Docker](https://docs.docker.com/get-docker/)

