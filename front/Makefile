run-dev:
	docker run --rm -it --network 168h_default -v "$(shell pwd):/usr/src/app" -w /usr/src/app -p 4200:4200 node npm run start

install-dependencies:
	docker run --rm -it -v "$(shell pwd):/usr/src/app" -w /usr/src/app node npm install
