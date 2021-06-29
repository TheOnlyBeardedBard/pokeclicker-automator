// ==UserScript==
// @name        Auto Farm - pokeclicker.com
// @namespace   Violentmonkey Scripts
// @match       https://www.pokeclicker.com/
// @grant       none
// @version     1.1
// @author      Adam Etherington
// @description Automatically Harvests and plants farm.
// ==/UserScript==

function loopFarm() {
    var farmLoop = setInterval(function () {
        App.game.farming.harvestAll(); // Attempt to harvest
        App.game.farming.plantAll(FarmController.selectedBerry()); //Plant all of the selected Berry.
    }, 10000); // Checks every 10 seconds
  }
  
  setTimeout(function() { loopFarm(); }, 5000); //Give the player 5 seconds to load into the game before we run the script.
  