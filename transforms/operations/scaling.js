Command = require('./command');

Scaling = function ( value, target)
{
  Command.call( this );
  this.type = "scaling";
  this.value = value;
  this.target = target;
}
Scaling.prototype = Object.create( Command.prototype );
Scaling.prototype.constructor=Scaling;
Scaling.prototype.clone = function()
{
  return new Scaling( this.value.clone(), this.target);
}

Scaling.prototype.undo = function()
{
      //FIXME: temp hack
      this.target._undoRedoFlag = true;  
  this.target.scale.x -= this.value.x;
  this.target.scale.y -= this.value.y;
  this.target.scale.z -= this.value.z;
}

Scaling.prototype.redo = function()
{
      //FIXME: temp hack
      this.target._undoRedoFlag = true;  
  this.target.scale.x += this.value.x;
  this.target.scale.y += this.value.y;
  this.target.scale.z += this.value.z;
}

module.exports = Scaling;
