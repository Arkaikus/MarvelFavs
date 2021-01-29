build:
	docker-compose -p "marvelfavs" build client

run:
	docker-compose -p "marvelfavs" up -d client

stop:
	docker-compose -p "marvelfavs" stop client
