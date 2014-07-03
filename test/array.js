var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'Array', function() {
  
  var array = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  var xdr = new XDR()
  
  it( 'write a fixed size Array', function() {
    xdr.writeArray( array, 0, array.length, function( xdr, i, size ) {
      xdr.writeUInt32( array[i] )
    })
  })
  
  it( 'expand buffer size on write', function() {
    assert.equal( xdr.buffer.length, array.length * 4 )
  })
  
  it( 'advance offset on write', function() {
    assert.equal( xdr.offset, array.length * 4 )
  })
  
  it( 'read a fixed size Array', function() {
    var result = xdr.readArray( 0, array.length, function( xdr, i, size ) {
      return xdr.readUInt32()
    })
    assert.deepEqual( result, array )
  })
  
  it( 'advance offset on read', function() {
    assert.equal( xdr.offset, array.length * 4 )
  })
  
})
