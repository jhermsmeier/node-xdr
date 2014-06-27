var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Int32', function() {
  
  var num = -876543129
  var xdr = new XDR()
  
  it( 'write an integer', function() {
    xdr.writeInt32( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 4 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 4 )
  })
  
  it( 'read an integer', function() {
    assert.equal( xdr.readInt32( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 4 )
  })
  
})
