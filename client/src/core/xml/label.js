***REMOVED***
***REMOVED*** @fileoverview A class representing a numeric, array like 
***REMOVED*** XML labeling scheme known as Dewey ID.
***REMOVED***

goog.provide('xrx.label');



***REMOVED***
***REMOVED*** Constructs a new label.
***REMOVED***
***REMOVED***
***REMOVED*** @param {?Array.<!number>} array The array of numbers.
***REMOVED***
xrx.label = function(array) {
  this.label_ = array || [];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the length of the label. The length corresponds 
***REMOVED*** to the nesting depth of a node or token in the XML tree.
***REMOVED*** @return {!number}
***REMOVED***
xrx.label.prototype.length = function() {
  return this.label_.length;
***REMOVED***



***REMOVED***
***REMOVED*** Returns a label item at position index.
***REMOVED*** @param {!number} index The index. 
***REMOVED*** @return {!number}
***REMOVED***
xrx.label.prototype.value = function(index) {
  return this.label_[index];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the first label item.
***REMOVED*** @return {!number} 
***REMOVED***
xrx.label.prototype.first = function() {
  return this.label_[0];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the last label item.
***REMOVED*** @return {!number}
***REMOVED***
xrx.label.prototype.last = function() {
  return this.label_[this.length() - 1];
***REMOVED***



***REMOVED***
***REMOVED*** Adds a value to the end of the label array.
***REMOVED***
xrx.label.prototype.push = function(value) {
  this.label_.push(value);
***REMOVED***



***REMOVED***
***REMOVED*** Removes the last item of the label array and
***REMOVED*** return the value of the item.
***REMOVED*** @return {!number}
***REMOVED***
xrx.label.prototype.pop = function(value) {
  return this.label_.pop();
***REMOVED***




***REMOVED***
***REMOVED*** Returns a copy of the label.
***REMOVED*** @return {!xrx.label}
***REMOVED***
xrx.label.prototype.clone = function() {
  var length = this.length();
  var array = new Array(length);

  for(var i = 0; i < length; i++) {
    array[i] = this.label_[i];
  }
  return new xrx.label(array);
***REMOVED***



***REMOVED***
***REMOVED*** Returns the joint parent of two labels.
***REMOVED*** @param {!xrx.label} label
***REMOVED*** @return {!xrx.label}
***REMOVED***
xrx.label.prototype.jointParent = function(label) {
  var arr = [];

  for(var i = 0; i < label.length(); i++) {
    val = this.label_[i];
    val === label.value(i) ? arr.push(val) : null;
  }
  return arr.length === 0 ? new xrx.label() : new xrx.label(arr);
***REMOVED***



***REMOVED***
***REMOVED*** Mutates the label into its parent label.
***REMOVED***
xrx.label.prototype.parent = function() {
  this.label_.pop();
***REMOVED***



***REMOVED***
***REMOVED*** Mutates the label into its child label.
***REMOVED***
xrx.label.prototype.child = function() {
  this.label_.push(1);
***REMOVED***



***REMOVED***
***REMOVED*** Mutates the label into its preceding sibling label.
***REMOVED***
xrx.label.prototype.precedingSibling = function() {
  this.label_[this.length() - 1] -= 1;
***REMOVED***



***REMOVED***
***REMOVED*** Mutates the label into its next sibling label.
***REMOVED***
xrx.label.prototype.nextSibling = function() {
  this.label_[this.length() - 1] += 1;
***REMOVED***



***REMOVED***
***REMOVED*** Helper function for xrx.token.NOT_TAG.
***REMOVED***
xrx.label.prototype.push0 = function() {
  this.label_.push(0);
***REMOVED***



***REMOVED***
***REMOVED*** Indicates whether two labels are the same.
***REMOVED*** @param {!xrx.label}
***REMOVED*** @return {!boolean}
***REMOVED***
xrx.label.prototype.sameAs = function(label) {

  if (this.label_.length !== label.length()) {
    return false;
  }
  for(var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) {
      return false;
    }
  }
  return true;
***REMOVED***



***REMOVED***
***REMOVED*** Tests whether a label is the root label.
***REMOVED*** @return {!boolean} 
***REMOVED***
xrx.label.prototype.isRoot = function() {
  return this.label_.length === 0;
***REMOVED***



***REMOVED***
***REMOVED*** Tests whether the label appears before another label
***REMOVED*** in document order.
***REMOVED*** @return {!boolean} 
***REMOVED***
xrx.label.prototype.isBefore = function(label) {

  for(var i = 0; i < this.length(); i++) {
    if (this.label_[i] < label.value(i)) return true;
  }
  if (this.length() < label.length()) return true;
  return false;
***REMOVED***



***REMOVED***
***REMOVED*** Tests whether the label appears after another label
***REMOVED*** in document order.
***REMOVED*** @return {!boolean} 
***REMOVED***
xrx.label.prototype.isAfter = function(label) {

  for(var i = 0; i < this.length(); i++) {
    if (this.label_[i] > label.value(i)) return true;
  }
  if (this.length() > label.length()) return true;
  return false;
***REMOVED***



***REMOVED***
***REMOVED*** Tests whether the label is the child label of another
***REMOVED*** label.
***REMOVED*** @return {!boolean} 
***REMOVED***
xrx.label.prototype.isChildOf = function(label) {

  if (this.length() - 1 !== label.length()) return false;

  for (var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
***REMOVED***



xrx.label.prototype.isAncestorOf = function(label) {

  if (this.length() >= label.length()) return false;

  for (var i = 0; i < this.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
***REMOVED***



xrx.label.prototype.isDescendantOf = function(label) {

  if (this.length() <= label.length()) return false;

  for (var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
***REMOVED***


xrx.label.prototype.isParentOf = function(label) {

  if (this.length() !== label.length() - 1) return false;

  for (var i = 0; i < this.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
***REMOVED***

xrx.label.prototype.isPrecedingSiblingOf = function(label) {

  if (this.length() !== label.length()) return false;
  var len = this.length();
  for (var i = 0; i < len - 1; i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  if (this.label_[len - 1] >= label.value(len - 1)) return false;
  return true;
***REMOVED***

xrx.label.prototype.isFollowingSiblingOf = function(label) {

  if (this.length() !== label.length()) return false;
  var len = this.length();
  for (var i = 0; i < len - 1; i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  if (this.label_[len - 1] <= label.value(len - 1)) return false;
  return true;
***REMOVED***



xrx.label.prototype.toString = function() {
  return this.label_.join('.');
***REMOVED***
