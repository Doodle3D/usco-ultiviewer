Polymer('ulti-viewer-light', Polymer.mixin({

  created: function() {
    console.log('created');

    this.settings = {
      minObjectSize: 20,//minimum size (in arbitrarty/opengl units) before requiring re-scaling (upwards)
      maxObjectSize: 200//maximum size (in arbitrarty/opengl units) before requiring re-scaling (downwards)
    }
  },

  ready: function(){
    console.log('ready');
    this.threeJs      = this.$.threeJs;
    this.assetManager = this.$.assetManager;
  },

  domReady: function() {
    console.log('domReady');
  },

  detached: function() {
    console.log('detached');
  },

  addToScene: function(object, sceneName, options) {
    console.log('addToScene')

    var options = options || {};
    options.autoCenter = options.autoCenter === undefined ? true: options.autoCenter;
    options.autoResize = options.autoResize === undefined ? true: options.autoResize;
    options.minSize    = options.minSize === undefined ? this.settings.minObjectSize: options.minSize; 
    options.maxSize    = options.maxSize === undefined ? this.settings.maxObjectSize: options.maxSize; 
    options.persistent = options.persistent === undefined ? false: options.persistent; 
    options.select     = options.select === undefined ? true: options.select; 

    var sceneName = sceneName || "main"; //check me

    console.log('object',object);
    console.log('sceneName',sceneName);
    console.log('options',options);
    console.log('this.threeJs',this.threeJs);
    console.log('object.updateMatrixWorld',object.updateMatrixWorld);

    this.threeJs.addToScene(object, sceneName, options);

    console.log('after addToScene');

    return object;
  },

  _loadResource: function(filename) {
    var self = this;
    var resource = this.assetManager.loadResource(filename, {parsing:{useWorker:true,useBuffers:true} } );
    var resourceDeferred = resource.deferred;

    function formatResource(resource) {
      console.log('formatResource',resource);
      var shape = resource.data;
      //shape.computeBoundingSphere();
      //shape.computeVertexNormals();
      //shape.computeFaceNormals();
      return shape;
    }

    function resourceLoadFailed(resource) {
      console.log('resourceLoadFailed');
    }

    var self = this;
    return resourceDeferred.promise
      .then(formatResource)
      .fail(resourceLoadFailed);
  },

  loadMesh: function(filename) {
    var resourcePromise = this._loadResource(filename);

    function loadFailed(res) {
      console.log("loadFailed",res);
    }

    function onDisplayError(error) {
      console.log("onDisplayError",error);
    }

    function afterAdded(mesh) { 
      console.log("afterAdded");
    }

    return resourcePromise
      .then(this.addToScene.bind(this), onDisplayError)
      .then(afterAdded)
      .fail(function(err) { console.error(err); });
    
  }

}));
