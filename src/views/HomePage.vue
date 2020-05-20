<template>
 <b-container fluid class="home">
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
       <div class="left card"> <span class="dot"></span> 12 <br><span class="caption"> Cities</span> </div>
       <div class="center card"><span class="dot"></span> 100,000 <br><span class="caption"> Users</span></div>
       <div class="right card"> <span class="dot"></span> 63 <br><span class="caption"> Solved Cases </span></div>
   </div>
 </b-container>
</template>

<script>

export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped>
.home{
  background: url("../assets/LOGOextract.png"), linear-gradient(#3C4357, #46548B) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  position: fixed;
  overflow-y: auto;
}
.middle{
  margin: 0 auto;
  width: 50%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19);

}

ul{
  font-family: 'Roboto', sans-serif;
  list-style-type: none;
  overflow: hidden;
  display: flex;
  padding: 0;
}
li{
    color: black;
    text-align: center;
    text-decoration: none;
    font-size: 22px;
    margin: 0 auto;
}
.subheader{
  color: white;
  font-size: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight:600;
}
img{
  height: 300px;
  width: 300px;
}
.footer{
  width: 100%;
  display: inline-flex;
}
.card {
    background-color: #46548B;
    opacity: 90%;
    color: white;
    font-size: 35px;
    margin: 0 auto;
    padding: 10px;
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
    font-size: 20px;
    margin-left: 50px;
}

</style>
