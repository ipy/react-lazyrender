# react-lazyrender
Render React components only when they are in viewport.

## Install:

```bash
npm install react-lazyrender
```

## Usage:

### As Mixin

```js
var lazyRenderMixin = require('react-lazyrender/mixin');
var Item = React.createClass({
  mixins: [
    lazyRenderMixin(
      function(nextProps, nextState) {}, // The actual shouldComponentUpdate function
      1000 // The buffer distance. Components within this distance away from viewport will also be rendered.
    ),
  ],
  render: function() {
    return <li></li>;
  }
});
```

### As Higher-Order Component

Removed temporarily