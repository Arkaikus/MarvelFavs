build-web:
	docker-compose -p "marvelfavs" build web

run-web:
	docker-compose -p "marvelfavs" up -d web

stop-web:
	docker-compose -p "marvelfavs" stop web

build-dev:
	docker-compose -p "marvelfavs" build dev

run-dev:
	docker-compose -p "marvelfavs" up -d dev

stop-dev:
	docker-compose -p "marvelfavs" stop dev
