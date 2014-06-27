var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'UInt32', function() {
  
  var num = 876543129
  var xdr = new XDR()
  
  it( 'write an unsigned integer', function() {
    xdr.writeUInt32( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 4 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 4 )
  })
  
  it( 'read an unsigned integer', function() {
    assert.equal( xdr.readUInt32( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 4 )
  })
  
})
