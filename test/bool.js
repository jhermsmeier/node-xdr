var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Boolean', function() {
  
  var xdr = new XDR()
  
  it( 'write a boolean', function() {
    assert.equal( xdr.buffer.length, 0 )
    xdr.writeBool( true )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 4 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 4 )
  })
  
  it( 'read a boolean', function() {
    assert( xdr.readBool( 0 ) )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 4 )
  })
  
})
