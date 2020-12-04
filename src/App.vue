<template>
  <!-- <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img :src="require('./picture/brick.png')" alt="" class="tile-pic">
  <img :src="require('./picture/ore.png')" alt="" class="tile-pic"> -->

  
  <button class="row" @click="generate()" v-if="!readyToPlay">Generate Map</button>
  <button class="row" v-if="genCount > 0 && !readyToPlay" @click="toggleReady()"> Go with this map </button>
  <button class="row" v-if="readyToPlay" @click="toggleReady()"> Restart </button>
  
  <button class="row" @click="rollDice()" v-if="readyToPlay"> Roll Dice</button>
  <!-- <button class="row" @click="seven()" v-if="readyToPlay"> move robber</button> -->


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
        <span data-num="0" :class="spotLists[0]" @click="setItem(0)"></span>
        <span data-num="1" :class="spotLists[1]" @click="setItem(1)"></span>
        <span data-num="2" :class="spotLists[2]" @click="setItem(2)"></span>
      </div>
      <div class="chunk">
        <span data-num="3" :class="spotLists[3]" @click="setItem(3)"></span>
        <span data-num="4" :class="spotLists[4]" @click="setItem(4)"></span>
        <span data-num="5" :class="spotLists[5]" @click="setItem(5)"></span>
        <span data-num="6" :class="spotLists[6]" @click="setItem(6)"></span>
      </div>
      <div class="chunk">
        <span data-num="7" :class="spotLists[7]" @click="setItem(7)"></span>
        <span data-num="8" :class="spotLists[8]" @click="setItem(8)"></span>
        <span data-num="9" :class="spotLists[9]" @click="setItem(9)"></span>
        <span data-num="10" :class="spotLists[10]" @click="setItem(10)"></span>
      </div>
      <div class="chunk">
        <span data-num="11" :class="spotLists[11]" @click="setItem(11)"></span>
        <span data-num="12" :class="spotLists[12]" @click="setItem(12)"></span>
        <span data-num="13" :class="spotLists[13]" @click="setItem(13)"></span>
        <span data-num="14" :class="spotLists[14]" @click="setItem(14)"></span>
        <span data-num="15" :class="spotLists[15]" @click="setItem(15)"></span>
      </div>
      <div class="chunk">
        <span data-num="16" :class="spotLists[16]" @click="setItem(16)"></span>
        <span data-num="17" :class="spotLists[17]" @click="setItem(17)"></span>
        <span data-num="18" :class="spotLists[18]" @click="setItem(18)"></span>
        <span data-num="19" :class="spotLists[19]" @click="setItem(19)"></span>
        <span data-num="20" :class="spotLists[20]" @click="setItem(20)"></span>

      </div>
      <div class="chunk">
        <span data-num="21" :class="spotLists[21]" @click="setItem(21)"></span>
        <span data-num="22" :class="spotLists[22]" @click="setItem(22)"></span>
        <span data-num="23" :class="spotLists[23]" @click="setItem(23)"></span>
        <span data-num="24" :class="spotLists[24]" @click="setItem(24)"></span>
        <span data-num="25" :class="spotLists[25]" @click="setItem(25)"></span>
        <span data-num="26" :class="spotLists[26]" @click="setItem(26)"></span>
      </div>

      <div class="chunk">
        <span data-num="27" :class="spotLists[27]" @click="setItem(27)"></span>
        <span data-num="28" :class="spotLists[28]" @click="setItem(28)"></span>
        <span data-num="29" :class="spotLists[29]" @click="setItem(29)"></span>
        <span data-num="30" :class="spotLists[30]" @click="setItem(30)"></span>
        <span data-num="31" :class="spotLists[31]" @click="setItem(31)"></span>
        <span data-num="32" :class="spotLists[32]" @click="setItem(32)"></span>

      </div>
      <div class="chunk">
        <span data-num="33" :class="spotLists[33]" @click="setItem(33)"></span>
        <span data-num="34" :class="spotLists[34]" @click="setItem(34)"></span>
        <span data-num="35" :class="spotLists[35]" @click="setItem(35)"></span>
        <span data-num="36" :class="spotLists[36]" @click="setItem(36)"></span>
        <span data-num="37" :class="spotLists[37]" @click="setItem(37)"></span>

      </div>
      <div class="chunk">
        <span data-num="38" :class="spotLists[38]" @click="setItem(38)"></span>
        <span data-num="39" :class="spotLists[39]" @click="setItem(39)"></span>
        <span data-num="40" :class="spotLists[40]" @click="setItem(40)"></span>
        <span data-num="41" :class="spotLists[41]" @click="setItem(41)"></span>
        <span data-num="42" :class="spotLists[42]" @click="setItem(42)"></span>

      </div>
      <div class="chunk">
        <span data-num="43" :class="spotLists[43]" @click="setItem(43)"></span>
        <span data-num="44" :class="spotLists[44]" @click="setItem(44)"></span>
        <span data-num="45" :class="spotLists[45]" @click="setItem(45)"></span>
        <span data-num="46" :class="spotLists[46]" @click="setItem(46)"></span>
      </div>
      <div class="chunk">
        <span data-num="47" :class="spotLists[47]" @click="setItem(47)"></span>
        <span data-num="48" :class="spotLists[48]" @click="setItem(48)"></span>
        <span data-num="49" :class="spotLists[49]" @click="setItem(49)"></span>
        <span data-num="50" :class="spotLists[50]" @click="setItem(50)"></span>

      </div>
      <div class="chunk">
        <span data-num="51" :class="spotLists[51]" @click="setItem(51)"></span>
        <span data-num="52" :class="spotLists[52]" @click="setItem(52)"></span>
        <span data-num="53" :class="spotLists[53]" @click="setItem(53)"></span>
      </div>

    </div>

    <div class="roads">
      <!-- 1st row -->
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>

      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>

      <!-- 2nd row -->
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>

      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>

      <!-- 3rd  -->
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>

      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>

      <!-- 4th  -->
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>

      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      

      <!-- 5th  -->
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>


      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>
      <button class="vert"></button>

      <!-- 6th -->
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>
      <button class="down"></button>
      <button class="up"></button>


    </div>
    

    

  </div>


</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'App',
  components: {
    // library,
    // faUserSecret,
    // FontAwesomeIcon,
  },
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
      OrderOder: 1,

      spotLists: null,

      tileholds: null,



      exam: './picture/brick.png',

      picLink: 'https://alexbeals.com/projects/catan/assets/images/ore.png',
      

    }
  },
  methods:{

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
      }else{
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
      console.log(actualCount)
      while(actualCount < 19){
          // 4th row
          // 5th row
        tempLists.holds[actualCount][CountForList] = true;
        tempLists.holds[actualCount][CountForList+4] = true;
        tempLists.holds[actualCount][CountForList+5] = true;
        tempLists.holds[actualCount][CountForList+8] = true;
        tempLists.holds[actualCount][CountForList+9] = true;
        tempLists.holds[actualCount][CountForList+12] = true;
        actualCount++
        CountForList++
      }

      
      // console.log(tempLists)

      this.tileholds = tempLists

      
      
      // tempLists.holds[0] = [false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

    },
    generate(){
      console.log('hey')
      this.genCount++;
      this.OrderOder = 1;
      this.robberCount = 0;
      this.clicked = true
      let loopCount = 0;
      this.tileCount = 0;

      this.spotLists = ['open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open','open']
      

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

      this.attachingSpots();      
      
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

      console.log(tempLists)
      this.tileLists = tempLists
      this.tileLink = tempLink


      // console.log(`${this.tileLists.item[15]} ${this.tileholds.holds[15][3]}`)
    },

    rollDice(){
      if(this.OrderOder < 9){
        alert(`You can't roll dice unless everyones put the settlements`)
        return
      }
      if(this.movingRobber){
        alert('You have to decide the location for the robber first')
        return
      }


      // first one
      this.randomNum = Math.random()
      while(this.randomNum > 0.6 ){
        this.randomNum = Math.random()
      }

      if(this.randomNum <= 0.1){
        this.diceOne = 1
      }else if(this.randomNum <= 0.2){
        this.diceOne =2
      }else if(this.randomNum <= 0.3){
        this.diceOne =3
      }else if(this.randomNum <= 0.4){
        this.diceOne =  4
      }else if(this.randomNum <= 0.5){
        this.diceOne =5
      }else if(this.randomNum <= 0.6){
        this.diceOne =6
      }

      // seconde dice

      this.randomNum = Math.random()
      while(this.randomNum > 0.6 ){
        this.randomNum = Math.random()
      }

      if(this.randomNum <= 0.1){
        this.diceTwo = 1
      }else if(this.randomNum <= 0.2){
        this.diceTwo =2
      }else if(this.randomNum <= 0.3){
        this.diceTwo =3
      }else if(this.randomNum <= 0.4){
        this.diceTwo =  4
      }else if(this.randomNum <= 0.5){
        this.diceTwo =5
      }else if(this.randomNum <= 0.6){
        this.diceTwo =6
      }

      this.diceSum = this.diceOne + this.diceTwo
      console.log(`1st: ${this.diceOne}, 2nd: ${this.diceTwo}, Sum: ${this.diceSum}`)



      let CheckCount = 0
      while(CheckCount < 19){
        if( parseInt(this.tileLists.prob[CheckCount]) === this.diceSum && parseInt(this.tileLists.prob[CheckCount]) && this.robberLocation ){
          // console.log(this.tileLists.item[CheckCount])
          let spotsCount = 0
          while(spotsCount < 55){
            if(this.tileholds.holds[CheckCount][spotsCount] && this.spotLists[spotsCount] !== 'open'  ){
              console.log(`${this.spotLists[spotsCount]}: ${this.tileLists.item[CheckCount]} `)
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
    seven(){
      this.movingRobber = true;

    },
    clickTile(num){
      // console.log('hhh')
      if(!this.movingRobber){
        console.log('not ready')
        return;
      }

      // let itemName;
      // if(this.tileLists.url[num] === 'https://alexbeals.com/projects/catan/assets/images/lumber.png'){
      //   itemName = 'Tree'
      // }else if(this.tileLists.url[num] === 'https://alexbeals.com/projects/catan/assets/images/brick.png'){
      //   itemName = 'Brick'
      // }else if(this.tileLists.url[num] === 'https://alexbeals.com/projects/catan/assets/images/sheep.png'){
      //   itemName = 'Sheep'
      // }else if(this.tileLists.url[num] === 'https://alexbeals.com/projects/catan/assets/images/wheat.png'){
      //   itemName = 'Wheat'
      // }else if(this.tileLists.url[num] === 'https://alexbeals.com/projects/catan/assets/images/ore.png'){
      //   itemName = 'Ore'
      // }


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

      // ----------------------------------------------------------------------------------------------------


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
    setItem(num){
      console.log(num)
      if(!this.readyToPlay){
        alert(`Select Go with this map first `)
        return
      }

      if(this.OrderOder ===1 || this.OrderOder === 8){
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

      
      
    }
  }
}
</script>

<style>


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
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    opacity: 0.4;
    box-sizing: border-box;
    pointer-events: auto
}

.chunk span.open {
	background-color: white;
	cursor: pointer;
	animation: open-animation 3s infinite;
  pointer-events: auto
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
