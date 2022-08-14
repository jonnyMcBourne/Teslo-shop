# Teslo-Shop
This is a Side project with Next.js for a e-commerce,

if you are new running this proyect or you just don't remember how to run it

first check in which branch is the current code.
install dependencies

## To run this project
### install dependencies
```
yarn install
```
then you have to run de database

### To run the database
```
docker-compose up -d
```
if you are in linux
```
sudo docker-compose up -d
```
then you have to change the name of the ```.env.template``` file to ```.env```

then you have to seed the database
### seed the dabase
```
http://localhost:3000/api/seed
```
### run it as development
```
yarn dev
```

