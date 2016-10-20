var should = require( "should" );
var httpBasicAuth = require( "../index" );

describe( "testing #encode() function", function() {
    it( "#encode() should succeed with userid and password", function() {
        var credentials = httpBasicAuth.encode( "testuserid", "testpassword" );
        should.exist( credentials );
        credentials.should.be.exactly( "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ=" );
    } );

    it( "#encode() should fail with one argument", function() {
        var credentials = httpBasicAuth.encode( "only one" );
        should.not.exist( credentials );
    } );

    it( "#encode() should fail with non-string arguments", function() {
        var credentials = httpBasicAuth.encode( "userid", 342 );
        should.not.exist( credentials );
    } );
} );

describe( "testing #decode() function", function() {
    it( "#decode() should succeed with proper argument", function() {
        var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ=" );
        should.exist( userinfo );
        userinfo.should.have.property( "userid", "testuserid" );
        userinfo.should.have.property( "password", "testpassword" );
    } );

    it( "#decode() should fail with invalid argument : no argument", function() {
        var userinfo = httpBasicAuth.decode();
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : non-string argument", function() {
        var userinfo = httpBasicAuth.decode( 123 );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : empty string", function() {
        var userinfo = httpBasicAuth.decode( "" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : no space", function() {
        var userinfo = httpBasicAuth.decode( "BasicdGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ=" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : more than one space", function() {
        var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ= space" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : not Basic scheme", function() {
        var userinfo = httpBasicAuth.decode( "Scheme dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ=" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : no colon (testuseridtestpassword)", function() {
        var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZHRlc3RwYXNzd29yZA==" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : more than one colon (testuserid:testpassword:malformed)", function() {
        var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZDp0ZXN0cGFzc3dvcmQ6bWFsZm9ybWVk" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : preceding colon (:testpassword)", function() {
        var userinfo = httpBasicAuth.decode( "Basic OnRlc3RwYXNzd29yZA==" );
        should.not.exist( userinfo );
    } );

    it( "#decode() should fail with invalid argument : following colon (testuserid:)", function() {
        var userinfo = httpBasicAuth.decode( "Basic dGVzdHVzZXJpZDo=" );
        should.not.exist( userinfo );
    } );
} );
