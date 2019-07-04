
default: docker-node-bash


docker-node-bash:
	docker run -it --rm -p 80:5000 -v `pwd`:/app -w /app node bash
.PHONY: docker-node-bash
