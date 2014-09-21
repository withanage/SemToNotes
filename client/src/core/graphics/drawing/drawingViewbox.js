***REMOVED***
***REMOVED*** @fileoverview A class representing the view-box of a drawing canvas.
***REMOVED***

goog.provide('xrx.drawing.Viewbox');



goog.require('goog.math');
goog.require('goog.math.AffineTransform');
goog.require('xrx.drawing');



***REMOVED***
***REMOVED*** A class representing the view-box of a drawing canvas.
***REMOVED*** @param {xrx.drawing.Drawing} drawing The parent drawing object.
***REMOVED***
***REMOVED***
xrx.drawing.Viewbox = function(drawing) {

  this.drawing_ = drawing;

  this.group_;

  this.ctm_ = new goog.math.AffineTransform();

  this.state_ = xrx.drawing.State.NONE;

  this.origin_;

  this.create_();
***REMOVED***



***REMOVED***
***REMOVED*** Returns the parent drawing object of the view-box.
***REMOVED*** @return {xrx.drawing.Drawing} The drawing object.
***REMOVED***
xrx.drawing.Viewbox.prototype.getDrawing = function() {
  return this.drawing_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the group of the view-box.
***REMOVED*** @return {Object} The group.
***REMOVED***
xrx.drawing.Viewbox.prototype.getGroup = function() {
  return this.group_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the current transformation matrix of the view-box.
***REMOVED*** @return {goog.math.affineTransform} The transformation matrix.
***REMOVED***
xrx.drawing.Viewbox.prototype.getCTM = function() {
  return this.ctm_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the bounding-box for the view-box.
***REMOVED*** @return {goog.math.Box} The bounding box.
***REMOVED***
xrx.drawing.Viewbox.prototype.getBox = function() {
  var image = this.drawing_.getLayerBackground().getImage();
  return image.getGeometry().getBox();
***REMOVED***



***REMOVED***
***REMOVED*** Handles double-click events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED***
xrx.drawing.Viewbox.prototype.handleDblClick = function(e) {
  this.rotateRight();
***REMOVED***



***REMOVED***
***REMOVED*** Handles mouse-down events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED***
xrx.drawing.Viewbox.prototype.handleDown = function(e) {
  var eventPoint = [e.clientX, e.clientY];
  var transform = new goog.math.AffineTransform();

  if (!this.origin_) this.origin_ = new Array(2);

  transform.createInverse().transform(eventPoint, 0, this.origin_, 0, 1);

  this.state_ = xrx.drawing.State.DRAG;
***REMOVED***



***REMOVED***
***REMOVED*** Handles mouse-move events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED***
xrx.drawing.Viewbox.prototype.handleMove = function(e) {
  if (this.state_ !== xrx.drawing.State.DRAG) return;

  var point = new Array(2);
  var eventPoint = [e.clientX, e.clientY];
  var transform = new goog.math.AffineTransform();

  transform.createInverse().transform(eventPoint, 0, point, 0, 1);

  var x = point[0] - this.origin_[0];
  var y = point[1] - this.origin_[1];

  this.ctm_ = transform.translate(x, y).concatenate(this.ctm_);

  this.origin_ = point;
***REMOVED***



***REMOVED***
***REMOVED*** Handles mouse-out events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED*** /
xrx.drawing.Viewbox.prototype.handleOut = function(e) {
  this.resetState_();
***REMOVED***



***REMOVED***
***REMOVED*** Handles mouse-up events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED***
xrx.drawing.Viewbox.prototype.handleUp = function(e) {
  this.state_ = xrx.drawing.State.NONE;
***REMOVED***



***REMOVED***
***REMOVED*** Handles mouse-wheel events for the view-box.
***REMOVED*** @param {goog.events.BrowserEvent} e The browser event.
***REMOVED***
xrx.drawing.Viewbox.prototype.handleZoom = function(e) {
  e.deltaY < 0 ? this.zoomIn() : this.zoomOut();
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Viewbox.prototype.resetState_ = function() {
  this.state_ = xrx.drawing.State.NONE;
  this.origin_ = null;
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Viewbox.prototype.getCenterPoint_ = function() {
  var image = this.getDrawing().getLayerBackground().getImage();
  return [image.getWidth() / 2, image.getHeight() / 2];
***REMOVED***



***REMOVED***
***REMOVED*** Rotates the view-box by 90° in left direction.
***REMOVED***
xrx.drawing.Viewbox.prototype.rotateLeft = function() {
  var centerPoint = this.getCenterPoint_();
  this.ctm_.rotate(goog.math.toRadians(-90), centerPoint[0],
      centerPoint[1]);
***REMOVED***



***REMOVED***
***REMOVED*** Rotates the view-box by 90° in right direction.
***REMOVED***
xrx.drawing.Viewbox.prototype.rotateRight = function() {
  var centerPoint = this.getCenterPoint_();
  this.ctm_.rotate(goog.math.toRadians(90), centerPoint[0],
      centerPoint[1]);
***REMOVED***



***REMOVED***
***REMOVED*** Zoom in on the view-box.
***REMOVED***
xrx.drawing.Viewbox.prototype.zoomIn = function() {
  this.ctm_.scale(1.05, 1.05);
***REMOVED***



***REMOVED***
***REMOVED*** Zoom out the view-box.
***REMOVED***
xrx.drawing.Viewbox.prototype.zoomOut = function() {
  this.ctm_.scale(.95, .95);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Viewbox.prototype.create_ = function() {
  var graphics = this.drawing_.getGraphics();
  var canvas = this.drawing_.getCanvas();
  this.group_ = graphics.Group.create(canvas);
***REMOVED***