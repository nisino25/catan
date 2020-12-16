<template>
  <!-- <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img :src="require('./picture/brick.png')" alt="" class="tile-pic">
  <img :src="require('./picture/ore.png')" alt="" class="tile-pic"> -->


  
  <button  class="row opaBtn">hey</button>
  <button  class="row opaBtn ">hye</button>

  <div class="scoreboard">
    <button @click="generate()" v-if="!readyToPlay" class="genBtn">Generate Map</button>
    <button v-if="genCount > 0 && !readyToPlay" @click="toggleReady(), startGame()" class="goBtn"> Go with this map </button>
    <button v-if="readyToPlay" @click="toggleReady()" class="resBtn"> Restart </button>


    <p v-if="readyToPlay" :style="{color: currentPlayer}" style="backgroundColor: white" > {{currentPlayer}}'s turn</p>

    <div class="dicePic" v-if="HasThrown">
      <img :src="diceOne" alt="">
      <img :src="diceTwo" alt="">
    </div>

    <!-- <p v-if="HasThrown"><br>1st: {{diceOne}}, 2nd: {{diceTwo}} Sum: {{diceSum}}</p> -->
    <p v-if="!HasThrown && OrderOder > 8" ><br>Ready to roll dice</p>


    <div v-if="HasThrown && OrderOder > 8">
      <p v-if="mes !== ''" class="report"> {{message[0]}}</p>
      <p v-if="mes !== ''" class="report"> {{message[1]}}</p>
      <p v-if="mes !== ''" class="report"> {{message[2]}}</p>
      <p v-if="mes !== ''" class="report"> {{message[3]}}</p>
      <p v-if="mes !== ''" class="report"> {{message[4]}}</p>
      <p v-if="mes !== ''" class="report"> {{message[5]}}</p>
    </div>
    
    


    <button v-if="HasThrown" @click="endTurn" class="done" align="left">Done</button>
    <button v-if=" readyToPlay && !HasThrown && OrderOder > 8" @click="rollDice()" class="roll" align="left">Roll Dice</button>



    <!-- action buttons   -->
    <div class="action" v-if="readyToPlay && HasThrown  && OrderOder > 8 "  >
      <div v-if="!HasChosenAction && !movingRobber" class="mainButton">
        <button @click="playerAction('buy')">Buy</button>
        <button @click="playerAction('resource')">Resource cards</button>
        <button @click="playerAction('trade')">Trade</button>

      </div>
    
      <div v-if="HasChosenAction">

        <div v-if="ActionBuy && !makingRoad && !settlementing" class="buy">
          <button @click="buy('road')">Road</button>
          <button @click="buy('settlement')">Settlement</button>
          <button @click="buy('city')">City</button>
          <button @click="buy('resource')">Resource</button>
          <button @click="cancel()" class="cancelBtn">Cancel</button>
        </div>
        <div v-if="ActionBuy && (makingRoad || settlementing)">
          <button @click="cancelAction('road')" class="cancelAction">Cancel the purchase</button>
        </div>

        <div v-if="ActionResource" class="resource">
          <button>You have this and that</button>
          <button @click="cancel()" class="cancelBtn">Cancel</button>
          <!-- <button>Show picture</button> -->
        </div>

        <div v-if="ActionTrade" class="trade">
          <button>Trade with bank</button>
          <button>Trade with other players</button>
          <button @click="cancel()" class="cancelBtn">Cancel</button>
        </div>

      </div>
      
    </div>

    <!-- This is going to be a table  -->
    <table class="itemTable" v-if=" readyToPlay && OrderOder > 8">
      <tr>
        <th>Item</th>
        <th>Red</th>
        <th>Blue</th>
        <th>Green</th>
        <th>Black</th>

      </tr>

      
      <tr>
        <td>Lumber</td>
        <td>{{scoreData.red[0]}}</td>
        <td>{{scoreData.blue[0]}}</td>
        <td>{{scoreData.green[0]}}</td>
        <td>{{scoreData.black[0]}}</td>
      </tr>
      <tr>
        <td>Brick</td>
        <td>{{scoreData.red[1]}}</td>
        <td>{{scoreData.blue[1]}}</td>
        <td>{{scoreData.green[1]}}</td>
        <td>{{scoreData.black[1]}}</td>
      </tr>
      <tr>
        <td>Sheep</td>
        <td>{{scoreData.red[2]}}</td>
        <td>{{scoreData.blue[2]}}</td>
        <td>{{scoreData.green[2]}}</td>
        <td>{{scoreData.black[2]}}</td>
      </tr>
      <tr>
        <td>Wheat</td>
        <td>{{scoreData.red[3]}}</td>
        <td>{{scoreData.blue[3]}}</td>
        <td>{{scoreData.green[3]}}</td>
        <td>{{scoreData.black[3]}}</td>
      </tr>
      <tr>
        <td>Ore</td>
        <td>{{scoreData.red[4]}}</td>
        <td>{{scoreData.blue[4]}}</td>
        <td>{{scoreData.green[4]}}</td>
        <td>{{scoreData.black[4]}}</td>
      </tr>
      <tr>
        <td>Largest Army</td>
        <td v-if="scoreData.red[5]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.blue[5]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.green[5]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.black[5]">Yes</td>
      </tr>
      <tr>
        <td>Longest Road</td>
        <td v-if="scoreData.red[6]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.blue[6]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.green[6]">Yes</td>
        <td v-else></td>
        <td v-if="scoreData.black[6]">Yes</td>
      </tr>
      <tr>
        <td>Unused card</td>
        <td>{{scoreData.red[7]}}</td>
        <td>{{scoreData.blue[7]}}</td>
        <td>{{scoreData.green[7]}}</td>
        <td>{{scoreData.black[7]}}</td>
      </tr>
      <tr>
        <td>Total Points</td>
        <td>{{scoreData.red[8]}}</td>
        <td>{{scoreData.blue[8]}}</td>
        <td>{{scoreData.green[8]}}</td>
        <td>{{scoreData.black[8]}}</td>
      </tr>
      

    </table>



    <div class='buildingCost'  >
      <img :src="buildingCost" v-if=" readyToPlay">

    </div>
    

  </div>


  <!-- <i class="fas fa-skull-crossbones"></i> -->
  <!-- <font-awesome-icon icon="fa-skull-crossbones" /> -->
  <div v-if="clicked" id="board">
    <div id="display">
      <div class="row">
        <!-- <span class="tile" prob="10" dots="..." style="background-image: :url('https://alexbeals.com/projects/catan/assets/images/brick.png'); color: black"></span> -->
        <!-- <span class="tile-pic" :prob="10" dots="..." :style="{backgroundImage: `(./picture/ ${tileLists[3]} .png)`, color: black }"></span> -->
        <span @click="clickTile(0)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']"   :prob="tileLists.prob[0]" :dots="tileLists.dots[0]" :style="{backgroundImage: `url(${tileLists.url[0]})`, color: tileLists.color[0]}"></span>
        <span @click="clickTile(1)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[1]" :dots="tileLists.dots[1]" :style="{backgroundImage: `url(${tileLists.url[1]})`, color: tileLists.color[1] }"></span>
        <span @click="clickTile(2)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[2]" :dots="tileLists.dots[2]" :style="{backgroundImage: `url(${tileLists.url[2]})`, color: tileLists.color[2] }"></span>

        <!-- <img  :src="require('./picture/'+ tileLists.item[1] +'.png')" alt="" class="tile-pic" :prob="8">
        <img :src="require('./picture/'+ tileLists.item[2] +'.png')" alt="" class="tile-pic" prob="10"> -->
      </div>

      <div class="row">
        <span @click="clickTile(3)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[3]" :dots="tileLists.dots[3]" :style="{backgroundImage: `url(${tileLists.url[3]})`, color: tileLists.color[3] }"></span>
        <span @click="clickTile(4)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[4]" :dots="tileLists.dots[4]" :style="{backgroundImage: `url(${tileLists.url[4]})`, color: tileLists.color[4] }"></span>
        <span @click="clickTile(5)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[5]" :dots="tileLists.dots[5]" :style="{backgroundImage: `url(${tileLists.url[5]})`, color: tileLists.color[5] }"></span>
        <span @click="clickTile(6)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[6]" :dots="tileLists.dots[6]" :style="{backgroundImage: `url(${tileLists.url[6]})`, color: tileLists.color[6] }"></span>

        
      </div>
        
      <div class="row">
        <span @click="clickTile(7)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[7]" :dots="tileLists.dots[7]" :style="{backgroundImage: `url(${tileLists.url[7]})`, color: tileLists.color[7] }"></span>
        <span @click="clickTile(8)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[8]" :dots="tileLists.dots[8]" :style="{backgroundImage: `url(${tileLists.url[8]})`, color: tileLists.color[8] }"></span>
        <span @click="clickTile(9)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[9]" :dots="tileLists.dots[9]" :style="{backgroundImage: `url(${tileLists.url[9]})`, color: tileLists.color[9] }"></span>
        <span @click="clickTile(10)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[10]" :dots="tileLists.dots[10]" :style="{backgroundImage: `url(${tileLists.url[10]})`, color: tileLists.color[10] }"></span>
        <span @click="clickTile(11)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[11]" :dots="tileLists.dots[11]" :style="{backgroundImage: `url(${tileLists.url[11]})`, color: tileLists.color[11] }"></span>
      </div>
      
      <div class="row">
        <span @click="clickTile(12)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[12]" :dots="tileLists.dots[12]" :style="{backgroundImage: `url(${tileLists.url[12]})`, color: tileLists.color[12] }"></span>
        <span @click="clickTile(13)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[13]" :dots="tileLists.dots[13]" :style="{backgroundImage: `url(${tileLists.url[13]})`, color: tileLists.color[13] }"></span>
        <span @click="clickTile(14)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[14]" :dots="tileLists.dots[14]" :style="{backgroundImage: `url(${tileLists.url[14]})`, color: tileLists.color[14] }"></span>
        <span @click="clickTile(15)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[15]" :dots="tileLists.dots[15]" :style="{backgroundImage: `url(${tileLists.url[15]})`, color: tileLists.color[15] }"></span>


      </div>

      <div class="row">
        <span @click="clickTile(16)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[16]" :dots="tileLists.dots[16]" :style="{backgroundImage: `url(${tileLists.url[16]})`, color: tileLists.color[16] }"></span>
        <span @click="clickTile(17)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[17]" :dots="tileLists.dots[17]" :style="{backgroundImage: `url(${tileLists.url[17]})`, color: tileLists.color[17] }"></span>
        <span @click="clickTile(18)" class="tile-pic" :class="[movingRobber ? 'deciding' : '']" :prob="tileLists.prob[18]" :dots="tileLists.dots[18]" :style="{backgroundImage: `url(${tileLists.url[18]})`, color: tileLists.color[18] }"></span>


      </div>

    </div>

    <div id="spots">

      <div class="chunk">
        <span data-num="0" :class="[settlementing || spotLists[0] !== 'open' ? spotLists[0] : 'zeroOpa']"  @click="placeSettlement(0)"></span>
        <span data-num="1" :class="[settlementing || spotLists[1] !== 'open' ? spotLists[1] : 'zeroOpa']" @click="placeSettlement(1)"></span>
        <span data-num="2" :class="[settlementing || spotLists[2] !== 'open' ? spotLists[2] : 'zeroOpa']" @click="placeSettlement(2)"></span>
      </div>
      <div class="chunk">
        <span data-num="3" :class="[settlementing || spotLists[3] !== 'open' ? spotLists[3] : 'zeroOpa']" @click="placeSettlement(3)"></span>
        <span data-num="4" :class="[settlementing || spotLists[4] !== 'open' ? spotLists[4] : 'zeroOpa']" @click="placeSettlement(4)"></span>
        <span data-num="5" :class="[settlementing || spotLists[5] !== 'open' ? spotLists[5] : 'zeroOpa']" @click="placeSettlement(5)"></span>
        <span data-num="6" :class="[settlementing || spotLists[6] !== 'open' ? spotLists[6] : 'zeroOpa']" @click="placeSettlement(6)"></span>
      </div>
      <div class="chunk">
        <span data-num="7" :class="[settlementing || spotLists[7] !== 'open' ? spotLists[7] : 'zeroOpa']" @click="placeSettlement(7)"></span>
        <span data-num="8" :class="[settlementing || spotLists[8] !== 'open' ? spotLists[8] : 'zeroOpa']" @click="placeSettlement(8)"></span>
        <span data-num="9" :class="[settlementing || spotLists[9] !== 'open' ? spotLists[9] : 'zeroOpa']" @click="placeSettlement(9)"></span>
        <span data-num="10" :class="[settlementing || spotLists[10] !== 'open' ? spotLists[10] : 'zeroOpa']" @click="placeSettlement(10)"></span>
      </div>
      <div class="chunk">
        <span data-num="11" :class="[settlementing || spotLists[11] !== 'open' ? spotLists[11] : 'zeroOpa']" @click="placeSettlement(11)"></span>
        <span data-num="12" :class="[settlementing || spotLists[12] !== 'open' ? spotLists[12] : 'zeroOpa']" @click="placeSettlement(12)"></span>
        <span data-num="13" :class="[settlementing || spotLists[13] !== 'open' ? spotLists[13] : 'zeroOpa']" @click="placeSettlement(13)"></span>
        <span data-num="14" :class="[settlementing || spotLists[14] !== 'open' ? spotLists[14] : 'zeroOpa']" @click="placeSettlement(14)"></span>
        <span data-num="15" :class="[settlementing || spotLists[15] !== 'open' ? spotLists[15] : 'zeroOpa']" @click="placeSettlement(15)"></span>
      </div>
      <div class="chunk">
        <span data-num="16" :class="[settlementing || spotLists[16] !== 'open' ? spotLists[16] : 'zeroOpa']" @click="placeSettlement(16)"></span>
        <span data-num="17" :class="[settlementing || spotLists[17] !== 'open' ? spotLists[17] : 'zeroOpa']" @click="placeSettlement(17)"></span>
        <span data-num="18" :class="[settlementing || spotLists[18] !== 'open' ? spotLists[18] : 'zeroOpa']" @click="placeSettlement(18)"></span>
        <span data-num="19" :class="[settlementing || spotLists[19] !== 'open' ? spotLists[19] : 'zeroOpa']" @click="placeSettlement(19)"></span>
        <span data-num="20" :class="[settlementing || spotLists[20] !== 'open' ? spotLists[20] : 'zeroOpa']" @click="placeSettlement(20)"></span>

      </div>
      <div class="chunk">
        <span data-num="21" :class="[settlementing || spotLists[21] !== 'open' ? spotLists[21] : 'zeroOpa']"  @click="placeSettlement(21)"></span>
        <span data-num="22" :class="[settlementing || spotLists[22] !== 'open' ? spotLists[22] : 'zeroOpa']" @click="placeSettlement(22)"></span>
        <span data-num="23" :class="[settlementing || spotLists[23] !== 'open' ? spotLists[23] : 'zeroOpa']" @click="placeSettlement(23)"></span>
        <span data-num="24" :class="[settlementing || spotLists[24] !== 'open' ? spotLists[24] : 'zeroOpa']" @click="placeSettlement(24)"></span>
        <span data-num="25" :class="[settlementing || spotLists[25] !== 'open' ? spotLists[25] : 'zeroOpa']" @click="placeSettlement(25)"></span>
        <span data-num="26" :class="[settlementing || spotLists[26] !== 'open' ? spotLists[26] : 'zeroOpa']" @click="placeSettlement(26)"></span>
      </div>

      <div class="chunk">
        <span data-num="27" :class="[settlementing || spotLists[27] !== 'open' ? spotLists[27] : 'zeroOpa']" @click="placeSettlement(27)"></span>
        <span data-num="28" :class="[settlementing || spotLists[28] !== 'open' ? spotLists[28] : 'zeroOpa']" @click="placeSettlement(28)"></span>
        <span data-num="29" :class="[settlementing || spotLists[29] !== 'open' ? spotLists[29] : 'zeroOpa']" @click="placeSettlement(29)"></span>
        <span data-num="30" :class="[settlementing || spotLists[30] !== 'open' ? spotLists[30] : 'zeroOpa']" @click="placeSettlement(30)"></span>
        <span data-num="31" :class="[settlementing || spotLists[31] !== 'open' ? spotLists[31] : 'zeroOpa']" @click="placeSettlement(31)"></span>
        <span data-num="32" :class="[settlementing || spotLists[32] !== 'open' ? spotLists[32] : 'zeroOpa']" @click="placeSettlement(32)"></span>

      </div>
      <div class="chunk">
        <span data-num="33" :class="[settlementing || spotLists[33] !== 'open' ? spotLists[33] : 'zeroOpa']" @click="placeSettlement(33)"></span>
        <span data-num="34" :class="[settlementing || spotLists[34] !== 'open' ? spotLists[34] : 'zeroOpa']" @click="placeSettlement(34)"></span>
        <span data-num="35" :class="[settlementing || spotLists[35] !== 'open' ? spotLists[35] : 'zeroOpa']" @click="placeSettlement(35)"></span>
        <span data-num="36" :class="[settlementing || spotLists[36] !== 'open' ? spotLists[36] : 'zeroOpa']" @click="placeSettlement(36)"></span>
        <span data-num="37" :class="[settlementing || spotLists[37] !== 'open' ? spotLists[37] : 'zeroOpa']" @click="placeSettlement(37)"></span>

      </div>
      <div class="chunk">
        <span data-num="38" :class="[settlementing || spotLists[38] !== 'open' ? spotLists[38] : 'zeroOpa']" @click="placeSettlement(38)"></span>
        <span data-num="39" :class="[settlementing || spotLists[39] !== 'open' ? spotLists[39] : 'zeroOpa']" @click="placeSettlement(39)"></span>
        <span data-num="40" :class="[settlementing || spotLists[40] !== 'open' ? spotLists[40] : 'zeroOpa']" @click="placeSettlement(40)"></span>
        <span data-num="41" :class="[settlementing || spotLists[41] !== 'open' ? spotLists[41] : 'zeroOpa']" @click="placeSettlement(41)"></span>
        <span data-num="42" :class="[settlementing || spotLists[42] !== 'open' ? spotLists[42] : 'zeroOpa']" @click="placeSettlement(42)"></span>

      </div>
      <div class="chunk">
        <span data-num="43" :class="[settlementing || spotLists[43] !== 'open' ? spotLists[43] : 'zeroOpa']" @click="placeSettlement(43)"></span>
        <span data-num="44" :class="[settlementing || spotLists[44] !== 'open' ? spotLists[44] : 'zeroOpa']" @click="placeSettlement(44)"></span>
        <span data-num="45" :class="[settlementing || spotLists[45] !== 'open' ? spotLists[45] : 'zeroOpa']" @click="placeSettlement(45)"></span>
        <span data-num="46" :class="[settlementing || spotLists[46] !== 'open' ? spotLists[46] : 'zeroOpa']" @click="placeSettlement(46)"></span>
      </div>
      <div class="chunk">
        <span data-num="47" :class="[settlementing || spotLists[47] !== 'open' ? spotLists[47] : 'zeroOpa']" @click="placeSettlement(47)"></span>
        <span data-num="48" :class="[settlementing || spotLists[48] !== 'open' ? spotLists[48] : 'zeroOpa']" @click="placeSettlement(48)"></span>
        <span data-num="49" :class="[settlementing || spotLists[49] !== 'open' ? spotLists[49] : 'zeroOpa']" @click="placeSettlement(49)"></span>
        <span data-num="50" :class="[settlementing || spotLists[50] !== 'open' ? spotLists[50] : 'zeroOpa']" @click="placeSettlement(50)"></span>

      </div>
      <div class="chunk">
        <span data-num="51" :class="[settlementing || spotLists[51] !== 'open' ? spotLists[51] : 'zeroOpa']" @click="placeSettlement(51)"></span>
        <span data-num="52" :class="[settlementing || spotLists[52] !== 'open' ? spotLists[52] : 'zeroOpa']" @click="placeSettlement(52)"></span>
        <span data-num="53" :class="[settlementing || spotLists[53] !== 'open' ? spotLists[53] : 'zeroOpa']" @click="placeSettlement(53)"></span>
      </div>

    </div>

    <div id="roads">
      <!-- 1st row -->
      <div class="group">
        <button @click="placeRoad(0)" :class="[makingRoad || roadLists[0] !== 'open' ? roadLists[0] : 'closed']" class="up"   ></button>
        <button @click="placeRoad(1)" :class="[makingRoad || roadLists[1] !== 'open' ? roadLists[1] : 'closed']" class="down" ></button>
        <button @click="placeRoad(2)" :class="[makingRoad || roadLists[2] !== 'open' ? roadLists[2] : 'closed']" class="up"   ></button>
        <button @click="placeRoad(3)" :class="[makingRoad || roadLists[3] !== 'open' ? roadLists[3] : 'closed']" class="down" ></button>
        <button @click="placeRoad(4)" :class="[makingRoad || roadLists[4] !== 'open' ? roadLists[4] : 'closed']" class="up"  ></button>
        <button @click="placeRoad(5)" :class="[makingRoad || roadLists[5] !== 'open' ? roadLists[5] : 'closed']" class="down" ></button>

      </div>
      
      <div class="group">
        <button @click="placeRoad(6)" :class="[makingRoad || roadLists[6] !== 'open' ? roadLists[6] : 'closed']" class="vert" ></button>
        <button @click="placeRoad(7)" :class="[makingRoad || roadLists[7] !== 'open' ? roadLists[7] : 'closed']" class="vert" ></button>
        <button @click="placeRoad(8)" :class="[makingRoad || roadLists[8] !== 'open' ? roadLists[8]: 'closed']" class="vert" ></button>
        <button @click="placeRoad(9)" :class="[makingRoad || roadLists[9] !== 'open' ? roadLists[9] : 'closed']" class="vert" ></button>
      </div>
      
      <!-- 2nd row -->
      <div class="group">
        <button @click="placeRoad(10)" :class="[makingRoad || roadLists[10] !== 'open' ? roadLists[10] : 'closed']" class="up" ></button>
        <button @click="placeRoad(11)" :class="[makingRoad || roadLists[11] !== 'open' ? roadLists[11] : 'closed']" class="down"></button>
        <button @click="placeRoad(12)" :class="[makingRoad || roadLists[12] !== 'open' ? roadLists[12] : 'closed']" class="up"></button>
        <button @click="placeRoad(13)" :class="[makingRoad || roadLists[13] !== 'open' ? roadLists[13] : 'closed']" class="down"></button>
        <button @click="placeRoad(14)" :class="[makingRoad || roadLists[14] !== 'open' ? roadLists[14] : 'closed']" class="up"></button>
        <button @click="placeRoad(15)" :class="[makingRoad || roadLists[15] !== 'open' ? roadLists[15] : 'closed']" class="down"></button>
        <button @click="placeRoad(16)" :class="[makingRoad || roadLists[16] !== 'open' ? roadLists[16] : 'closed']" class="up"></button>
        <button @click="placeRoad(17)" :class="[makingRoad || roadLists[17] !== 'open' ? roadLists[17] : 'closed']" class="down"></button>
      </div>
      
      <div class="group">
        <button @click="placeRoad(18)" :class="[makingRoad || roadLists[18] !== 'open' ? roadLists[18] : 'closed']" class="vert"></button>
        <button @click="placeRoad(19)" :class="[makingRoad || roadLists[19] !== 'open' ? roadLists[19] : 'closed']" class="vert"></button>
        <button @click="placeRoad(20)" :class="[makingRoad || roadLists[20] !== 'open' ? roadLists[20] : 'closed']" class="vert"></button>
        <button @click="placeRoad(21)" :class="[makingRoad || roadLists[21] !== 'open' ? roadLists[21] : 'closed']" class="vert"></button>
        <button @click="placeRoad(22)" :class="[makingRoad || roadLists[22] !== 'open' ? roadLists[22] : 'closed']" class="vert"></button>
      </div>
      
      <!-- 3rd  -->
      <div class="group">
        <button @click="placeRoad(23)" :class="[makingRoad || roadLists[23] !== 'open' ? roadLists[23] : 'closed']" class="up"></button>
        <button @click="placeRoad(24)" :class="[makingRoad || roadLists[24] !== 'open' ? roadLists[24] : 'closed']" class="down"></button>
        <button @click="placeRoad(25)" :class="[makingRoad || roadLists[25] !== 'open' ? roadLists[25] : 'closed']" class="up"></button>
        <button @click="placeRoad(26)" :class="[makingRoad || roadLists[26] !== 'open' ? roadLists[26] : 'closed']" class="down"></button>
        <button @click="placeRoad(27)" :class="[makingRoad || roadLists[27] !== 'open' ? roadLists[27] : 'closed']" class="up"></button>
        <button @click="placeRoad(28)" :class="[makingRoad || roadLists[28] !== 'open' ? roadLists[28] : 'closed']" class="down"></button>
        <button @click="placeRoad(29)" :class="[makingRoad || roadLists[29] !== 'open' ? roadLists[29] : 'closed']" class="up"></button>
        <button @click="placeRoad(30)" :class="[makingRoad || roadLists[30] !== 'open' ? roadLists[30] : 'closed']" class="down"></button>
        <button @click="placeRoad(31)" :class="[makingRoad || roadLists[31] !== 'open' ? roadLists[31] : 'closed']" class="up"></button>
        <button @click="placeRoad(32)" :class="[makingRoad || roadLists[32] !== 'open' ? roadLists[32] : 'closed']" class="down"></button>
      </div>

      <div class="group">
        <button @click="placeRoad(33)" :class="[makingRoad || roadLists[33] !== 'open' ? roadLists[33] : 'closed']"  class="vert"></button>
        <button @click="placeRoad(34)" :class="[makingRoad || roadLists[34] !== 'open' ? roadLists[34] : 'closed']" class="vert"></button>
        <button @click="placeRoad(35)" :class="[makingRoad || roadLists[35] !== 'open' ? roadLists[35] : 'closed']" class="vert"></button>
        <button @click="placeRoad(36)" :class="[makingRoad || roadLists[36] !== 'open' ? roadLists[36] : 'closed']" class="vert"></button>
        <button @click="placeRoad(37)" :class="[makingRoad || roadLists[37] !== 'open' ? roadLists[37] : 'closed']" class="vert"></button>
        <button @click="placeRoad(38)" :class="[makingRoad || roadLists[38] !== 'open' ? roadLists[38] : 'closed']" class="vert"></button>
      </div>
      
      <!-- 4th  -->
      <div class="group">
        <button @click="placeRoad(39)" :class="[makingRoad || roadLists[39] !== 'open' ? roadLists[39] : 'closed']" class="down"></button>
        <button @click="placeRoad(40)" :class="[makingRoad || roadLists[40] !== 'open' ? roadLists[40] : 'closed']" class="up"></button>
        <button @click="placeRoad(41)" :class="[makingRoad || roadLists[41] !== 'open' ? roadLists[41] : 'closed']" class="down">"></button>
        <button @click="placeRoad(42)" :class="[makingRoad || roadLists[42] !== 'open' ? roadLists[42] : 'closed']" class="up"></button>
        <button @click="placeRoad(43)" :class="[makingRoad || roadLists[43] !== 'open' ? roadLists[43] : 'closed']" class="down"></button>
        <button @click="placeRoad(44)" :class="[makingRoad || roadLists[44] !== 'open' ? roadLists[44] : 'closed']" class="up"></button>
        <button @click="placeRoad(45)" :class="[makingRoad || roadLists[45] !== 'open' ? roadLists[45] : 'closed']" class="down"></button>
        <button @click="placeRoad(46)" :class="[makingRoad || roadLists[46] !== 'open' ? roadLists[46] : 'closed']" class="up"></button>
        <button @click="placeRoad(47)" :class="[makingRoad || roadLists[47] !== 'open' ? roadLists[47] : 'closed']" class="down"></button>
        <button @click="placeRoad(48)" :class="[makingRoad || roadLists[48] !== 'open' ? roadLists[48] : 'closed']" class="up"></button>
      </div>
      
      <div class="group">
        <button @click="placeRoad(49)" :class="[makingRoad || roadLists[49] !== 'open' ? roadLists[49] : 'closed']" class="vert"></button>
        <button @click="placeRoad(50)" :class="[makingRoad || roadLists[50] !== 'open' ? roadLists[50] : 'closed']" class="vert" ></button>
        <button @click="placeRoad(51)" :class="[makingRoad || roadLists[51] !== 'open' ? roadLists[51] : 'closed']" class="vert"></button>
        <button @click="placeRoad(52)" :class="[makingRoad || roadLists[52] !== 'open' ? roadLists[52] : 'closed']" class="vert"></button>
        <button @click="placeRoad(53)" :class="[makingRoad || roadLists[53] !== 'open' ? roadLists[53] : 'closed']" class="vert"></button>
      </div>
      
      <!-- 5th  -->
      <div class="group">
        <button @click="placeRoad(54)" :class="[makingRoad || roadLists[54] !== 'open' ? roadLists[54] : 'closed']" class="down"></button>
        <button @click="placeRoad(55)" :class="[makingRoad || roadLists[55] !== 'open' ? roadLists[55] : 'closed']" class="up"></button>
        <button @click="placeRoad(56)" :class="[makingRoad || roadLists[56] !== 'open' ? roadLists[56] : 'closed']" class="down"></button>
        <button @click="placeRoad(57)" :class="[makingRoad || roadLists[57] !== 'open' ? roadLists[57] : 'closed']" class="up"></button>
        <button @click="placeRoad(58)" :class="[makingRoad || roadLists[58] !== 'open' ? roadLists[58] : 'closed']" class="down"></button>
        <button @click="placeRoad(59)" :class="[makingRoad || roadLists[59] !== 'open' ? roadLists[59] : 'closed']" class="up"></button>
        <button @click="placeRoad(60)" :class="[makingRoad || roadLists[60] !== 'open' ? roadLists[60] : 'closed']" class="down" ></button>
        <button @click="placeRoad(61)" :class="[makingRoad || roadLists[61] !== 'open' ? roadLists[61] : 'closed']" class="up"></button>
      </div>

      <div class="group">
        <button @click="placeRoad(62)" :class="[makingRoad || roadLists[62] !== 'open' ? roadLists[62] : 'closed']" class="vert"></button>
        <button @click="placeRoad(63)" :class="[makingRoad || roadLists[63] !== 'open' ? roadLists[63] : 'closed']" class="vert"></button>
        <button @click="placeRoad(64)" :class="[makingRoad || roadLists[64] !== 'open' ? roadLists[64] : 'closed']" class="vert"></button>
        <button @click="placeRoad(65)" :class="[makingRoad || roadLists[65] !== 'open' ? roadLists[65] : 'closed']" class="vert"></button>
      </div>

      <!-- 6th -->
      <div class="group">
        <button @click="placeRoad(66)" :class="[makingRoad || roadLists[66] !== 'open' ? roadLists[66] : 'closed']" class="down"></button>
        <button @click="placeRoad(67)" :class="[makingRoad || roadLists[67] !== 'open' ? roadLists[67] : 'closed']" class="up"></button>
        <button @click="placeRoad(68)" :class="[makingRoad || roadLists[68] !== 'open' ? roadLists[68] : 'closed']" class="down"></button>
        <button @click="placeRoad(69)" :class="[makingRoad || roadLists[69] !== 'open' ? roadLists[69] : 'closed']" class="up"></button>
        <button @click="placeRoad(70)" :class="[makingRoad || roadLists[70] !== 'open' ? roadLists[70] : 'closed']" class="down" ></button>
        <button @click="placeRoad(71)" :class="[makingRoad || roadLists[71] !== 'open' ? roadLists[71] : 'closed']" class="up"></button>
      </div>
      


    </div>
     

  </div>


</template>

<script>

var diceAudio = new Audio('/audio/rollDice.wav')

export default {
  // name: 'App',
  data(){
    return{
      clicked: false,

      tile: null,
      count: 0,
      randomNum: 0,
      tileLists: null,
      tileLink: null,


      MaxTree: 4,
      MaxWheat: 4,
      MaxSheep: 4,
      MaxCanyon: 3,
      MaxMountain: 3,
      MaxDesert: 1,
      tileCount: 0,

      MaxTwo: 1,
      MaxThree: 2,
      MaxFour: 2,
      MaxFive: 2,
      MaxSix: 2,
      MaxSeven: 1,
      MaxEight: 2,
      MaxNine: 2,
      MaxTen: 2,
      MaxEleven: 2,
      MaxTwelve: 1,

      desertLocation: null,
      robberLocation: null,
      hiddenTile: null,
      robberCount: 0,

      movingRobber: false,

      diceOne: null,
      diceTwo: null,
      diceSum: null,

      readyToPlay: false,
      genCount: 0,

      diceOrder: null,
      OrderOder: 0,
      PlayersOrder: 1,

      spotLists: null,
      roadLists: null,

      tileholds: null,
      roadHolds: null,

      settlementing: false,
      makingRoad: false,

      currentPlayer: null,
      HasThrown: false,
      message: null,


      scoreData: null,


      exam: './picture/brick.png',
      picLink: 'https://alexbeals.com/projects/catan/assets/images/ore.png',
      buildingCost: 'https://bryantcabrera.github.io/Settlers-of-Catan/resources/imgs/building_costs_cards/vector/building_costs.png',

      linkOne: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png',
      linkTwo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png',
      linkThree: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png',
      linkFour: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png',
      linkFive: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png',
      linkSix: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png',

      HasChosenAction: false,
      ActionBuy: false,
      ActionResource: false,
      ActionTrade: false,

      HasEnough: false,
      actioning: false,

      tempData: null,

      itemNumber: null,





    }
  },
  methods:{
    


    costCheck(item){
      this.HasEnough = false;
      let data = null;

      switch(this.currentPlayer){
        case 'red':
          data = this.scoreData.red
          break;

        case 'blue':
          data = this.scoreData.blue
          break;
        
        case 'green':
          data = this.scoreData.green
          break;
        
        case 'black':
          data = this.scoreData.black
          break;
      }
      switch(item){
        case 'road': 
          if(data[0] >= 1 && data[1] >= 1){
            this.HasEnough = true
          }
          return; 

        case 'settlement': 
          if(data[0] >= 1 && data[1] >= 1 && data[2] >= 1 && data[3] >= 1 ){
            this.HasEnough = true
          }
          return;
        
        case 'city': 
          if(data[3] >= 2 && data[4] >= 3 ){
            this.HasEnough = true
          }
          return; 
        
        case 'resource': 
          if(data[2] >= 1 && data[3] >= 1 && data[4] >= 1){
            this.HasEnough = true
          }
          return;
        

      }
    },

    buy(item){
      switch(item){
        case 'road':
          this.costCheck(item)
          if(this.HasEnough){
            this.makingRoad = true;
            this.actioning = true;
            return;
          }else{
            alert(`You don't have enough cost`)
          }
          return;

        case 'settlement':
          this.costCheck(item)
          if(this.HasEnough){
            this.settlementing = true;
            this.actioning = true;
          }else{
            alert(`You don't have enough cost`)
          }
          return;

        case 'city':
          this.costCheck(item)
          if(this.HasEnough){
            console.log('trying city herre')

          }else{
            alert(`You don't have enough cost`)
          }
          return;

        case 'resource':
          this.costCheck(item)
          if(this.HasEnough){
            console.log('trying special card herre')
          }else{
            alert(`You don't have enough cost`)
          }
          return;

      }

    },

    cancel(){
      this.HasChosenAction = false;
      this.ActionBuy = false;
      this.ActionResource = false;
      this.ActionTrade = false;
    },
    cancelAction(item){
      this.makingRoad = false;
      this.settlementing = false;
      switch(item){
        case 'road':
          this.makingRoad = false;
          this.settlementing = false;
          return;
        
      }

    },
    toggleReady(){
      if(this.readyToPlay){
        let r= confirm(`Are you sure you want to replay?`);
        if(!r){
          this.movingRobber = false;
          return;

      }
      this.genCount = 0
      }
      this.readyToPlay = !this.readyToPlay
      if(!this.readyToPlay){
        this.genCount = 0
        this.clicked = false;
      }


    },
    makingOrder(){
      this.randomNum = Math.random();
      if(this.randomNum <= 0.25){
        console.log('You go 1st')
        this.diceOrder = 1;
      }else if(this.randomNum <= 0.5){
        console.log('You go 2nd')
        this.diceOrder = 2;
      }else if(this.randomNum <= 0.75){
        console.log('You go 3rd')
        this.diceOrder = 3;
      }else if(this.randomNum <= 1){
        console.log('You go 4th')
        this.diceOrder = 4;
      }

    },
    attachingSpots(){

      let tempLists =  ['','','','','','','','','','','','','','','','','','',''];
      tempLists.holds = ['','','','','','','','','','','','','','','','','','',''];

      let CountForList =0;

      while(CountForList < 19){
        tempLists.holds[CountForList] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        CountForList++
      }


      CountForList = 0
      let actualCount = 0
      while(actualCount < 3){
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+3] = true;
        tempLists.holds[actualCount][CountForList+4] = true;
        tempLists.holds[actualCount][CountForList+7] = true;
        tempLists.holds[actualCount][CountForList+8] = true;
        tempLists.holds[actualCount][CountForList+12] = true;
        actualCount++
        CountForList++
      }
      CountForList = 7
      while(actualCount < 7){
        // 2nd row
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+4] = true;
        tempLists.holds[actualCount][CountForList+5] = true;
        tempLists.holds[actualCount][CountForList+9] = true;
        tempLists.holds[actualCount][CountForList+10] = true;
        tempLists.holds[actualCount][CountForList+15] = true;
        actualCount++
        CountForList++
      }

      CountForList = 16
      while(actualCount < 12){
        // 3rd row
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+5] = true;
        tempLists.holds[actualCount][CountForList+6] = true;
        tempLists.holds[actualCount][CountForList+11] = true;
        tempLists.holds[actualCount][CountForList+12] = true;
        tempLists.holds[actualCount][CountForList+17] = true;
        actualCount++
        CountForList++
      }
      CountForList = 28
      while(actualCount < 16){
          // 4th row
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+5] = true;
        tempLists.holds[actualCount][CountForList+6] = true;
        tempLists.holds[actualCount][CountForList+11] = true;
        tempLists.holds[actualCount][CountForList+12] = true;
        tempLists.holds[actualCount][CountForList+17] = true;
        actualCount++
        CountForList++
      }
      CountForList = 39
      while(actualCount < 19){
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+4] = true;
        tempLists.holds[actualCount][CountForList+5] = true;
        tempLists.holds[actualCount][CountForList+8] = true;
        tempLists.holds[actualCount][CountForList+9] = true;
        tempLists.holds[actualCount][CountForList+12] = true;
        actualCount++
        CountForList++
      }
      this.tileholds = tempLists


    },
    attachingRoads(){
      let tempLists =  ['','','','','','','','','','','','','','','','','','',''];
      tempLists.roadPosses = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',];

      let CountForList =0;

      while(CountForList < 72){
        tempLists.roadPosses[CountForList] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        CountForList++
      }

      // // Attaching roads to each spots
      // CountForList =0;
      // while(CountForList < 54 ){
      //   tempLists.spotsPosses[CountForList] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
      //   CountForList++
      // }




      // CountForList = 0;
      

      // // later


      // CountForList = 0
      // let actualCount = 0
      // while(actualCount < 3){
      //   tempLists.holds[actualCount][CountForList] = true;
      //   tempLists.holds[actualCount][CountForList+3] = true;
      //   tempLists.holds[actualCount][CountForList+4] = true;
      //   tempLists.holds[actualCount][CountForList+7] = true;
      //   tempLists.holds[actualCount][CountForList+8] = true;
      //   tempLists.holds[actualCount][CountForList+12] = true;
      //   actualCount++
      //   CountForList++
      // }
      // CountForList = 7
      // while(actualCount < 7){
      //   // 2nd row
      //   tempLists.holds[actualCount][CountForList] = true;
      //   tempLists.holds[actualCount][CountForList+4] = true;
      //   tempLists.holds[actualCount][CountForList+5] = true;
      //   tempLists.holds[actualCount][CountForList+9] = true;
      //   tempLists.holds[actualCount][CountForList+10] = true;
      //   tempLists.holds[actualCount][CountForList+15] = true;
      //   actualCount++
      //   CountForList++
      // }

      // CountForList = 16
      // while(actualCount < 12){
      //   // 3rd row
      //   tempLists.holds[actualCount][CountForList] = true;
      //   tempLists.holds[actualCount][CountForList+5] = true;
      //   tempLists.holds[actualCount][CountForList+6] = true;
      //   tempLists.holds[actualCount][CountForList+11] = true;
      //   tempLists.holds[actualCount][CountForList+12] = true;
      //   tempLists.holds[actualCount][CountForList+17] = true;
      //   actualCount++
      //   CountForList++
      // }
      // CountForList = 28
      // while(actualCount < 16){
      //     // 4th row
      //   tempLists.holds[actualCount][CountForList] = true;
      //   tempLists.holds[actualCount][CountForList+5] = true;
      //   tempLists.holds[actualCount][CountForList+6] = true;
      //   tempLists.holds[actualCount][CountForList+11] = true;
      //   tempLists.holds[actualCount][CountForList+12] = true;
      //   tempLists.holds[actualCount][CountForList+17] = true;
      //   actualCount++
      //   CountForList++
      // }
      // CountForList = 39
      // console.log(actualCount)
      // while(actualCount < 19){
      //   tempLists.holds[actualCount][CountForList] = true;
      //   tempLists.holds[actualCount][CountForList+4] = true;
      //   tempLists.holds[actualCount][CountForList+5] = true;
      //   tempLists.holds[actualCount][CountForList+8] = true;
      //   tempLists.holds[actualCount][CountForList+9] = true;
      //   tempLists.holds[actualCount][CountForList+12] = true;
      //   actualCount++
      //   CountForList++
      // }
      this.roadHolds = tempLists

    },
    generate(){
      this.genCount++;
      this.OrderOder = 1;
      this.robberCount = 0;
      this.clicked = true
      let loopCount = 0;
      this.tileCount = 0;

      this.spotLists = ['open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open']

      this.roadLists = ['open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open']
      

      let tempLists = ['','','','','','','','','','','','','','','','','','','',];
      let tempLink = ['','','','','','','','','','','','','','','','','','','',];
      



      tempLists.item = ['','','','','','','','','','','','','','','','','','','',];
      tempLink.item = ['','','','','','','','','','','','','','','','','','','',];

      tempLists.url= ['','','','','','','','','','','','','','','','','','','',];
      tempLink.url = ['','','','','','','','','','','','','','','','','','','',];

      tempLists.prob = ['','','','','','','','','','','','','','','','','','','',];
      tempLink.prob = ['','','','','','','','','','','','','','','','','','','',];

      tempLists.dots = ['','','','','','','','','','','','','','','','','','','',];
      tempLink.dots = ['','','','','','','','','','','','','','','','','','','',];

      tempLists.color = ['','','','','','','','','','','','','','','','','','','',];
      tempLink.color = ['','','','','','','','','','','','','','','','','','','',];

      let tempScore = ['','','','','','','','','','','','','','','','','','','',];
      // scoredara 
      

      tempScore.red = [0,0,0,0,0,false,false,0,2]
      tempScore.blue = [0,0,0,0,0,false,false,0,2]
      tempScore.green = [0,0,0,0,0,false,false,0,2]
      tempScore.black = [0,0,0,0,0,false,false,0,2]

      this.scoreData = tempScore

      this.attachingSpots();    
      this.attachingRoads();  
      
      // tempLink.backgroundColor = ['#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D','#E9D49D'];
      tempLink.backgroundColor = ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white'];

      this.MaxTree = 4
      this.MaxWheat =4
      this.MaxSheep =4 
      this.MaxCanyon=3
      this.MaxMountain= 3
      this.MaxDesert=1

      this.MaxTwo= 1
      this.MaxThree= 2
      this.MaxFour=2
      this.MaxFive= 2
      this.MaxSix= 2
      this.MaxSeven = 1
      this.MaxEight= 2
      this.MaxNine= 2
      this.MaxTen= 2
      this.MaxEleven= 2
      this.MaxTwelve= 1

      // this.desertLocation = null


      

      while(loopCount < 19){
        this.randomNum = Math.random()
        while(this.randomNum > 0.6){
          this.randomNum = Math.random()
        }

        if(this.randomNum <= 0.1){
          if(this.MaxDesert !== 0){
            tempLists.item[loopCount] = 'desert'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/desert.png';
            this.MaxDesert --
            this.desertLocation = loopCount;
            this.robberLocation = this.desertLocation;
            loopCount++
          }

        }else if(this.randomNum <= 0.2){
          if(this.MaxTree !== 0){
            tempLists.item[loopCount] = 'lumber'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/lumber.png';
            this.MaxTree --
            loopCount++
          }

          
        }else if(this.randomNum <= 0.3){
          if(this.MaxCanyon !== 0){
            tempLists.item[loopCount] = 'brick'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/brick.png';
            this.MaxCanyon --
            loopCount++
          }
        }else if(this.randomNum <= 0.4){
          if(this.MaxSheep !== 0){
            tempLists.item[loopCount] = 'sheep'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/sheep.png';
            this.MaxSheep --
            loopCount++
          }
          
        }else if(this.randomNum <= 0.5){
          if(this.MaxWheat !== 0){
            tempLists.item[loopCount] = 'wheat'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/wheat.png';
            this.MaxWheat --
            loopCount++
          }
        }else if(this.randomNum <= 0.6){
          if(this.MaxMountain !== 0){
            tempLists.item[loopCount] = 'ore'
            tempLists.url[loopCount] = 'https://alexbeals.com/projects/catan/assets/images/ore.png';
            this.MaxMountain--
            loopCount++
          }
        }

        // console.log(this.MaxTree,this.MaxWheat, this.MaxSheep, this.MaxCanyon, this.MaxMountain, this.MaxDesert)
        
        
        // console.log(loopCount)
        
      }
      

      loopCount = 0;

      while(loopCount < 19){

        this.randomNum = Math.random()
        
        if(loopCount === this.desertLocation){
          tempLists.prob[loopCount] = 'Rob'
          tempLists.dots[loopCount] = '___';
          tempLists.color[loopCount] = 'blue';
          // tempLists.backgroundColor[loopCount] = 'grey'
          this.randomNum = 10
          loopCount++
        }
        
        if(this.randomNum <= 0.1){
          if(this.MaxTwo !== 0){
            tempLists.prob[loopCount] = '2'
            tempLists.dots[loopCount] = '.';
            this.MaxTwo --
            tempLists.color[loopCount]  = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 0.2){
          if(this.MaxThree !== 0){
            tempLists.prob[loopCount] = '3'
            tempLists.dots[loopCount] = '..';
            this.MaxThree --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 0.3){
          if(this.MaxFour !== 0){
            tempLists.prob[loopCount] = '4'
            tempLists.dots[loopCount] = '...';
            this.MaxFour --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 0.4){
          if(this.MaxFive !== 0){
            tempLists.prob[loopCount] = '5'
            tempLists.dots[loopCount] = '....';
            this.MaxFive --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 0.5){
          if(this.MaxSix !== 0){
            tempLists.prob[loopCount] = '6'
            tempLists.dots[loopCount] = '.....';
            this.MaxSix --
            tempLists.color[loopCount] = 'red'
            loopCount++
          }
        }else if(this.randomNum <= 0.6){
          if(this.MaxEight !== 0){
            tempLists.prob[loopCount] = '8'
            tempLists.dots[loopCount] = '.....';
            this.MaxEight --
            tempLists.color[loopCount] = 'red'
            loopCount++
          }
        }else if(this.randomNum <= 0.7){
          if(this.MaxNine !== 0){
            tempLists.prob[loopCount] = '9'
            tempLists.dots[loopCount] = '....';
            tempLists.color[loopCount] = 'black'
            this.MaxNine --
            loopCount++
          }
        }else if(this.randomNum <= 0.8){
          if(this.MaxTen !== 0){
            tempLists.prob[loopCount] = '10'
            tempLists.dots[loopCount] = '...';
            this.MaxTen --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 0.9){
          if(this.MaxEleven !== 0){
            tempLists.prob[loopCount] = '11'
            tempLists.dots[loopCount] = '..';
            this.MaxEleven --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }else if(this.randomNum <= 1){
          if(this.MaxTwelve !== 0){
            tempLists.prob[loopCount] = '12'
            tempLists.dots[loopCount] = '.';
            this.MaxTwelve --
            tempLists.color[loopCount] = 'black'
            loopCount++
          }
        }

        
      }

      this.tileLists = tempLists
      this.tileLink = tempLink


      // console.log(`${this.tileLists.item[15]} ${this.tileholds.holds[15][3]}`)
    },
    rollDice(){
      this.message = ['','','','','','','','','','','','']

      
      if(this.HasThrown){
        alert('finish your turn first')
        return
      }

      diceAudio.play()
      this.HasThrown = true;
      this.diceSum = 0;


      // first one
      this.randomNum = Math.random()
      while(this.randomNum > 0.6 ){
        this.randomNum = Math.random()
      }
      this.randomNum = parseInt(this.randomNum * 10)+1
      // console.log(this.randomNum)
      
      this.diceSum =  this.randomNum

      switch(this.randomNum){
        case 1:
          this.diceOne = this.linkOne;
          break;
        case 2:
          this.diceOne = this.linkTwo;
          break;
        case 3:
          this.diceOne = this.linkThree;
          break;
        case 4:
          this.diceOne = this.linkFour;
          break;
        case 5:
          this.diceOne = this.linkFive;
          break;
        case 6:
          this.diceOne = this.linkSix;
          break;
      }

      // seconde dice

      this.randomNum = Math.random()
      while(this.randomNum > 0.6 ){
        this.randomNum = Math.random()
      }

      this.randomNum = parseInt(this.randomNum * 10) + 1
      this.diceSum = this.diceSum + this.randomNum

      switch(this.randomNum){
        case 1:
          this.diceTwo = this.linkOne;
          break;
        case 2:
          this.diceTwo = this.linkTwo;
          break;
        case 3:
          this.diceTwo = this.linkThree;
          break;
        case 4:
          this.diceTwo = this.linkFour;
          break;
        case 5:
          this.diceTwo = this.linkFive;
          break;
        case 6:
          this.diceTwo = this.linkSix;
          break;
      }

      let CheckCount = 0
      let mesCount = 0
      while(CheckCount < 19){
        if( parseInt(this.tileLists.prob[CheckCount]) === this.diceSum && parseInt(this.tileLists.prob[CheckCount]) && this.robberLocation ){
          // console.log(this.tileLists.item[CheckCount])
          let spotsCount = 0

          while(spotsCount < 55){
            if(this.tileholds.holds[CheckCount][spotsCount] && this.spotLists[spotsCount] !== 'open'  ){
              this.message[mesCount] = `${this.spotLists[spotsCount]}: ${this.tileLists.item[CheckCount]} `
              this.increItem(this.spotLists[spotsCount], this.tileLists.item[CheckCount]);


              mesCount++;
            }
            spotsCount++
          }
        }
        CheckCount++
      }


      if(this.diceSum === 7){
        this.seven()
      }
    },
    increItem(color,item){
      let itemNum = 0
      // this.scoreData.red[itemNum]++


      switch(item) {
        case 'lumber':
          itemNum = 0
          break;
        case 'brick':
          itemNum = 1
          break;
        case 'sheep':
          itemNum = 2
          break;
        case 'wheat':
          itemNum = 3
          break;
        case 'ore':
          itemNum = 4
          break;
        default:
          console.log('what the heck')
      
      }

      switch(color){
        case 'red':
          this.scoreData.red[itemNum]++
          break;
        case 'blue':
          this.scoreData.blue[itemNum]++
          break;
        case 'green':
          this.scoreData.green[itemNum]++
          break;
        case 'black':
          this.scoreData.black[itemNum]++
          break;
        default:
          console.log('what the hell')
      }


    },
    seven(){
      this.movingRobber = true;

    },
    clickTile(num){
      if(!this.movingRobber){
        return;
      }

      if(num === this.robberLocation || num === this.desertLocation){
        console.log(`${this.robberLocation} || ${this.desertLocation} || ${num}`)
        alert("You cannot put the robber there");
        return;
      }
      console.log(`You click : ${num}`)

      let r= confirm(`${this.tileLists.item[num]} with ${this.tileLists.prob[num]} dots?`);
      if(!r){
        return;
      }

      let tempoHidden = [''];
      tempoHidden.url = [''];
      tempoHidden.prob = [''];
      tempoHidden.dots = [''];
      tempoHidden.color = [''];

      
      // if not this is first time, gotta reset the old one to regular
      if(this.robberLocation !== this.desertLocation){
        this.tileLists.url[this.robberLocation] = this.hiddenTile.url[0]
        this.tileLists.prob[this.robberLocation] = this.hiddenTile.prob[0]
        this.tileLists.dots[this.robberLocation] = this.hiddenTile.dots[0]
        this.tileLists.color[this.robberLocation] = this.hiddenTile.color[0]
      }else{
        this.tileLists.prob[this.desertLocation] = ''
        this.tileLists.dots[this.desertLocation] = ''
      }
      this.robberLocation = num;

      tempoHidden.url[0] =  this.tileLists.url[num]
      tempoHidden.prob[0] = this.tileLists.prob[num]
      tempoHidden.dots[0] = this.tileLists.dots[num]
      tempoHidden.color[0] = this.tileLists.color[num]

      this.hiddenTile = tempoHidden

      // this.tileLists.url[this.randomNum] = 'https://alexbeals.com/projects/catan/assets/images/desert.png'
      this.tileLists.prob[num] = 'Rob'
      this.tileLists.dots[num] = '___';
      this.tileLists.color[num] = 'blue';

      this.robberCount++;

      this.movingRobber = false;
    },
    setSet(num){
      console.log(num)
      if(!this.readyToPlay){
        alert(`Select Go with this map first `)
        return
      }

      if(this.OrderOder ===1 || this.OrderOder === 8){
        if(this.spotLists[num] !== 'open' ){
          alert(`you cannot put there`)
          return
        }
        this.spotLists[num] = 'red'

        if(this.OrderOder > 4){
          let CheckCount =0;
          while(CheckCount < 19){
            if(this.tileholds.holds[CheckCount][num]){
              console.log(`Red got ${this.tileLists.item[CheckCount]}`)
            }
            CheckCount ++;
          }
          

        }
        this.OrderOder++
      }else if(this.OrderOder === 2 || this.OrderOder === 7){
        if(this.spotLists[num] !== 'open' ){
          alert(`you cannot put there`)
          return
        }
        this.spotLists[num] = 'blue'
        if(this.OrderOder > 4){
          let CheckCount =0;
          while(CheckCount < 19){
            if(this.tileholds.holds[CheckCount][num]){
              console.log(`blue got ${this.tileLists.item[CheckCount]}`)
            }
            CheckCount ++;
          }
          

        }
        this.OrderOder++
      }else if(this.OrderOder === 3 || this.OrderOder === 6){
        if(this.spotLists[num] !== 'open' ){
          alert(`you cannot put there`)
          return
        }
        this.spotLists[num] = 'green'
        if(this.OrderOder > 4){
          let CheckCount =0;
          while(CheckCount < 19){
            if(this.tileholds.holds[CheckCount][num]){
              console.log(`green got ${this.tileLists.item[CheckCount]}`)
            }
            CheckCount ++;
          }
          

        }
        this.OrderOder++
      }else if(this.OrderOder === 4 || this.OrderOder === 5){
        if(this.spotLists[num] !== 'open' ){
          alert(`you cannot put there`)
          return
        }
        this.spotLists[num] = 'black'
        if(this.OrderOder > 4){
          let CheckCount =0;
          while(CheckCount < 19){
            if(this.tileholds.holds[CheckCount][num]){
              console.log(`black got ${this.tileLists.item[CheckCount]}`)
            }
            CheckCount ++;
          }
          

        }
        this.OrderOder++
        

      }

      // console.log(this.tileholds)

      
      
    },
    placeRoad(num){
      if(!this.makingRoad){
        return
      }
      if(this.roadLists[num] !== 'open' ){
        alert(`you cannot put there`)
        return
      }
      this.roadLists[num] = this.currentPlayer
      // console.log(num)
      this.makingRoad = false;
      this.OrderOder++

      if(this.actioning){
        this.payPrice('road')
        this.actioning = false;
      }

    },
    placeSettlement(num){
      if(!this.readyToPlay){
        alert(`Select Go with this map first `)
        return
      }
      if(!this.settlementing){
        return
      }
      
      if(!this.actioning &&this.OrderOder>4){
        this.placeSpecialSettlement(num)
        return
      }

      if(this.spotLists[num] !== 'open' ){
        alert(`you cannot put there`)
        return
      }
      this.spotLists[num] = this.currentPlayer
      this.settlementing = false;

      if(this.actioning){
        this.payPrice('settlement')
        switch(this.currentPlayer){
          case 'red':
            this.scoreData.red[8]++
            return;

          case 'blue':
            this.scoreData.blue[8]++
            return;

          case 'green':
            this.scoreData.green[8]++
            return;

          case 'black':
            this.scoreData.black[8]++
            return;
          
        }
      }

    },
    placeSpecialSettlement(num){
      if(!this.settlementing){
        alert('now is not the time')
      }
      if(this.spotLists[num] !== 'open' ){
        alert(`you cannot put there`)
        return
      }

      this.spotLists[num] = this.currentPlayer
      this.settlementing = false;

      this.SpecialItem(num);

    },
    SpecialItem(num){
      // console.log(this.tileholds.holds)
      let CheckCount =0;
      while(CheckCount < 19){
        if(this.tileholds.holds[CheckCount][num]){

          this.getItemNum(this.tileLists.item[CheckCount])

          switch(this.currentPlayer){
            case 'red':
              this.scoreData.red[this.itemNumber]++
              break;

            case 'blue':
              this.scoreData.blue[this.itemNumber]++
              break;

            case 'green':
              this.scoreData.green[this.itemNumber]++
              break;
            
            case 'black':
              this.scoreData.black[this.itemNumber]++
              break;
          }
        }
        CheckCount ++;
      }
    },
    getItemNum(item){
      switch(item) {
        case 'lumber':
          this.itemNumber = 0
          break;
        case 'brick':
          this.itemNumber = 1
          break;
        case 'sheep':
          this.itemNumber = 2
          break;
        case 'wheat':
          this.itemNumber = 3
          break;
        case 'ore':
          this.itemNumber = 4
          break;
        default:
          console.log('what the heck')
      
      }
    },
    startGame(){
      this.makingOrder();
      this.OrderOder= 1
      this.settlementing = true

    },
    endTurn(){
      if(this.movingRobber){
        alert('First you have to choose where to put robber')
        return;
      }
      this.HasThrown = false;
      this.PlayersOrder++;
      this.message = null;
      
      this.HasChosenAction = false;
      this.ActionBuy = false;
      this.ActionResource = false;
      this.ActionTrade = false;
    },
    playerAction(action){
      this.HasChosenAction = true
      switch(action){
        case 'buy':
          this.ActionBuy = true
          break;
        case 'resource':
          this.ActionResource = true
          break;
        case 'trade':
          this.ActionTrade = true
          break;
      }
    },

    payPrice(item){

      switch(item){
        case 'road': 
          switch(this.currentPlayer){
            case 'red':
              this.scoreData.red[0]--
              this.scoreData.red[1]--
              return;

            case 'blue':
              this.scoreData.blue[0]--
              this.scoreData.blue[1]--
              return;

            case 'green':
              this.scoreData.green[0]--
              this.scoreData.green[1]--
              return;

            case 'black':
              this.scoreData.black[0]--
              this.scoreData.black[1]--
              return;
          }
          return;

        case 'settlement': 
          switch(this.currentPlayer){
              case 'red':
                this.scoreData.red[0]--
                this.scoreData.red[1]--
                this.scoreData.red[2]--
                this.scoreData.red[3]--
                return;

              case 'blue':
                this.scoreData.blue[0]--
                this.scoreData.blue[1]--
                this.scoreData.blue[2]--
                this.scoreData.blue[3]--

                return;

              case 'green':
                this.scoreData.green[0]--
                this.scoreData.green[1]--
                this.scoreData.green[2]--
                this.scoreData.green[3]--
                return;

              case 'black':
                this.scoreData.black[0]--
                this.scoreData.black[1]--
                this.scoreData.black[2]--
                this.scoreData.black[3]--
                return;
          }
            return;
        
        case 'city': 
          this.scoreData.this.tempData[3] =  this.scoreData.this.tempData[3] - 2  
          this.scoreData.this.tempData[4] = this.scoreData.this.tempData[4] - 3  
          return; 
        
        case 'resource': 
          this.scoreData.this.tempData[2] = this.scoreData.this.tempData[2] - 1
          this.scoreData.this.tempData[3] = this.scoreDat2.this.tempData[3] - 1
          this.scoreData.this.tempData[4] = this.scoreData.this.tempData[4] - 1
          return; 
        
      }
      


    }


  },
  watch:{
    settlementing: function(){
      if(!this.settlementing){
        if(this.OrderOder < 9){
          this.makingRoad = true
        }
      }
      
    },
    makingRoad: function(){
      if(!this.makingRoad){
        if(this.OrderOder !== 0 &this.OrderOder < 9){
          this.settlementing = true
        }
      }
    },
    OrderOder: function(){
      if(this.OrderOder === 1 || this.OrderOder === 8){
        this.currentPlayer = 'red'
      }else if(this.OrderOder === 2 || this.OrderOder === 7){
        this.currentPlayer = 'blue'
      }else if(this.OrderOder === 3 || this.OrderOder === 6){
        this.currentPlayer = 'green'
      }else if(this.OrderOder === 4 || this.OrderOder === 5){
        this.currentPlayer = 'black'
      }
    },
    PlayersOrder: function(){
      if(this.PlayersOrder % 4 === 1){
        this.currentPlayer = 'red'
      }else if(this.PlayersOrder % 4 ===2){
        this.currentPlayer = 'blue'
      }else if(this.PlayersOrder % 4 ===3){
        this.currentPlayer = 'green'
      }else if(this.PlayersOrder % 4 ===0){
        this.currentPlayer = 'black'
      }
    },
    
  }
}
</script>

<style>

.action button{
  color: white !important;
  text-transform: uppercase;
  text-decoration: none;
  background:#00b389;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 200px;
  /* opacity: 0; */
}

.mainButton button:nth-of-type(1),
.buy button:nth-of-type(1),
.resource button:nth-of-type(1),
.trade button:nth-of-type(1){
  left: 10px;
}

.action .mainButton button:nth-of-type(2){
  left: 110px;
}

.action .mainButton button:nth-of-type(3){
  left: 310px;
}

.buy button:nth-of-type(2){
  left: 120px;
}

.buy button:nth-of-type(3){
  left: 280px;
}

.buy button:nth-of-type(4){
  left: 10px;
  margin-top: 260px;

}

.buy button:nth-of-type(5){
  left: 155px;
  margin-top: 260px;

  background: #DC143C;
}


.resource button:nth-of-type(2){
  left: 255px;
  background: #DC143C;
}

.trade button:nth-of-type(2){
  left: 215px;
}

.trade button:nth-of-type(3){
  left: 10px;
  margin-top: 260px;
  background: #DC143C;
}

.cancelAction{
  left: 10px;
  margin-top: 260px;
  background: #DC143C;
}






.buildingCost img{
  width: 300px;
  transition: all 0.4s ease 0s;
  right: 10px;
  margin-top: 350px;
  position: fixed;

}

.buildingCost img:hover{
  width: 450px;
}


.dicePic img {
  padding: 5px;
  width: 40px;
  left: 10px;
  float: left;
  top: 250px;
  position: fixed;
}

.dicePic img:nth-of-type(1){
  padding-left: 50px;
}
.dicePic img:nth-of-type(2){
  /* padding-left: px; */
}





.itemTable{
  padding-right: 20px;
  font-size: 125%;
  background-color: white;
  border-radius: 15%;
  margin-top: 450px;
  position: fixed;
}

/* .scoreboard{

} */

.scoreboard p{
  color: white;
  font-size: 150%;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 10px;
  position: fixed;
}

.report{
  color: white;
  font-size: 150%;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 10px;
  right: 10px;
  padding: 10px;
  
  /* top: 50% */
}

.report:nth-of-type(1)  { margin-top: 40px; }
.report:nth-of-type(2)  { margin-top: 75px;}
.report:nth-of-type(3)  { margin-top: 110px; }
.report:nth-of-type(4)  { margin-top: 145px; }
.report:nth-of-type(5)  { margin-top: 180px; }
.report:nth-of-type(6)  { margin-top: 215px; }

.scoreboard strong{
  color: white;
  font-size: 150%;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 10px;
  padding-top: 10px;
  position: fixed;
}


.done{
  color: black !important;
  text-transform: uppercase;
  text-decoration: none;
  background:#FFA500;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 125px;
  left: 10px;
}
.done:hover,
.roll:hover {
text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}

.roll{
  color: white !important;
  text-transform: uppercase;
  text-decoration: none;
  background:#FF6347;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 125px;
  left: 10px;
}
.opaBtn{
  opacity: 0;
}
.genBtn{
  color: white !important;
  text-transform: uppercase;
  text-decoration: none;
  background:#FF6347;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 150px;
  left: 10px;
}
.goBtn{
  color: black !important;
  text-transform: uppercase;
  text-decoration: none;
  background:yellow;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 100px;
  left: 10px;
}
.resBtn{
  color: white !important;
  text-transform: uppercase;
  text-decoration: none;
  background:black;
  padding: 15px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  position: fixed;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 750px;
  right: 10px;
}











#roads {
  position: absolute;
  top: 180px;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  pointer-events: none
}

.group  {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  pointer-events: none
}

.group button {
  width: 15px;
  height: 60px;
  /* border-radius: 10px; */
  text-align: center;
  
  box-sizing: border-box;
  pointer-events: auto;
  
  cursor: pointer;
	animation: open-animation 3s infinite;
  pointer-events: auto;

}

.group  .open{
  background-color: white;
  opacity: 0.4;
	
  /* transform: rotate(-60deg); */
}

.group .closed{
  background-color: white;
  opacity: 0;
}

.down{
  transform: rotate(-60deg);
}
.up{
  transform: rotate(60deg);
}

.group:nth-of-type(1)  { width: 390px; }
.group:nth-of-type(2)  { width: 464px; }
.group:nth-of-type(3)  { width: 540px; }
.group:nth-of-type(4)  { width: 617px; }
.group:nth-of-type(5)  { width: 695px; }
.group:nth-of-type(6)  { width: 763px; }
.group:nth-of-type(7)  { width: 685px; }
.group:nth-of-type(8)  { width: 617px; }
.group:nth-of-type(9)  { width: 540px; }
.group:nth-of-type(10) { width: 464px; }
.group:nth-of-type(11) { width: 380px; }
/* .group:nth-of-type(12) { width: 3px; } */


/* .group:nth-of-type(0) { padding-top: 50px; } */
.group:nth-of-type(1) { padding-top: 0px; }
.group:nth-of-type(2) { padding-top: 5px; }
.group:nth-of-type(3) { padding-top: 8px; }
.group:nth-of-type(4) { padding-top: 5px; }
.group:nth-of-type(5) { padding-top: 6px; }
.group:nth-of-type(6) { padding-top: 2.5px; }
.group:nth-of-type(7) { padding-top: 2px; }
.group:nth-of-type(8) { padding-top: 5px; }
.group:nth-of-type(9) { padding-top: 3.5px; }
.group:nth-of-type(10) { padding-top: 5px; }
.group:nth-of-type(11) { padding-top: 4px; }

.group .red { background-color: red; }
.group .blue { background-color: blue; }
.group .black { background-color: black; }
.group .green { background-color: green; }


/*-------------------- spots css -------------------*/
#spots {
  position: absolute;
  top: 110px;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  pointer-events: none
}

.chunk {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  pointer-events: none
}

.chunk span {
  /* this.is the one  */
  width: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  
  box-sizing: border-box;
  pointer-events: auto
}

.chunk span.open {
	background-color: white;
	cursor: pointer;
	animation: open-animation 3s infinite;
  pointer-events: auto;
  opacity: 0.7;
}

.zeroOpa{
  opacity: 0.5;
  pointer-events: none
}

.chunk span.red, 
.chunk span.blue, 
.chunk span.black, 
.chunk span.green{
	opacity: 1;
	border-radius: 1px;
	height: 30px;

	margin-top: -10px;
} 

.chunk span.red { background-color: red; }
.chunk span.blue { background-color: blue; }
.chunk span.black { background-color: black; }
.chunk span.green { background-color: green; }


.chunk:nth-of-type(1)  { width: 321px; }
.chunk:nth-of-type(2)  { width: 464px; }
.chunk:nth-of-type(3)  { width: 464px; }
.chunk:nth-of-type(4)  { width: 617px; }
.chunk:nth-of-type(5)  { width: 617px; }
.chunk:nth-of-type(6)  { width: 763px; }
.chunk:nth-of-type(7)  { width: 763px; }
.chunk:nth-of-type(8)  { width: 617px; }
.chunk:nth-of-type(9)  { width: 617px; }
.chunk:nth-of-type(10) { width: 464px; }
.chunk:nth-of-type(11) { width: 464px; }
.chunk:nth-of-type(12) { width: 321px; }

.chunk:nth-of-type(2n) { padding-top: 19px; }
.chunk:nth-of-type(2n + 1) { padding-top: 71px; }








body {
	padding-top: 120px;
	background-color: #1691c6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.deciding{
  opacity: 0.5;

}

.deciding:hover{
  opacity: 1;
}


.tile-pic{
    
  width: 152px;
  margin-right: -2px;
  height: 172px;
  display: inline-block;
  vertical-align: top;
  background-size: cover;
  
}
/* .tile-pic:hover{
  
} */


.row {
	display: block;
	text-align: center;
  pointer-events: auto;
  top: 10px
}
.row:not(:first-child) {
	margin-top: -43px;
  pointer-events: auto;
}
.tile-pic[prob]:after {
	display: block;
	width: 50px;
	height: 35px;
	margin: 60px 0 0 50px;

	content: attr(prob) "\A" attr(dots);

	line-height: 10px;
	padding-top: 13px;

	background-color: #E9D49D;
	border: 2px solid #AD9D75;
	border-radius: 27px;
	
	font-size: 25px;
	font-weight: bold;

	white-space: pre;
}
</style>
