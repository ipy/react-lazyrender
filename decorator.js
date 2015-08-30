var React = require('react');
var inViewport = require('in-viewport');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function withReactLazyRender (Component, distance) {
  if(!Component || isNumeric(Component)) {
    distance = Component;
    return function (Component) {
      return withReactLazyRender(Component, distance);
    }
  }
  class ReactLazyRenderComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      var inViewportOption = distance ? {offset: distance} : {};
      var thisEl = React.findDOMNode(this);
      if(inViewport(thisEl, inViewportOption)) { return true; }
      var comp = this;
      this._reactLazyRenderMixinWatcher = inViewport(thisEl, inViewportOption, function() {
        comp.forceUpdate();
      });
      return false;
    }
    componentWillUnmount() {
      if(this._reactLazyRenderMixinWatcher) {
        this._reactLazyRenderMixinWatcher.dispose();
        delete this._reactLazyRenderMixinWatcher;
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  return ReactLazyRenderComponent;
}
