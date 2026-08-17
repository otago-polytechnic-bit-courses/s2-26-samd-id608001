# Module 7

## Task 1
```json
{
  "token_type": "access",
  "exp": 1786924184,
  "iat": 1786923884,
  "jti": "83a2b9eaa3434ad6878a2958bd8d2eda",
  "user_id": "3"
}
```
exp = The expiraiton time of the token
iat = The time the token was issued
jti = The Unique ID for the JWT
user_id = The ID of the user who created the JWT provided by DRF

Changing a Character of the JWT changes the validity of it. If a character in the second segment is changed then the payload is changed.


## Task 2

curl -i -X PATCH http://127.0.0.1:8000/api/studios/6/   -H "Authorization: Bearer $HEMI"   -H "Content-Type: application/json"   -d '{"name": "Hemi Was Here"}'

HTTP/1.1 403 Forbidden
Date: Mon, 17 Aug 2026 00:18:50 GMT
Server: WSGIServer/0.2 CPython/3.14.2
Content-Type: application/json
Vary: Accept
Allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS
X-Frame-Options: DENY
Content-Length: 63
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin

{"detail":"You do not have permission to perform this action."}

## Task 3

"A user who owns a studio may add a class to the studio"
"A user who does not own a studio may not add a class"

### Attempt to add a class to a studio not owned by user

curl -i -X POST http://127.0.0.1:8000/api/classes/   -H "Authorization: Bearer $HEMI"   -H "Content-Type: application/json"   -d '{"studio": 8, "name": "secret skils"}'
HTTP/1.1 403 Forbidden
Date: Mon, 17 Aug 2026 01:05:56 GMT
Server: WSGIServer/0.2 CPython/3.14.2
Content-Type: application/json
Vary: Accept
Allow: GET, POST, HEAD, OPTIONS
X-Frame-Options: DENY
Content-Length: 63
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin

{"detail":"You do not have permission to perform this action."}

### Attempt to add a class to a studio owned by user

curl -i -X POST http://127.0.0.1:8000/api/classes/   -H "Authorization: Bearer $SUPER"   -H "Content-Type: application/json"   -d '{"studio": 8, "name": "secret skils"}'
HTTP/1.1 201 Created
Date: Mon, 17 Aug 2026 01:06:10 GMT
Server: WSGIServer/0.2 CPython/3.14.2
Content-Type: application/json
Vary: Accept
Allow: GET, POST, HEAD, OPTIONS
X-Frame-Options: DENY
Content-Length: 42
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin

{"id":11,"studio":8,"name":"secret skils"}

### Attempt to list all studio classes

curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/api/classes/   -H "Authorization: Bearer $HEMI"
200

### Attempt to view a studio classes details

curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/api/classes/11/   -H "Authorization: Bearer $HEMI"
200