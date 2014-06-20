var XDR = require( '../' )
var assert = require( 'assert' )

describe( 'new XDR( buffer )', function() {
  
  it( 'should construct', function() {
    new XDR( new Buffer( 16 * 4 ) )
  })
  
  it( 'should be an instanceof XDR', function() {
    var xdr = new XDR( new Buffer( 16 ) )
    assert( xdr instanceof XDR )
  })
  
  it( 'should enforce 4 byte blocksize', function() {
    assert.throws( function() {
      new XDR( new Buffer( 3 ) )
    })
  })
  
  it( 'should create a zero length buffer if not given one', function() {
    var xdr = new XDR()
    assert( xdr.buffer instanceof Buffer )
    assert.equal( xdr.buffer.length, 0 )
  })
  
})
