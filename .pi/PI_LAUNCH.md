# Pi Launch — Project Sora

Assumed Windows project path:

```text
D:\dev-works\project_sora
```

## Add project mount to `D:\pi-agent\docker-compose.yml`

Under the `pi-agent` service volumes, add:

```yaml
- D:/dev-works/project_sora:/workspace/sora
```

Keep the existing shared Pi config mounts:

```yaml
- D:/pi-agent/pi-config/models.json:/root/.pi/agent/models.json:ro
- D:/pi-agent/pi-config/settings.json:/root/.pi/agent/settings.json:ro
```

## Start container

```powershell
cd D:\pi-agent
docker compose up -d
```

## Launch Pi in Sora

```powershell
docker compose exec -w /workspace/sora pi-agent pi
```

Expected footer/workdir:

```text
/workspace/sora
```

## Local llama.cpp chain

If retaining the logging proxy:

```text
Pi Docker
 -> host.docker.internal:8081
 -> proxy.py
 -> 127.0.0.1:8080
 -> llama-server
```

The proxy must be running before Pi sends model requests.
