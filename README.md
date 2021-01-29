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

Run `make build` to create the docker image, then `make run` to start the container

the container runs on port `8081` feel free to change it in `docker-compose.yml`

### Heroku

- Login to heroku cli `heroku login`
- Create an app `heroky create marvel-favs`
- Bind remote `heroku git:remote -a marvel-favs`
- Login to the container registry `heroku container:login`
- Build the image with `make build`
- Run `docker image ls` and get the latest `image-id`
- Tag the image `docker tag image-id registry.heroku.com/marvel-favs/web`
- Push the image `docker push registry.heroku.com/marvel-favs/web`
- Finally release the app with `heroku container:release web`

Check the deployment [here](https://marvel-favs.herokuapp.com/)

## License

MIT License  
Check the LICENCE file