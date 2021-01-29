# MarvelFavs

This Ionic/React app is a client for Marvel Favs Api

## Setup

For development

- Download the repo with `git clone`
- Install ionic globally `npm install ionic -g`
- Open terminal in `app/` directory
- Install requirements with `npm install`
- Then launch the development server with `ionic serve`
- For bundling run `ionic build --prod`

This app comunicates with (marvel-favs-api)[https://marvel-favs-api.herokuapp.com] by default, 
change it in /app/src/data/api.ts line 41

## Deploy

For deployment

### Docker

#### Deployment only

You must have followed the steps in the *Setup* section above

Then run `make build-web` to create the docker image that copies the `app/build/` folder with the deployment
ready bundle, then `make run-web` to start the container

the container runs on port `8081` feel free to change it in `docker-compose.yml`

#### Build with no local dependences or npm

The steps in the *Setup* section above does not matter, the docker image creation process installs all the npm 
requirements and bundles the app

Run `make build-dev` to create the docker image, then `make run-dev` to start the container

the container runs on port `8082` feel free to change it in `docker-compose.yml`

### Heroku with Container Registry

- Login to heroku cli `heroku login`
- Create an app `heroky create marvel-favs` with the name you want instead of marvel-favs
- Bind remote `heroku git:remote -a marvel-favs`
- Login to the container registry `heroku container:login`
- Build the image with `make build-web`
- Run `docker image ls` and get the latest `image-id`
- Tag the image `docker tag image-id registry.heroku.com/marvel-favs/web`
- Push the image `docker push registry.heroku.com/marvel-favs/web`
- Finally release the app with `heroku container:release web`

Check the deployment [here](https://marvel-favs.herokuapp.com/)

## License

MIT License  
Check the LICENCE file