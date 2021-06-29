// ==UserScript==
// @name        Auto Progression - pokeclicker.com
// @namespace   Violentmonkey Scripts
// @match       https://www.pokeclicker.com/
// @grant       none
// @version     1.1
// @author      Adam Etherington
// @description Automatically Progress through getting 10k in each route.
// ==/UserScript==

function loopProgress() {
    var easyTimes = 0;
    var progressLoop = setInterval(function () {
      //set the route and region to where the player currently is.
      var route = player.route();
      var region = player.region;
      //Get the stats of the battle playing out.
      var enemyHP = Battle.enemyPokemon().maxHealth();
      var damage =  App.game.party.calculatePokemonAttack(Battle.enemyPokemon().type1, Battle.enemyPokemon().type2)
      if(damage >= enemyHP){ // Check if we're one shotting enemies.
        easyTimes++;
        if(easyTimes > 60){ // If we can win for ~60 seconds then we want to move routes.
          easyTimes = 0;
          route++;
          if(MapHelper.routeExist(route,region)){ //Make sure the route exists
            if(MapHelper.accessToRoute(route,region)){ //Make sure we have access to the route
              MapHelper.moveToRoute(route, region); //Make the move.
            }
          }
          else{
            region++;
            route = 1;
            while(!MapHelper.routeExist(route,region)){
              route++;
            }
            if(MapHelper.accessToRoute(route,region)){
              MapHelper.moveToRoute(route, region);
            }
          }
        }
      }
      else{// If we can't one shot these enemies we potentially don't wanna stick around.
          easyTimes--;
      }
      if(easyTimes < 60){ // We're taking too long to kill enemies, let's step back.
        if(MapHelper.accessToRoute(--route,--region)){ //For now I'm only checking back one route, need to have logic to step back through regions (maybe);
          MapHelper.moveToRoute(--route, --region);
        }
      }
    }, 1000); // Checks every 1 second
  }
  
  setTimeout(function() { loopProgress(); }, 5000);//Give the player 5 seconds to load into the game before we run the script.