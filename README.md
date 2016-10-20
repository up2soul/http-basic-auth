# http-basic-auth
Simple HTTP Basic access authentication encoding/decoding utility

## Installation

```
$ npm install https://github.com/up2soul/http-basic-auth.git
```

## Usage

#### encode( "userid", "password" ) -> "basic-credentials"

encode() function accepts userid and password as String type parameters, and returns encoded Basic credentials. If parameters are not valid, function returns null.

```
var httpBasicAuth = require( "http-basic-auth" );

var credentials = httpBasicAuth.encode( "testuserid", "testpassword" );
// 'credentials' value is "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ="
```

#### decode( "basic-credentials" ) -> { userid: "userid", password: "password" }

decode() function accepts basic-credentials as String type parameter, and returns userid and password as Object type. If the parameter is not valid, function returns null.

```
var httpBasicAuth = require( "http-basic-auth" );

var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ=" );
// 'userinfo' value is { userid: "testuserid", password: "testpassword" }
```

## License
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
