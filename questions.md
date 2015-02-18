### Q1: Optional bundles

When I do `jspm bundle js/app + leaflet --inject` it adds the bundle to `config.js`. But if the bundle doesn't exist (for example because I don't want it during development) loading the app will fail. Can I configure SystemJS to fall back to the non-bundled versions if the bundle load fails?

### Q2: Bundle location

When I create the bundle as above it is put into the `target` folder. How can I configure things so it's created in `target/js`. I suppose it's got something to do with `baseURL` but I'm not entirely sure how they work. The documentation for these two doesn't help me much :(

### Q3: Depcache

When I create the depcache using `jspm depcache js/app` the App stops working because Angular complains that I didn't load my modules. Any idea why this is?
