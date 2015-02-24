Command = require('./command');

Rotation = function ( value, target)
{
  Command.call( this );
  this.type = "rotation";
  this.value = value;
  this.target = target;
}
Rotation.prototype = Object.create( Command.prototype );
Rotation.prototype.constructor=Rotation;
Rotation.prototype.clone = function()
{
  return new Rotation( this.value.clone(), this.target);
}

Rotation.prototype.undo = function()
{
    //this.target.position.sub(this.value);
      //FIXME: temp hack
      this.target._undoRedoFlag = true;  
    this.target.rotation.x -= this.value.x;
    this.target.rotation.y -= this.value.y;
    this.target.rotation.z -= this.value.z;
}

Rotation.prototype.redo = function()
{
      //FIXME: temp hack
      this.target._undoRedoFlag = true;  
    this.target.rotation.x += this.value.x;
    this.target.rotation.y += this.value.y;
    this.target.rotation.z += this.value.z;
}

module.exports = Rotation;
