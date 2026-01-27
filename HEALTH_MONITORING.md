# Health Check & Monitoring

## Server Health Endpoints

```bash
# Basic health check
curl http://localhost:5000/health

# Detailed health with database status
curl http://localhost:5000/api/health
```

## Docker Health Checks

```bash
# Check container health
docker ps | grep mern

# View logs
docker logs mern-server
docker logs mern-client
docker logs mern-mongo

# Exec into container
docker exec -it mern-server sh
docker exec -it mern-mongo mongosh
```

## Kubernetes Health Checks

```bash
# Get pod status
kubectl get pods

# View pod logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>

# Describe pod (events, conditions)
kubectl describe pod <pod-name>

# Port forward for local testing
kubectl port-forward svc/server 5000:5000
kubectl port-forward svc/client 3000:80
```

## Common Health Check URLs

| Service | URL | Expected |
|---------|-----|----------|
| Server Health | `http://localhost:5000/health` | 200 OK |
| Server API | `http://localhost:5000/api/cars` | 200 OK (JSON) |
| Client | `http://localhost:3000` | 200 OK (HTML) |
| MongoDB | `mongosh` | Connected |

## Monitoring & Logs

### Docker Compose Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongo
```

### Kubernetes Logs
```bash
# All pods in namespace
kubectl logs -l app=server --tail=100

# Stream logs
kubectl logs -f deployment/server

# Previous logs (if pod crashed)
kubectl logs <pod-name> --previous
```

## Performance Monitoring

```bash
# Docker stats
docker stats

# Kubernetes metrics
kubectl top nodes
kubectl top pods

# Pod resource requests
kubectl describe pod <pod-name> | grep -A 3 Requests
```

## Database Health

```bash
# MongoDB replica set status
mongosh --eval "rs.status()"

# Check connection string
echo $MONGODB_URI

# Test MongoDB connection
mongosh "$MONGODB_URI"
```
