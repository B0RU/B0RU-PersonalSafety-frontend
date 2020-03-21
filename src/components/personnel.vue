<template>
<div class="requestTable">
  <!-- <h2 class="requestTable-title">Bla bla bla</h2>
  <h3 class="requestTable-subtitle"> Lorem ipsum dolor sit amet consectetur, </h3> -->
  <ul class="requestTable-firstTable">
    <li class="requestTable-firstTable_table" v-for="request in SOSRequests" :key="request.requestId">
      <h1 class="requestTable-firstTable_table__header">{{request.requestId}}</h1>
      <h3 class="requestTable-firstTable_table__header">{{request.requestStateName}}</h3>
      <ul class="requestTable-firstTable_table__request">
        <li><span>Patient Age:</span><span>{{request.userAge}}</span></li>
        <li><span>Patient Blood Type:</span><span>{{request.userBloodTypeName}}</span></li>
        <li><span>Patient medical History:</span><span>{{request.userMedicalHistoryNotes}}</span></li>
      </ul>
      <ul class="requestTable-firstTable_table__options">
        <li>{{request.userEmail}}</li>
        <li>{{request.userPhoneNumber}}</li>
        <li>{{request.userNationalId}}</li>
      </ul>
      <div class="requestTable-firstTable_table__getstart">
      <a
      :href="`https://maps.google.com?q=${request.requestLocationLatitude},${request.requestLocationLongitude}`"
      target="_blank"> View Patient Location </a> </div>
      <div class="requestTable-firstTable_table__getstart"
      v-if="request.requestStateName === 'Pending'"
      @click="acceptRequest(request.requestId)">Accept</div>
    </li>
    <!-- <li class="requestTable-firstTable_table">
      <h1 class="requestTable-firstTable_table__header">Lorem ipsum dolor sit amet</h1>
      <p class="requestTable-firstTable_table__request"><span></span><span></span><span></span></p>
      <ul class="requestTable-firstTable_table__options">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="requestTable-firstTable_table__getstart">Lorem</div>
    </li>
    <li class="requestTable-firstTable_table">
      <h1 class="requestTable-firstTable_table__header">Lorem ipsum dolor sit amet consectetur</h1>
      <p class="requestTable-firstTable_table__request"><span></span><span></span><span></span></p>
      <ul class="requestTable-firstTable_table__options">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="requestTable-firstTable_table__getstart">lorem</div>
    </li> -->
  </ul>
</div>
</template>
<script>
const signalR = require('@aspnet/signalr');

export default {
  name: 'Personnel',
  data() {
    return {
      connection: '',
    };
  },
  created() {
    this.getSOSRequests();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://personalsafety.azurewebsites.net/hubs/personnel', {
        // eslint-disable-next-line prefer-template
        accessTokenFactory: () => localStorage.getItem('token'),
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start()
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.connection.on('PersonnelChannel', () => {
      this.getSOSRequests();
      console.log('changes Recieved');
    });
  },
  methods: {
    getSOSRequests() {
      this.$store.dispatch('personnel/getRequests');
    },
    acceptRequest(requestId) {
      this.$store.dispatch('personnel/acceptRequest', requestId)
        .then(() => this.getSOSRequests());
      console.log(requestId);
    },
  },
  computed: {
    SOSRequests() {
      return this.$store.getters.SOSRequests;
    },
  },
};
</script>

<style lang="scss" scoped>
$h1color: #6e768d;
$h3color: #b4bdc6;
$widthoftable: 31%;
$bgctables: #ffffff;
$bgfontcolor: #717787;

.requestTable{
  margin: 40px auto;
  color: black;
  &>&-title{
    text-align: center;
    color: $h1color;
    font-size: 3em;
    font-size: 300%;
    margin-bottom: 20px;
    letter-spacing: 0.04em;
  }

  &>&-subtitle{
    text-align: center;
    color: $h3color;
    font-size: 1.8em;
    letter-spacing: 0.04em;
    margin-bottom: 60px;

    @media screen and (max-width: 480px){
      margin-bottom: 30px;
    }
  }

  &-firstTable{
    list-style: none;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;

    &_table{
      vertical-align: middle;
      width: $widthoftable;
      background-color: $bgctables;
      display: inline-block;
      padding: 0px 30px 40px;
      text-align: center;
      max-width: 320px;
      transition: all 0.3s ease;
      border-radius: 5px;
      margin: 2rem;

      @media screen and (max-width: 767px){
        display: block;
        width: 90%;
        margin: 0 auto;
        max-width: 90%;
        margin-bottom: 20px;
        padding: 10px;
        padding-left: 20px;
      }

      & > * {
         @media screen and (max-width: 767px){
           display: inline-block;
           vertical-align: middle;
        }

         @media screen and (max-width: 480px){
          display: block;
           float: none;
        }
      }

      &:after {
         @media screen and (max-width: 767px){
           display: table;
           content: '';
           clear: both;
        }
      }

      &:hover{
        transform: scale(1.08);
        @media screen and (max-width: 767px){
          transform: none;
        }
      }

      &:not(:last-of-type){
        margin-right: (100%-$widthoftable*3)/2;
         @media screen and (max-width: 767px){
           margin-right: auto;
         }
      }

      &__header{
        font-size: 1.6em;
        padding: 40px 0px;
        border-bottom: 2px solid #ebedec;
        letter-spacing: 0.03em;

        @media screen and (max-width: 1068px){
           font-size: 1.45em;
        }
         @media screen and (max-width: 767px){
            padding: 0px;
            border-bottom: none;
            float: left;
            width: 33%;
           padding-top: 3%;
           padding-bottom: 2%;
        }

        @media screen and (max-width: 610px){
          font-size: 1.3em;
        }

        @media screen and (max-width: 480px){
           float: none;
           width: 100%;
          font-size: 1.8em;
          margin-bottom: 5px;
        }

      }

      &__request{
        text-align: left;
        list-style: none;
        font-size: 3em;
        padding: 30px 0px;
        border-bottom: 2px solid #ebedec;
        line-height: 0.7;

         @media screen and (max-width: 1068px){
           font-size: 2.8em;
        }

        @media screen and (max-width: 767px){
          border-bottom: none;
          padding: 0;
          float: left;
          clear: left;
          width: 33%;
        }

         @media screen and (max-width: 610px){
          font-size: 2.4em;
        }

         @media screen and (max-width: 480px){
           float: none;
           width: 100%;
           font-size: 3em;
           margin-bottom: 10px;
        }

        span:first-of-type{
          font-size: 0.35em;
          // vertical-align: top;
           @media screen and (max-width: 1068px){
           font-size: 0.3em;
          }
        }
        span:last-of-type{
          vertical-align: bottom;
          font-size: 0.30em;
          letter-spacing: 0.04em;
          padding-left: 0.2em;
          color: #71CE73;
           @media screen and (max-width: 1068px){
           font-size: 0.25em;
          }
        }
      }

      &__options{
        list-style: none;
        padding: 15px;
        font-size: 0.9em;
        border-bottom: 2px solid #ebedec;

         @media screen and (max-width: 1068px){
           font-size: 0.85em;
        }

        @media screen and (max-width: 767px){
          border-bottom: none;
          padding: 0;
          margin-right: 10%;
        }

         @media screen and (max-width: 610px){
          font-size: 0.7em;
           margin-right: 8%;
        }

        @media screen and (max-width: 480px){
          font-size: 1.3em;
           margin-right: none;
          margin-bottom: 10px;
        }


        &>li{
          padding: 8px 0px;

           @media screen and (max-width: 767px){
               text-align: left;
            }

           @media screen and (max-width: 610px){
            padding: 5px 0;
          }

           @media screen and (max-width: 480px){
             text-align: center;
          }

          &:before{
            content: '✓';
            display: inline-block;
            margin-right: 15px;
            color: white;
            background-color: #74ce6a;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            font-size: 0.8em;
            padding: 2px;
            text-align: center;

             @media screen and (max-width: 1068px){
               width: 14px;
               height: 14px;
               padding: 1.5px;
            }

            @media screen and (max-width: 767px){
               width: 12px;
               height: 12px;
            }

          }
        }
      }

      &__getstart{
        color: white !important;
        background-color: #71ce73;
        margin-top: 30px;
        border-radius: 5px;
        cursor: pointer;
        padding: 15px;
        box-shadow: 0px 3px 0px 0px rgba(102, 172, 100, 1);
        letter-spacing: 0.07em;
        transition: all 0.4s ease;

        a{
          color: white;
        }

         @media screen and (max-width: 1068px){
           font-size: 0.95em;
        }

        @media screen and (max-width: 767px){
          margin-top: 0;
        }

         @media screen and (max-width: 610px){
          font-size: 0.9em;
           padding: 10px;
        }

        @media screen and (max-width: 480px){
          font-size: 1em;
           width: 50%;
          margin: 10px auto;
        }

        &:hover{
          transform: translateY(-10px);
          box-shadow: 0px 40px 29px -19px rgba(102, 172, 100, 0.9);
          @media screen and (max-width: 767px){
            transform: none;
            box-shadow: none;
          }
        }

        &:active{
          box-shadow: inset 0 0 10px 1px rgba(102, 165, 100, 1), 0px 40px 29px -19px rgba(102, 172, 100, 0.95);
          transform: scale(0.95) translateY(-9px);
          @media screen and (max-width: 767px){
            transform: scale(0.95) translateY(0);
            box-shadow:  none;
          }
        }
      }
    }
  }
}
body{
  font-family: 'Montserrat', sans-serif;
  font-size: 100%;
  background-color: #f0f4f7;
  color: $bgfontcolor;

  @media screen and (max-width: 960px){
    font-size: 80%;
  }
    @media screen and (max-width: 776px){
    font-size: 70%;
  }
    @media screen and (max-width: 496px){
    font-size: 50%;
  }
    @media screen and (max-width: 320px){
    font-size: 40%;
  }
}

*{
  padding:   0;
  margin: 0;
  box-sizing: border-box;
}
</style>
