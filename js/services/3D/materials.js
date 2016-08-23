gemApp.factory("materials",
["gemMesh", "animate", function(gemMesh, animate){

var mats = {
  Crystal:
    new THREE.MeshFaceMaterial([
      new THREE.MeshStandardMaterial( { //crystal
        map: null,
        color: 0xffffff,
        roughness: 0,
        metalness: 1,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial( { //amber
        map: null,
        color: 0xffc200,
        roughness: 0,
        metalness: 2.2,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial( { //smoke
        map: null,
        color: 0x777777,
        roughness: 0,
        metalness: 1,
        shading: THREE.FlatShading
      })
  ]),
  Droplet:
    new THREE.MeshFaceMaterial([
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0xFFEE33}), //gold
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0xcccccc}), //silver
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0xD99230}), //copper
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0x000000}), //black
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0x0000ff}), //blue
    new THREE.MeshStandardMaterial({metalness: 1, roughness: 0, color: 0xff0000})  //red
  ]),

};

return mats;

}]);
