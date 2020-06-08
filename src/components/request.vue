<template>
  <div>
      <div class="no-requests" v-if="getRequests.length === 0">
          <h3>This Department Has No Requests Yet.</h3>
      </div>
    <div class="requests" v-else>
      <ul class="requestTable-firstTable">
        <li
          class="requestTable-firstTable_table"
          v-for="request in getRequests"
          :key="request.requestId"
        >
          <h1 class="requestTable-firstTable_table__header">
            {{ request.userFullName }}
            <br />
            {{ request.userEmail }}
            <button class="requestTable-firstTable_table__header__location">
                <a
                :href="`https://maps.google.com?q=loc:${request.requestLocationLatitude}+${request.requestLocationLongitude}`"
                target="_blank"><b-icon icon="map" aria-hidden="true"></b-icon></a>
            </button>
          </h1>
          <ul class="requestTable-firstTable_table__request">
              <li>
              <span>State</span>
              <br />
              <span>{{ request.requestStateName }}</span>
            </li>
            <li>
              <span>requestCreationDate</span>
              <br />
              <span>{{ request.requestCreationDate}}</span>
            </li>
            <li>
              <span>requestLastModified</span>
              <br />
              <span>{{ request.requestLastModified}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch(
      'manager/getDepartmentRequests',
      this.$route.params.id,
    ).catch(() => {
      this.$notify({
        message: 'Somthing Went Wrong. Please Try again',
        icon: 'ti-error',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger',
      });
    });
  },
  computed: {
    getRequests() {
      return this.$store.state.manager.departmentRequests;
    },
  },
};
</script>

<style lang="scss" scoped>
$h1color: #6e768d;
$h3color: #b4bdc6;
$widthoftable: 28%;
$bgctables: #ffffff;
$bgfontcolor: #717787;

.mainActions {
  display: block;
  text-align: left;
  padding: 20px;
}
.requests {
  width: 90%;
  background-color: #212120;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 50px;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
}
.subhead {
  color: gray;
}
.no-requests{
    display: flex;
    margin-top: 16%;
    h3{
        margin: 0 auto;
    }
}

.requestTable {
  margin: 20px auto;
  color: #212120;

  &-firstTable {
    list-style: none;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;

    &_table {
      vertical-align: middle;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      width: $widthoftable;
      background-color: $bgctables;
      display: inline-block;
      padding: 0px 30px 40px;
      text-align: center;
      max-width: 320px;
      transition: all 0.3s ease;
      border-radius: 5px;
      margin: 2rem;

      @media screen and (max-width: 767px) {
        display: block;
        width: 90%;
        margin: 0 auto;
        max-width: 90%;
        margin-bottom: 20px;
        padding: 10px;
        padding-left: 20px;
      }

      & > * {
        @media screen and (max-width: 767px) {
          display: inline-block;
          vertical-align: middle;
        }

        @media screen and (max-width: 480px) {
          display: block;
          float: none;
        }
      }

      &:after {
        @media screen and (max-width: 767px) {
          display: table;
          content: "";
          clear: both;
        }
      }

      &:hover {
        transform: scale(1.08);
        @media screen and (max-width: 767px) {
          transform: none;
        }
      }

      &:not(:last-of-type) {
        margin-right: (100%-$widthoftable * 3)/20;
        @media screen and (max-width: 767px) {
          margin-right: auto;
        }
      }

      &__header {
        font-size: 0.8em;
        padding-top: 10px;
        color: #212120;
        text-align: left;
        &__location{
            background-color: #212120;
            border: none;
            border-radius: 5px;
            float: right;
            color: white;
            a:link {
                color: white;
            }
            a:visited {
                color: white;
            }
        }
      }

      &__request {
        text-align: left;
        list-style: none;
        color: gray;
        font-size: 3em;
        padding: 10px 0px;
        line-height: 0.2;

        @media screen and (max-width: 1068px) {
          font-size: 2.8em;
        }

        @media screen and (max-width: 767px) {
          border-bottom: none;
          padding: 0;
          float: left;
          clear: left;
          width: 33%;
        }

        @media screen and (max-width: 610px) {
          font-size: 2.4em;
        }

        @media screen and (max-width: 480px) {
          float: none;
          width: 100%;
          font-size: 3em;
          margin-bottom: 10px;
        }
        li{
            margin-bottom: 7px;
        }
        span:first-of-type {
          font-size: 0.35em;
          // vertical-align: top;
          @media screen and (max-width: 1068px) {
            font-size: 0.3em;
          }
        }
        span:last-of-type {
          font-size: 0.3em;
          padding-left: 0.2em;
          color: #212120;
          @media screen and (max-width: 1068px) {
            font-size: 0.25em;
          }
        }
      }

      &__getstart {
        color: white !important;
        background-color: gray;
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
        letter-spacing: 0.07em;
        transition: all 0.4s ease;

        a {
          color: white;
        }

        @media screen and (max-width: 1068px) {
          font-size: 0.95em;
        }

        @media screen and (max-width: 767px) {
          margin-top: 0;
        }

        @media screen and (max-width: 610px) {
          font-size: 0.9em;
          padding: 10px;
        }

        @media screen and (max-width: 480px) {
          font-size: 1em;
          width: 50%;
          margin: 10px auto;
        }
      }
    }
  }
}
</style>
