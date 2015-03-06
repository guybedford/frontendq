### Q1: Optional bundles

When I do `jspm bundle js/app + leaflet --inject` it adds the bundle to `config.js`.
But if the bundle doesn't exist (for example because I don't want it during development) loading the app will fail.
Can I configure SystemJS to fall back to the non-bundled versions if the bundle load fails?

> To return to development, use `jspm unbundle` to remove the bundle configuration for you.
  We can potentially add this in to the jspm API to allow require('jspm').unbundle(). Let me know if that would help?

> Lars: Not sure if that makes sense but what I thought would make sense is a fallback mode. If it can't find a bundle
        (i.e. 404) just try if the unbundled dependencies are available.

### Q2: Bundle location

When I create the bundle as above it is put into the `target` folder.
How can I configure things so it's created in `target/js`.
I suppose it's got something to do with `baseURL` but I'm not entirely sure how they work.
The documentation for these two doesn't help me much :(

> You can use `jspm bundle js/app + leaflet target/js/build.js --inject` for this.
  The baseURL concept is simply the idea of the "public folder". Perhaps that would have been a better name for it.

### Q3: Depcache

When I create the depcache using `jspm depcache js/app` the App stops working because Angular complains that I didn't load my modules.
Any idea why this is?

> This is a common issue - it is a race condition caused by depenency execution orders not matching up to what is expected by
  the angular modules. The way to fix this is to ensure that all dependencies are directly imported and never assumed to exist.


Lars:
> Understood about the race condition. But in this case I'm at a loss as to where this might happen.
  Angular complains about a missing mapApp. In the app.js I first import angular and then immediately define the mapApp.
  I have no idea what my mistake could be here...


### Q4: Transitive dependencies

How do I deal with transitive dependencies that are not declared?
Example: restangular requires lodash

My current workaround is:

```
    import lodash from 'lodash'; // Required for restangular
    window._ = lodash;
    import angular from 'angular';
    import 'restangular';
```

