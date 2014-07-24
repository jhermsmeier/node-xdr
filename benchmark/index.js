var Next = require( '../' )
// var Stable = require( 'xdr' )

console.log( '[NEXT]', 'latest', Next.VERSION )
// console.log( '[STABLE]', Stable.VERSION )
console.log( '' )

suite( 'constructor', function() {
  
  bench( 'next', function() {
    var xdr = new Next()
  })
  
  // bench( 'stable', function() {
  //   var xdr = new Stable()
  // })
  
})

suite( 'int32', function() {
  
  var xdr = new Next()
  
  bench( 'write', function() {
    xdr.writeInt32( -1234, 0 )
  })
  
  bench( 'read', function() {
    xdr.readInt32( 0 )
  })
  
})

suite( 'int64', function() {
  
  var xdr = new Next()
  var num = Math.pow( 2, 50 )
  
  // bench( 'write', function() {
  //   xdr.writeInt64( num, 0 )
  // })
  
  // bench( 'read', function() {
  //   xdr.readInt64( 0 )
  // })
  
})

suite( 'uint32', function() {
  
  var xdr = new Next()
  
  bench( 'write', function() {
    xdr.writeUInt32( 1234, 0 )
  })
  
  bench( 'read', function() {
    xdr.readUInt32( 0 )
  })
  
})

suite( 'uint64', function() {
  
  var xdr = new Next()
  var num = Math.pow( 2, 50 )
  
  bench( 'write', function() {
    xdr.writeUInt64( num, 0 )
  })
  
  bench( 'read', function() {
    xdr.readUInt64( 0 )
  })
  
})

suite( 'float', function() {
  
  var xdr = new Next()
  
  bench( 'write', function() {
    xdr.writeFloat( -1234.56789, 0 )
  })
  
  bench( 'read', function() {
    xdr.readFloat( 0 )
  })
  
})

suite( 'double', function() {
  
  var xdr = new Next()
  var num = Math.pow( 2, 50 ) / 145
  
  bench( 'write', function() {
    xdr.writeDouble( 123456789, 0 )
  })
  
  bench( 'read', function() {
    xdr.readDouble( 0 )
  })
  
})

suite( 'bool', function() {
  
  var xdr = new Next()
  
  bench( 'write', function() {
    xdr.writeBool( true, 0 )
  })
  
  bench( 'read', function() {
    xdr.readBool( 0 )
  })
  
})
