<template>
  <div class='mainActions'>
    <h3>Dashboard</h3>
    <p class='subhead'>Manage Entity</p>
    <b-overlay :show='status' opacity='1' variant='transparent' spinner-variant='primary'>
      <div class='departments'>
        <ul class='departmentTable-firstTable'>
          <li
            class='departmentTable-firstTable_table'
            v-for='department in getDepartments'
            :key='department.departmentId'
          >
            <h1 class='departmentTable-firstTable_table__header'>
              {{ department.distributionName }}
              <br />
              {{ department.authorityTypeName }}
              <button
                class='departmentTable-firstTable_table__header__location'
              >
                <a
                  :href='`https://maps.google.com?q=loc:${department.latitude}+${department.longitude}`'
                  target='_blank'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='15'
                    viewBox='0 0 16 20'>
                    <path
                      class='pin'
                      d='M78.625,0a8.061,8.061,0,0,0-8.052,8.052c0,
                      5.51,7.206,13.6,7.513,13.941a.725.725,0,0,0,
                      1.079,0c.307-.342,7.513-8.431,7.513-13.941A8.062,
                      8.062,0,0,0,78.625,0Zm0,12.1a4.051,4.051,0,1,1,4.051-4.051A4.056,
                      4.056,0,0,1,78.625,12.1Z'
                      transform='translate(-70.573)'
                    />
                  </svg>
                </a>
              </button>
            </h1>
            <ul class='departmentTable-firstTable_table__department'>
              <li>
                <span>longitude</span>
                <br />
                <span>{{ department.longitude }}</span>
              </li>
              <li>
                <span>latitude</span>
                <br />
                <span>{{ department.latitude }}</span>
              </li>
            </ul>
            <div
              class='departmentTable-firstTable_table__getstart'
              v-b-popover.hover.right='`${department.agentsEmails}`'
              title='Agents'
            >View Agents</div>
            <div
              class='departmentTable-firstTable_table__getstart'
              v-b-popover.hover.right='`${department.rescuersEmails}`'
              title='Rescuers'
            >View Rescuers</div>
            <router-link :to='`requests/${department.id}`'>
              <div class='departmentTable-firstTable_table__getstart'>Activate</div>
            </router-link>
          </li>
        </ul>
      </div>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    getDepartments() {
      return this.$store.state.manager.departments;
    },
    status() {
      return this.$store.state.manager.status === 'loading';
    },
  },
};
</script>

<style lang='scss' scoped>
$h1color: #6e768d;
$h3color: #b4bdc6;
$widthoftable: 28%;
$bgctables: #ffffff;
$bgfontcolor: #717787;

.pin{
  fill: #ffffff;
}

.mainActions {
  display: block;
  text-align: left;
  padding: 20px;
}
.departments {
  width: 90%;
  background-color: #293147;
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

.departmentTable {
  margin: 20px auto;
  color: black;

  &-firstTable {
    list-style: none;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;

    &_table {
      vertical-align: middle;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      width: $widthoftable;
      background-color: $bgctables;
      display: inline-block;
      padding: 0px 30px 15px;
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
          content: '';
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
        color: black;
        text-align: left;
        &__location {
          background-color: #293147;
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

      &__department {
        text-align: left;
        list-style: none;
        margin-bottom: 5px;
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
          color: black;
          @media screen and (max-width: 1068px) {
            font-size: 0.25em;
          }
        }
      }

      &__getstart {
        color: white !important;
        font-weight: 500;
        background-color: gray;
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
        letter-spacing: 0.07em;
        transition: all 0.4s ease;

        a {
          color: white;
          text-decoration: none;
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
      &__getstart:nth-child(1) {
        background-color: green;
        margin-top: 15px;
      }
    }
  }
}
</style>
