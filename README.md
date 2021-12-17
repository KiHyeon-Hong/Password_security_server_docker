## Installation

### git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_server_docker.git
```

### Docker images

```bash
docker build . -t passwordsecurityserver
docker run -p 65001:65001 -d passwordsecurityserver

docker exec -it <container ID> /bin/bash
```
