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
    // We need to compare nums fixed to one decimal place
    // here, since that seems to be all the accuracy we can get
    // from JS -> BE float buffer conversions
    assert.equal( xdr.readFloat( 0 ).toFixed(1), num.toFixed(1) )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, 4 )
  })
  
})
