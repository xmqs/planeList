<template xmlns:>
  <div>
   <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
        航班日期
        <img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
    </header>
    <div class="year_month">
      <li class="month">
        <ul class="picker_header">
          <li>周日</li>
          <li>周一</li>
          <li>周二</li>
          <li>周三</li>
          <li>周四</li>
          <li>周五</li>
          <li>周六</li>
        </ul>
      </li>
    </div>
   <div class="picker container container-vertical" v-on:touchstart="startscroll" v-on:touchmove="scroll" v-on:touchend="scrollend">
      <div class="wrapper" v-bind:style="{ transitionDuration:0, transform: 'translate(0px,'+touch+'px)',webkitTransform: 'translate(0px,'+touch+'px)' }" v-bind:class="{time:time}" ref="wrapper">
      <ul class="slide" v-for="(month,index1) in monthlist">
        <p style="width: 100%;text-align: center;padding: 7px 0;font-size:18px;">{{list[index1][0]}}年{{list[index1][1]}}月</p>
        <ul v-for="(week,index2) in month" class="first_row">
          <li v-for="(day,index3) in week" v-bind:class="{'active':((list[index1][0]>lyear||list[index1][1]>lmonth)||(list[index1][0]==lyear&&list[index1][1]==lmonth&&day>=lday))&&(list[index1][0]==ayear&&list[index1][1]==amonth&&day==aday&&(((index2 <= 1 && day <= 14)&&!(index2 >= 3 && day > 14))||index2 == 2||((index2 >= 3 && day > 14)&&!(index2 <= 1 && day < 7)))),'preday':pred(index2,day),'nextday':nextd(index2,day),'untap':untap(index1,index2,day),'istoday':istodya(index1,index2,day)}" v-on:touchend="test3(index1,index2,day)" v-on:touchstart="test5" v-on:touchmove="test4">{{day}}</li>
        </ul>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
	import Bus from '../cwty/bus.js'
    export default {
        name: "datePick",
      data(){
          return{
            allDay:[],
            //滑动高度
            touch: 0,
            //滑动开始Y坐标
            startY:0,
            //滑动结束Y坐标
            endY:0,
            //是否反弹
            time:false,
            //实际屏幕高度
            screenHeight:0,
            //开始页
            page:2,
            //实际单月高度
            realH:0,
            //分页差值
            d:0,
            p1:false,
            p2:false,
            monthlist:[],
            list:[],
            year:0,
            month:0,
            day:0,
            ryear:0,
            rmonth:0,
            rday:0,
            tapstaic:0,
            tapSY:0,
            tapEY:0,
            riqi:'',
						varietys:"",
            //点击日期存储
            ayear:0,
            amonth:0,
            aday:0,
            //时间界限
            lyear:0,
            lmonth:0,
            lday:0,
          }
      },
      created(){
        var date =new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth()+1;
        this.day = date.getDate()

        this.ryear = date.getFullYear();
        this.rmonth = date.getMonth()+1;
        this.rday = date.getDate()

        this.varietys = this.year+"年"+this.month+"月"+this.day+"日";

        this.monthlist = this.createMonthList(this.year,this.month);
      },
      mounted(){
          setTimeout(()=>{
            this.screenHeight = document.documentElement.clientHeight;
            this.realH = this.$refs.wrapper.offsetHeight/5;
            this.d = (this.screenHeight-this.realH)/2;
            this.touch = -this.realH*this.page+this.d;
            this.startY = -this.page*this.realH+this.d;
            this.endY = -this.page*this.realH+this.d;
          },10)
      },
      methods:{			
          bus (res) {
            setTimeout(() => {
                Bus.$emit('riqi', res)
            }, 30)
            this.$router.back(-1)
        },
        createMonthList(y,m){
          let month = [];
          if(m == 1){
            month = [[y-1,11],[y-1,12],[y,1],[y,2],[y,3]];
          }else if(m == 2){
            month = [[y-1,12],[y,1],[y,2],[y,3],[y,4]];
          }else if(m == 11){
            month = [[y,9],[y,10],[y,11],[y,12],[y+1,1]];
          }else if(m == 12){
            month = [[y,10],[y,11],[y,12],[y+1,1],[y+1,2]];
          }else{
            for (let i = 0;i < 5;i++){
              month.push([y,m-2+i]);
            }
          }
          this.list = month;
          let list = [];
          for (let i = 0;i<5;i++){
            list.push(this.getdateList(month[i][0],month[i][1]))
          }

          return list;
        },
        createList(y,m){
          let month = [];
          if(m == 1){
            month = [[y-1,11],[y-1,12],[y,1],[y,2],[y,3]];
          }else if(m == 2){
            month = [[y-1,12],[y,1],[y,2],[y,3],[y,4]];
          }else if(m == 11){
            month = [[y,9],[y,10],[y,11],[y,12],[y+1,1]];
          }else if(m == 12){
            month = [[y,10],[y,11],[y,12],[y+1,1],[y+1,2]];
          }else{
            for (let i = 0;i < 5;i++){
              month.push([y,m-2+i]);
            }
          }
          return month;
        },
        pred(a,b){
          if(a == 0 && b > 7){
            return true
          }
        },
        nextd(a,b){
          if(a > 3 && b < 15){
            return true
          }
        },
        untap(y,m,d){
          if(this.list[y][0]<this.ryear) {
            return true;
          }else if(this.list[y][0]>this.ryear){
            return false;
          }else if(this.list[y][1]<this.rmonth){
            return true;
          }else if(this.list[y][1]>this.rmonth){
            return false;
          }else if(d<this.rday){
            return true;
          }else{
            return false;
          }
        },
        istodya(y,m,d){
          if(this.list[y][0]==this.ryear&&this.list[y][1]==this.rmonth&&d==this.rday){

            if(d>14&&m<3){
              return false
            }
            if(d<14&&m>3){
              return false
            }
            return true
          }
        },
        test3(index1,index2,day){
          let l = Math.abs(this.tapEY - this.tapSY);
          if((this.tapstaic < 1) || (this.tapstaic < 6 && l<10)){
            //点击事件
            if(index2 == 0&&day > 7){
              this.ayear = this.list[index1][0];
              this.amonth = this.list[index1-1][1];
              this.aday = day
              this.varietys = this.list[index1][0]+"年"+this.list[index1-1][1]+"月"+day+"日";
            }else if(index2 > 3 && day < 14){
              this.ayear = this.list[index1][0];
              this.amonth = this.list[index1+1][1];
              this.aday = day
              this.varietys = this.list[index1][0]+"年"+this.list[index1+1][1]+"月"+day+"日";
            }else {
              this.ayear = this.list[index1][0];
              this.amonth = this.list[index1][1];
              this.aday = day
              this.varietys = this.list[index1][0] + "年" + this.list[index1][1] + "月" + day+"日";
            }
          }
          this.tapstaic = 0;
          this.tapEY = 0;
          this.tapSY = 0;
        },
        test4(e){
          this.tapstaic++;
          this.tapEY = event.changedTouches[0].clientY;
        },
        test5(e){
          this.tapSY = event.changedTouches[0].clientY;
          this.tapstaic = 0;
        },
        startscroll(e){
          e.preventDefault();
          if(this.time){
            return
          }
           this.p1 = true;
          this.startY = event.changedTouches[0].clientY;
        },
        scroll(e){
          e.preventDefault();
          if(this.time){
            return
          }else if(!this.p1){
            return
          }
          this.p2 = true;
          this.touch = this.endY +  event.changedTouches[0].clientY - this.startY;
        },
        scrollend(e){
          e.preventDefault();
          if(this.time || !this.p1 || !this.p2){
            return
          }
          this.startY = 0;
          if((this.touch - this.endY)>60){
            this.page --;
            setTimeout(()=>{
              this.p1 = false;
              this.p2 = false;
              this.time = false;
              //向上翻页
              this.month--;
              this.page++;
              this.touch = -this.realH*this.page+this.d;
              this.startY = -this.page*this.realH+this.d;
              this.endY = -this.page*this.realH+this.d;
              if(this.month == 0){
                this.month = 12;
                this.year--;
              }

              this.list = this.createList(this.year,this.month);

              this.monthlist = [];
              for (let i = this.month-2;i <= this.month+2;i++){
                if(i == -1){
                  this.monthlist.push(this.getdateList(this.year-1,11));
                }else if(i == 0){
                  this.monthlist.push(this.getdateList(this.year-1,12));
                }else if(i == 13){
                  this.monthlist.push(this.getdateList(this.year+1,1));
                }else if(i == 14){
                  this.monthlist.push(this.getdateList(this.year+1,2));
                }else{
                  this.monthlist.push(this.getdateList(this.year,i));
                }
              }

            },200)
          }else if((this.touch - this.endY)<-60){
            this.page ++;
            setTimeout(()=>{
              this.p1 = false;
              this.p2 = false;
              this.time = false;
              //向上翻页
              this.month++;
              this.page--;
              this.touch = -this.realH*this.page+this.d;
              this.startY = -this.page*this.realH+this.d;
              this.endY = -this.page*this.realH+this.d;
              if(this.month == 13){
                this.month = 1;
                this.year++;
              }

              this.list = this.createList(this.year,this.month);

              this.monthlist = [];
              for (let i = this.month-2;i <= this.month+2;i++){
                if(i == -1){
                  this.monthlist.push(this.getdateList(this.year-1,11));
                }else if(i == 0){
                  this.monthlist.push(this.getdateList(this.year-1,12));
                }else if(i == 13){
                  this.monthlist.push(this.getdateList(this.year+1,1));
                }else if(i == 14){
                  this.monthlist.push(this.getdateList(this.year+1,2));
                }else{
                  this.monthlist.push(this.getdateList(this.year,i));
                }
              }
            },200)
          }else{
            setTimeout(()=>{
              this.p1 = false;
              this.p2 = false;
              this.time = false;
              this.touch = -this.realH*this.page+this.d;
              this.startY = -this.page*this.realH+this.d;
              this.endY = -this.page*this.realH+this.d;
            },200)
          }

          this.endY = this.touch;
          this.time = true;
          this.touch = -this.page*this.realH+this.d;
          this.startY = -this.page*this.realH+this.d;
          this.endY = -this.page*this.realH+this.d;

        },
        getEndDate(month, year){
          var thisDate = new Date();
          thisDate.setFullYear(
            year || thisDate.getFullYear()
            ,month || (thisDate.getMonth() + 1)
            ,1);
          return new Date(thisDate.getTime() - 1000*60*60*24).getDate();
        },
        getdateList(year,month){
          let thisDate = new Date();
          thisDate.setFullYear(year,(month-1),1);
          let startWeek = thisDate.getDay();
          let thisMaxDate = this.getEndDate(month, year); //计算当前月的最后一天
          let prevMaxDate;
          if(month == 1){
            year = year-1;
            prevMaxDate = this.getEndDate(12, year); //计算上个月的最后一天
          }else{
            prevMaxDate = this.getEndDate((month-1), year); //计算上个月的最后一天
          }
          var fd = [];
          for (let i = 0 ,j = 1; i < 7 ; i++){
            if(i<startWeek){
              fd.unshift(prevMaxDate);
              prevMaxDate--;
            }else{
              fd.push(j);
              j++;
            }
          }
          for (let j = (8 - startWeek) ; j <= thisMaxDate;j++){
            fd.push(j);
          }
          let NextPd = 42-fd.length;
          for(let i = 1; i <= NextPd ; i++){
            fd.push(i);
          }
          let thismonth = [];
          for (let i = 0;i < 6;i++){
            thismonth.push(fd.splice(0,7));
          }

          return thismonth;
        }
      }
    }
</script>

<style scoped>
  *{
    -webkit-overflow-scrolling: touch;
    font-family: PingFangSC;
  }
  .picker_header{
    display: flex;
    justify-content: space-around;
  }
  .picker_header li{
    display: inline-block;
    color: #fff;
    font-size: 28px;
    font-family: PingFangSC;
  }
  .first_row{
    display: flex;
    justify-content: space-around;
  }
  .first_row li{
    display: inline-block;
    height:80px;
    line-height: 80px;
    width: 100px;
    text-align: center;
    font-size: 32px;
  }
  .item_active{
    background: #285FB1;
    color: #fff;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .container-vertical>.wrapper {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    -ms-transition-property: -ms-transform;
    transition-property: transform;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .slide {
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    width: 100%;
    height: 600px;
    position: relative;
    border-bottom: 1px solid #eee;
  }
  .time{
    transition-duration: 200ms;
    -moz-transition-duration: 200ms;
    -webkit-transition-duration: 200ms;
    -o-transition-duration: 200ms;
  }
  .year_month{
    position: fixed;
    width: 100%;
    height: 70px;
    top: 90px;
    background: #285fb1;
    z-index: 2;
    border-bottom: 1px solid #eee;
  }
  .preday{
    color: #ccc;
  }
  .nextday{
    color: #ccc;
  }
  .untap{
    color: #ccc;
  }
  .istoday{
    color: #0d9bf2;
  }
  .active{
    color: #fff!important;
    background: #285FB1;
  }
</style>
