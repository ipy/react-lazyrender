var React = require('react');
var inViewport = require('./in-viewport');

module.exports = function reactLazyRenderMixin(options) {
  options = options || {};
  return {
    shouldComponentUpdate: function(nextProps, nextState) {
      var shouldUpdate = typeof options.shouldComponentUpdate === 'function'
        ? options.shouldComponentUpdate.call(this, nextProps, nextState)
        : true;
      if(!shouldUpdate) { return false; }
      var inViewportOption = options.distance ? {offset: options.distance} : {};
      var thisEl = React.findDOMNode(this);
      var shouldForceUpdate = typeof options.shouldForceUpdate == 'function'
        ? options.shouldForceUpdate.call(this, nextProps, nextState)
        : false;
      if(shouldForceUpdate || inViewport(thisEl, inViewportOption)) { return true; }
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
