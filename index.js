module.exports = {

    encode: function( userid, password ) {
        if ( ! userid || ! password ) {
            return null;
        }
        if ( typeof userid !== "string" || typeof password !== "string" ) {
            return null;
        }

        var userpass = [ userid, ":", password ].join( "" );
        var base64Userpass = new Buffer( userpass ).toString( "base64" );

        return [ "Basic", base64Userpass ].join( " " );
    },

    decode: function( credentials ) {
        if ( ! credentials || typeof credentials !== "string" ) {
            return null;
        }

        var schemeSplitted = credentials.split( " " );
        if ( schemeSplitted.length != 2) {
            return null;
        }

        if ( schemeSplitted[ 0 ] !== "Basic" ) {
            return null;
        }

        var userpass = new Buffer( schemeSplitted[ 1 ], "base64" ).toString();
        if ( ! userpass ) {
            return null;
        }

        var userpassSplitted = userpass.split( ":" );
        if ( userpassSplitted.length != 2 ) {
            return null;
        }

        if ( ! userpassSplitted[ 0 ] || ! userpassSplitted[ 1 ] ) {
            return null;
        }

        return { userid: userpassSplitted[ 0 ], password: userpassSplitted[ 1 ] };
    }
};
