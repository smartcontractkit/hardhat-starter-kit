`highlight.js` syntax definition for Solidity.

For more about highlight.js, see https://highlightjs.org/

For more about Solidity, see http://solidity.readthedocs.io/

### Usage

Simply include the `highlight.js` script package in your webpage or node app, load up this module and apply it to `hljs`.

If you're not using a build system and just want to embed this in your webpage:

```html
<script type="text/javascript" src="/path/to/highlight.pack.js"></script>
<script type="text/javascript" src="/path/to/highlightjs-solidity/solidity.js"></script>
<script type="text/javascript">
    hljs.registerLanguage('solidity', window.hljsDefineSolidity);
    hljs.initHighlightingOnLoad();
</script>
```

If you're using webpack / rollup / browserify / node:
   
```javascript
var hljs = require('highlightjs');
var hljsDefineSolidity = require('highlightjs-solidity');

hljsDefineSolidity(hljs);
hljs.initHighlightingOnLoad();
```

### Advanced

This is a pretty simple package, the only thing you might want to do differently is name the language something other than `solidity`. If you want to do this, simply `import { definer } from 'highlightjs-solidity';` and use it like: `hljs.registerLanguage('othername', definer);`.

### About the author

Find me at http://pospi.spadgos.com

Tip me some ether? (; `0x52c04Bf91ebB58221A4ac65967e4CDa15a871eba`
