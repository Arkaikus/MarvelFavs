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

## Deploy

For deployment

### Docker

Run `make build` to create the docker image, then `make run` to start the container,
modify the port at `docker-compose.yml` file

## Licence

MIT License  
Check the LICENCE file