<template>
 <div>
   <div class="middle">
     <ul>
       <li>Support Us</li>
       <li>Contact Us</li>
       <li>INFO</li>
     </ul>
   </div>
   <div class="subheader">Rescue anyone, anytime, with any device.</div>
   <div><img src="../assets/EgyptLogo.png" alt="egypt"></div>
    <div class="footer">
       <div class="left card"> <span class="dot"></span> 12 <span class="caption"> Cities</span> </div>
       <div class="center card"><span class="dot"></span> 100,000 <span class="caption"> Users</span></div>
       <div class="right card"> <span class="dot"></span> 63 <span class="caption"> Solved Cases </span></div>
   </div>
 </div>
</template>

<script>

export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped>
// .logo{
//   font-family: 'Berlin Sans FB Regular';
//   font-size: 45px;
//   float: left;
//   color: white;
//   padding-left: 15px;
// }
.middle{
  margin: 18px auto;
  width: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19);

}

ul{
  font-family: 'Roboto', sans-serif;
  list-style-type: none;
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
  display: flex;
}
li{
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  margin: 0px 38px;
  font-size: 22px;
}
// .login{
//   float: right;
//   font-family: 'Roboto', sans-serif;
//   font-size: 20px;
//   margin-top: 25px;
//   margin-right: 75px;
//   text-decoration: none;
//   color: white;
// }
.subheader{
  color: white;
  font-size: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight:600;
  margin-top: 20px ;
}
img{
  height: 300px;
  width: 300px;
  margin-top: 50px;
}
.footer{
  display: inline-flex;
}
.card {
  width: 250px;
  height: 100px;
  background-color: #46548B;
  opacity: 90%;
  color: white;
  margin: 0 100px;
  font-size: 35px;
  text-align: left;
  display: inline;
}
.dot{
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 30px;
  margin-left: 10px;
}
.left{
  border-left: 5px solid orange;
  .dot{
      border: 5px solid orange;
  }
}
.center{
  border-left: 5px solid mediumturquoise;
   .dot{
      border: 5px solid mediumturquoise;
  }
}
.right{
  border-left: 5px solid rgb(143, 52, 52);
  .dot{
      border: 5px solid rgb(143, 52, 52);
  }
}
.caption{
  position: relative;
  font-size: 20px;
  margin-top: 10px;
}

</style>
