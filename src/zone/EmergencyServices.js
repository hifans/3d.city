
Micro.EmergencyServices = function (SIM) {
  var sim = SIM;
//var EmergencyServices = function () {

  var handleService = function(censusStat, budgetEffect, blockMap) {
    return function(map, x, y, simData) {
      sim.census[censusStat] += 1;

      var effect = sim.budget[budgetEffect];
      var isPowered = map.getTile(x, y).isPowered();
      // Unpowered buildings are half as effective
      if (!isPowered)
        effect = Math.floor(effect / 2);

      var pos = new map.Position(x, y);
      var connectedToRoads = sim.traffic.findPerimeterRoad(pos);
      if (!connectedToRoads)
        effect = Math.floor(effect / 2);

      var currentEffect = sim.blockMaps[blockMap].worldGet(x, y);
      currentEffect += effect;
      sim.blockMaps[blockMap].worldSet(x, y, currentEffect);
    }
  };


  var policeStationFound = handleService('policeStationPop', 'policeEffect', 'policeStationMap');
  var fireStationFound = handleService('fireStationPop', 'fireEffect', 'fireStationMap');


  //var EmergencyServices = {
  return {
    registerHandlers: function(mapScanner, repairManager) {
      mapScanner.addAction(Tile.POLICESTATION, policeStationFound);
      mapScanner.addAction(Tile.FIRESTATION, fireStationFound);
    }
  }

}

//var EmergencyServices = new Micro.EmergencyServices();