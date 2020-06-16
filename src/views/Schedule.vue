<template>
  <div id="schedule">
    <loading
      :active.sync="loader.isLoading"
      :is-full-page="loader.fullPage"
      :color="loader.color"
      :background-color="loader.backgroundColor"
    ></loading>

    <PersonalInformation
      v-show="tab === 'personalInformation'"
      :changeTab="changeTab"
      :setData="setData"
      :userData="userData"
    />
    <Schedule v-show="tab === 'schedule'" :changeTab="changeTab" :userData="userData" />
    <Finish v-show="tab === 'finish'" :changeTab="changeTab" />
  </div>
</template>

<script>
import PersonalInformation from "@/components/schedule/PersonalInformation.vue";
import Schedule from "@/components/schedule/Schedule.vue";
import Finish from "@/components/schedule/Finish.vue";

import config from "@/config/config.json";
import axios from "axios";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "schedule",
  components: {
    Loading,
    PersonalInformation,
    Schedule,
    Finish
  },
  props: {
    setData: Function,
    userId: String,
    documentId: String,
    userName: String,
    userLastname: String
  },
  data() {
    return {
      loader: {
        color: "#c3996c",
        backgroundColor: "black",
        isLoading: false,
        fullPage: true
      },
      tab: "",
      getUserURL: "",
      getScheduleURL: "",
      userData: {
        userId: "",
        documentId: "",
        name: "",
        lastname: ""
      },
      scheduleData: null,
      apiCalls: 2,
      apiCallsCount: 0
    };
  },
  mounted() {
    this.userData.userId = this.userId;
    this.userData.documentId = this.documentId;
    this.userData.name = this.userName;
    this.userData.lastname = this.userLastname;

    this.setURLs();
    this.checkSessionStorage();
    this.getData();
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    setURLs() {
      this.getUserURL =
        config.server.domain + config.server.folder + "/php/user/getUser.php";
      this.getScheduleURL =
        config.server.domain +
        config.server.folder +
        "/php/schedule/getSchedule.php";

      console.log("this.getUserURL", this.getUserURL);
      console.log("this.getScheduleURL", this.getScheduleURL);
    },
    checkSessionStorage() {
      if (!this.userData.userId && !this.userData.documentId) {
        const userId = sessionStorage.getItem("userId");
        const documentId = sessionStorage.getItem("documentId");

        if (userId && documentId) {
          this.userData.userId = userId;
          this.userData.documentId = documentId;
        }
      }
    },
    getData() {
      this.loader.isLoading = true;

      let params = new FormData();
      params.append("id", this.userData.userId);
      params.append("documentId", this.userData.documentId);

      axios
        .post(this.getUserURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            this.userData = data;
            console.log("this.userData SUCCESS");
            console.log(this.userData);
          }
          this.apiCallsCount++;
          this.initTab();
        })
        .catch(error => {
          console.log(error);
          this.loader.isLoading = false;
          this.$router.push("404");
        });

      params = new FormData();
      params.append("branchId", this.branchId);
      params.append("userId", this.userId);
      params.append("documentId", this.documentId);
      params.append("startDate", "");
      params.append("endDate", "");

      axios
        .post(this.getScheduleURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            this.getSchedule = data;
            console.log("this.getSchedule SUCCESS");
            console.log(this.getSchedule);
          }
          this.apiCallsCount++;
          this.initTab();
        })
        .catch(error => {
          console.log(error);
          this.loader.isLoading = false;
          this.$router.push("404");
        });
    },
    initTab() {
      console.log(this.apiCalls, this.apiCallsCount);
      if (this.apiCalls === this.apiCallsCount) {
        this.loader.isLoading = false;
        this.changeTab("personalInformation");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#schedule {
  grid-area: content;
  width: 100%;
  height: 100%;
}

#schedule__title {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  color: $text_color;
  padding-bottom: 25px;
}

#schedule__container {
  position: relative;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#schedule__form {
  position: relative;
  margin: 0 auto;
  background-color: $primary_color;
  padding: 20px;
  border-radius: 5px;
  width: 300px;

  > form {
    > label {
      display: block;
    }

    > input {
      @include input();
      width: 100%;
    }

    > button {
      @include button();
      height: 100%;
      width: 100%;
    }
  }
}

#schedule__form > form > * {
  margin-bottom: 7.5px;
}

select {
  @include select();
  width: 100%;
}
</style>
