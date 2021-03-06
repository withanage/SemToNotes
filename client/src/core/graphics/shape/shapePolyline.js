/**
 * @fileoverview
 */

goog.provide('xrx.shape.Polyline');



goog.require('xrx.shape.Shape');



/**
 * @constructor
 */
xrx.shape.Polyline = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.shape.Polyline, xrx.shape.Shape);



xrx.shape.Polyline.prototype.engineClass_ = 'Polyline';



xrx.shape.Polyline.prototype.appendCoord = function(coord) {
  this.engineShape_.appendCoord(coord);
};



xrx.shape.Polyline.create = function(drawing) {
  return new xrx.shape.Polyline(drawing);
};
