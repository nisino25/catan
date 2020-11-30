<template>
  <!-- <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img src="https://alexbeals.com/projects/catan/assets/images/lumber.png" alt="" class="tile-pic">
  <img :src="require('./picture/brick.png')" alt="" class="tile-pic">
  <img :src="require('./picture/ore.png')" alt="" class="tile-pic"> -->
  <button class="row" @click="generate()">Generate Map</button>
  <!-- <i class="fas fa-skull-crossbones"></i> -->
  <!-- <font-awesome-icon icon="fa-skull-crossbones" /> -->
  <div v-if="clicked" id="board">
    

    <div class="row">
      <!-- <span class="tile" prob="10" dots="..." style="background-image: :url('https://alexbeals.com/projects/catan/assets/images/brick.png'); color: black"></span> -->
      <!-- <span class="tile-pic" :prob="10" dots="..." :style="{backgroundImage: `(./picture/ ${tileLists[3]} .png)`, color: black }"></span> -->
      <span class="tile-pic" :prob="tileLists.prob[0]" :dots="tileLists.dots[0]" :style="{backgroundImage: `url(${tileLists.url[0]})`, color: tileLists.color[0] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[1]" :dots="tileLists.dots[1]" :style="{backgroundImage: `url(${tileLists.url[1]})`, color: tileLists.color[1] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[2]" :dots="tileLists.dots[2]" :style="{backgroundImage: `url(${tileLists.url[2]})`, color: tileLists.color[2] }"></span>

      <!-- <img  :src="require('./picture/'+ tileLists.item[1] +'.png')" alt="" class="tile-pic" :prob="8">
      <img :src="require('./picture/'+ tileLists.item[2] +'.png')" alt="" class="tile-pic" prob="10"> -->
    </div>

    <div class="row">
      <span class="tile-pic" :prob="tileLists.prob[3]" :dots="tileLists.dots[3]" :style="{backgroundImage: `url(${tileLists.url[3]})`, color: tileLists.color[3] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[4]" :dots="tileLists.dots[4]" :style="{backgroundImage: `url(${tileLists.url[4]})`, color: tileLists.color[4] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[5]" :dots="tileLists.dots[5]" :style="{backgroundImage: `url(${tileLists.url[5]})`, color: tileLists.color[5] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[6]" :dots="tileLists.dots[6]" :style="{backgroundImage: `url(${tileLists.url[6]})`, color: tileLists.color[6] }"></span>

      
    </div>

      
    <div class="row">
      <span class="tile-pic" :prob="tileLists.prob[7]" :dots="tileLists.dots[7]" :style="{backgroundImage: `url(${tileLists.url[7]})`, color: tileLists.color[7] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[8]" :dots="tileLists.dots[8]" :style="{backgroundImage: `url(${tileLists.url[8]})`, color: tileLists.color[8] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[9]" :dots="tileLists.dots[9]" :style="{backgroundImage: `url(${tileLists.url[9]})`, color: tileLists.color[9] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[10]" :dots="tileLists.dots[10]" :style="{backgroundImage: `url(${tileLists.url[10]})`, color: tileLists.color[10] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[11]" :dots="tileLists.dots[11]" :style="{backgroundImage: `url(${tileLists.url[11]})`, color: tileLists.color[11] }"></span>
    </div>
    
    <div class="row">
      <span class="tile-pic" :prob="tileLists.prob[12]" :dots="tileLists.dots[12]" :style="{backgroundImage: `url(${tileLists.url[12]})`, color: tileLists.color[12] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[13]" :dots="tileLists.dots[13]" :style="{backgroundImage: `url(${tileLists.url[13]})`, color: tileLists.color[13] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[14]" :dots="tileLists.dots[14]" :style="{backgroundImage: `url(${tileLists.url[14]})`, color: tileLists.color[14] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[15]" :dots="tileLists.dots[15]" :style="{backgroundImage: `url(${tileLists.url[15]})`, color: tileLists.color[15] }"></span>


    </div>

    <div class="row">
      <span class="tile-pic" :prob="tileLists.prob[16]" :dots="tileLists.dots[16]" :style="{backgroundImage: `url(${tileLists.url[16]})`, color: tileLists.color[16] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[17]" :dots="tileLists.dots[17]" :style="{backgroundImage: `url(${tileLists.url[17]})`, color: tileLists.color[17] }"></span>
      <span class="tile-pic" :prob="tileLists.prob[18]" :dots="tileLists.dots[18]" :style="{backgroundImage: `url(${tileLists.url[18]})`, color: tileLists.color[18] }"></span>


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

      robberLocation: null,



      exam: './picture/brick.png',

      picLink: 'https://alexbeals.com/projects/catan/assets/images/ore.png',
      

    }
  },
  methods:{
    generate(){
      this.clicked = true
      let loopCount = 0;
      this.tileCount = 0;

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

      this.robberLocation = null


      

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
            this.robberLocation = loopCount
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
        
        if(loopCount === this.robberLocation){
          tempLists.prob[loopCount] = 'Rob'
          tempLists.dots[loopCount] = '___';
          tempLists.color[loopCount] = 'green';
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
    }
  }
}
</script>

<style>
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
.tile-pic{
    width: 152px;
    margin-right: -2px;
    height: 172px;
    display: inline-block;
    vertical-align: top;
    background-size: cover;
}
.row {
	display: block;
	text-align: center;
}
.row:not(:first-child) {
	margin-top: -43px;
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
