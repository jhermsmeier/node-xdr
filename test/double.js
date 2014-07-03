var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Double', function() {
  
  var num = Math.pow( 2, 50 ) / 145
  var xdr = new XDR()
  
  it( 'write a double', function() {
    xdr.writeDouble( num )
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, 8 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, 8 )
  })
  
  it( 'read a double', function() {
    assert.equal( xdr.readDouble( 0 ), num )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 8 )
  })
  
})
