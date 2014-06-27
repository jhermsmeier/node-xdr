var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'UInt64', function() {
  
  var num = Math.pow( 2, 52 )
  var xdr = new XDR()
  
  it( 'write an unsigned 64bit integer', function() {
    xdr.writeUInt64( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 8 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 8 )
  })
  
  it( 'read an unsigned 64bit integer', function() {
    assert.equal( xdr.readUInt64( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 8 )
  })
  
})
