gemApp.factory("HDR", ["gemMesh", "materials", function(gemMesh, mats){
return function(animate){
  var renderer = animate.renderer.renderer;
  this.hdrCubeRenderTarget = undefined;

  var hdrUrls = gemMesh.GetCubeURLs( "selem", ".hdr" );

  new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, hdrUrls, function ( hdrCubeMap ) {

    var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
    pmremGenerator.update( renderer );

    var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
    pmremCubeUVPacker.update( renderer );

    this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

    gemMesh.LoadTexture().then(function(map){
      _.each(mats.Crystal.materials, function(mat){
        mat.envMap = animate.hdr.hdrCubeRenderTarget.texture;
        mat.envMap.magFilter =
        mat.envMap.minFilter = THREE.LinearFilter;
        mat.needsUpdate = true;
      });

      _.each(mats.Droplet.materials, function(mat){
        mat.envMap = animate.hdr.hdrCubeRenderTarget.texture;
        mat.envMap.magFilter =
        mat.envMap.minFilter = THREE.LinearFilter;
        mat.needsUpdate = true;
      });
    });

    animate.Start();

  }.bind(this) );

  var renderScene = new THREE.RenderPass(animate.loader.scene, animate.camera);
  var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );
  var copyShader = new THREE.ShaderPass(THREE.CopyShader);
  copyShader.renderToScreen = true;

  var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.4, 0.85);
  this.composer = new THREE.EffectComposer(renderer);
  this.composer.setSize(window.innerWidth, window.innerHeight);
  this.composer.addPass(renderScene);
	this.composer.addPass(effectFXAA);
  this.composer.addPass(bloomPass);
	this.composer.addPass(copyShader);

  renderer.gammaInput = true;
	renderer.gammaOutput = true;
  animate.hdr = this;

};
}]);
