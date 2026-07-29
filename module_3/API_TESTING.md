# Studios

$curl http://127.0.0.1:8000/api/studios/

```
[{"id":1,"name":"studio1","suburb":"South Dunedin","city":"Dunedin","created_at":"2026-07-21T21:47:26.187658Z"},{"id":2,"name":"studio2","suburb":"North Dunedin","city":"Dunedin","created_at":"2026-07-21T21:47:58.130824Z"},{"id":3,"name":"studio3","suburb":"studio3 suburb","city":"Auckland","created_at":"2026-07-21T21:48:14.178806Z"},{"id":4,"name":"unfit","suburb":"Kaikori Valley","city":"Dunedin","created_at":"2026-07-29T01:09:48.439025Z"},{"id":5,"name":"unfit","suburb":"Kaikori Valley","city":"Dunedin","created_at":"2026-07-29T01:10:12.972844Z"}]
```

$ curl -X POST http://127.0.0.1:8000/api/studios/ \
  -H "Content-Type: application/json" \
  -d '{"name": "CityFit", "suburb": "Dunedin Central", "city": "Dunedin"}'

```
{"id":6,"name":"CityFit","suburb":"Dunedin Central","city":"Dunedin","created_at":"2026-07-29T01:13:04.348519Z"}
```

$ curl -X PUT http://127.0.0.1:8000/api/studios/6/   -H "Content-Type: application/json"   -d '{"name": "CityFitness", "suburb": "Dunedin Central", "city": "Dunedin"}'

```
{"id":6,"name":"CityFitness","suburb":"Dunedin Central","city":"Dunedin","created_at":"2026-07-29T01:13:04.348519Z"}
```

$ curl -X DELETE http://127.0.0.1:8000/api/studios/6/   -H "Content-Type: application/json"

```

```

$ curl http://127.0.0.1:8000/api/studios/?city=Auckland

```
[{"id":3,"name":"studio3","suburb":"studio3 suburb","city":"Auckland","created_at":"2026-07-21T21:48:14.178806Z"}]
```

# Classes

$ curl http://127.0.0.1:8000/api/classes/

```
[{"id":1,"studio":1,"name":"studio class 1"},{"id":2,"studio":2,"name":"studio class 2"},{"id":3,"studio":3,"name":"studio class 3"},{"id":4,"studio":2,"name":"studio2class2"}]
```

$ curl -X POST http://127.0.0.1:8000/api/classes/   -H "Content-Type: application/json"   -d '{"studio": 5, "name": "cardio"}'

```
{"id":5,"studio":5,"name":"cardio"}
```

$ curl -X PUT http://127.0.0.1:8000/api/classes/5/   -H "Content-Type: application/json"   -d '{"studio": 5, "name": "cardio - running"}'

```
{"id":5,"studio":5,"name":"cardio - running"}
```

$ curl -X DELETE http://127.0.0.1:8000/api/classes/5/   -H "Content-Type: application/json"

```

```



