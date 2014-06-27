var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Int64', function() {
  
  var num = -Math.pow( 2, 48 )
  var xdr = new XDR()
  
  it( 'write an integer', function() {
    xdr.writeInt64( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 8 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 8 )
  })
  
  it( 'read an integer', function() {
    assert.equal( xdr.readInt64( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 8 )
  })
  
})
