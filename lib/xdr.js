/**
 * XDR constructor
 * @returns {XDR}
 */
function XDR( buffer ) {
  
  if( !(this instanceof XDR) )
    return new XDR( buffer )
  
  if( buffer instanceof Buffer && buffer.length % 4 !== 0 )
    throw new Error( 'Byte count must be a multiple of 4' )
  
  this._offset = 0
  this._depth = 0
  this.buffer = buffer instanceof Buffer ?
    buffer : new Buffer( 0 )
  
}

/**
 * Package Version
 * @type {String}
 */
XDR.VERSION = require( '../package' ).version

/**
 * XDR prototype
 * @type {Object}
 */
XDR.prototype = {
  
  constructor: XDR,
  
  get length() {
    return this.buffer.length
  },
  
  set length( value ) {
    
    var delta = value - this.length
    var length = this.length + delta
    
    // Positive delta -> grow
    if( delta > 0 ) {
      // Align with 4 byte block size
      length += 4 - ( length % 4 )
      // Create new buffer to concat & zerofill
      var space = new Buffer( delta )
      space.fill( 0 )
      // Concat buffer & fill buffer
      this.buffer = Buffer.concat([
        this.buffer, space
      ])
    }
    
    // Negative delta -> shrink
    if( delta < 0 ) {
      // Align with 4 byte block size
      length -= 4 - ( Math.abs( length ) % 4 )
      // Slice buffer to calculated length
      this.buffer = this.buffer.slice(
        0, this.length + delta
      )
    }
    
  },
  
  get offset() {
    return this._offset
  },
  
  set offset( value ) {
    this._offset = value == null ?
      this._offset : value
  },
  
  expand: function( length ) {
    var delta = Math.abs( this.length - this.offset )
    if( delta <= length ) {
      this.length += Math.abs( delta - length )
    }
  },
  
  seek: function( offset ) {
    // Make sure that even if you call
    // seek while iterating on an array;
    // nothing happens. It would be stupid.
    if( this._depth === 0 )
      this.offset = offset || 0
  },
  
  readUInt32: function( offset ) {
    this.offset = offset
    var value = this.buffer.readUInt32BE( this.offset )
    this.offset += 4
    return value
  },
  
  readInt32: function( offset ) {
    this.offset = offset
    var value = this.buffer.readInt32BE( this.offset )
    this.offset += 4
    return value
  },
  
  readUInt64: function( offset ) {
    
    this.offset = offset
    
    var hi = this.readUInt32()
    var lo = this.readUInt32()
    
    return (( hi * 4294967296 ) + lo )
    
  },
  
  readInt64: function( offset ) {
    throw new Error( 'Not implemented' )
  },
  
  readFloat: function( offset ) {
    this.offset = offset
    var value = this.buffer.readFloatBE()
    this.offset += 4
    return value
  },
  
  readDouble: function( offset ) {
    this.offset = offset
    var value = this.buffer.readDoubleBE()
    this.offset += 8
    return value
  },
  
  readBytes: function( offset, length ) {
    return this.buffer.slice( offset, offset + length )
  },
  
  readBuffer: function( offset ) {
    var length = this.readUInt32( offset )
    return this.buffer.slice( this.offset, this.offset + length )
  },
  
  readBool: function( offset ) {
    this.offset = offset
    var value = this.buffer[ this.offset ] === 1
    this.offset += 4
    return value
  },
  
  readString: function( offset, encoding ) {
    // Work out the offset
    this.offset = offset
    // Read strlen
    var length = this.readUInt32( this.offset )
    // Stringify
    return this.buffer.toString(
      encoding || 'ascii',
      this.offset,
      this.offset += length
    )
  },
  
  readArray: function( offset, size, iterator ) {
    
    // Work out the offset
    this.offset = offset
    // If no size is given,
    // read as variable size array
    size = size != null ?
      size : this.readUInt32( offset )
    
    var array = new Array( size )
    
    this._depth++
    
    for( var i = 0; i < size; i++ ) {
      array[i] = iterator.call( this, this, i, size )
    }
    
    this._depth--
    
    return array
    
  },
  
  writeUInt32: function( value, offset ) {
    this.expand( 4 )
    this.offset = offset
    this.buffer.writeUInt32BE( ( value >>> 0 ), this.offset )
    this.offset += 4
    return this
  },
  
  writeInt32: function( value, offset ) {
    this.expand( 4 )
    this.offset = offset
    this.buffer.writeInt32BE( ( value >> 0 ), this.offset )
    this.offset += 4
    return this
  },
  
  writeUInt64: function( value, offset ) {
    
    this.expand( 8 )
    
    var hi = value / 4294967296
    var lo = value & 0xFFFFFFFF
    
    this.writeUInt32( hi )
    this.writeUInt32( lo )
    
    return this
    
  },
  
  writeInt64: function( value, offset ) {
    this.expand( 8 )
    throw new Error( 'Not implemented' )
  },
  
  writeFloat: function( value, offset ) {
    this.expand( 4 )
    this.offset = offset
    this.buffer.writeFloatBE( value, this.offset )
    this.offset += 4
    return this
  },
  
  writeDouble: function( value, offset ) {
    this.expand( 8 )
    this.offset = offset
    this.buffer.writeDoubleBE( value, this.offset )
    this.offset += 8
    return this
  },
  
  writeBytes: function( value, offset, length ) {
    
    // Check if dynamicly size buffer,
    // prepend length as UInt32 if so
    if( length === void 0 ) {
      this.writeUInt32( value.length )
      this.expand( value.length )
    } else {
      this.expand( length )
    }
    
    value.copy( this.buffer, this.offset )
    
    return this
    
  },
  
  writeBuffer: function( value, offset ) {
    return this.writeBuffer( value, offset )
  },
  
  writeBool: function( value, offset ) {
    this.expand( 4 )
    this.offset = offset
    this.buffer[ this.offset ] = value ? 1 : 0
    this.offset += 4
    return this
  },
  
  writeString: function( value, offset, encoding ) {
    throw new Error( 'Not implemented' )
  },
  
  writeArray: function( value, offset, size, iterator ) {
    
    this.offset = offset
    
    // If no size is given,
    // this is an array of dynamic size
    if( size == null ) {
      this.writeUInt32( value.length )
    } else {
      size = value.length
    }
    
    this._depth++
    
    for( var i = 0; i < size; i++ ) {
      iterator.call( this, this, i, size )
    }
    
    this._depth--
    
    return this
    
  },
  
}

// Exports
module.exports = XDR
