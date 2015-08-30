var React = require('react');
var inViewport = require('in-viewport');

module.exports = function reactLazyRenderMixin(shouldComponentUpdate, distance) {
  return {
    shouldComponentUpdate: function(nextProps, nextState) {
      var shouldUpdate = typeof shouldComponentUpdate === 'function'
        ? shouldComponentUpdate.call(this, nextProps, nextState)
        : true;
      if(!shouldUpdate) { return false; }
      var inViewportOption = distance ? {offset: distance} : {};
      var thisEl = React.findDOMNode(this);
      if(inViewport(thisEl, inViewportOption)) { return true; }
      var comp = this;
      this._reactLazyRenderMixinWatcher = inViewport(thisEl, inViewportOption, function() {
        comp.forceUpdate();
      });
      return false;
    },
    componentWillUnmount: function () {
      if(this._reactLazyRenderMixinWatcher) {
        this._reactLazyRenderMixinWatcher.dispose();
        delete this._reactLazyRenderMixinWatcher;
      }
    }
  };
};
