var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Float', function() {
  
  var num = -1234.56789
  var xdr = new XDR()
  
  it( 'write a float', function() {
    xdr.writeFloat( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 4 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 4 )
  })
  
  it( 'read a float', function() {
    assert.equal( xdr.readFloat( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 4 )
  })
  
})
