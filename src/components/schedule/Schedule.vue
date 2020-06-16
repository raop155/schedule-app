<template>
  <div id="schedule">
    <div id="schedule__container">
      <div id="schedule__title">
        <h1>Elige las opciones para su agendamiento</h1>
      </div>
      <div id="schedule__form">
        <form @submit.prevent="onAccept">
          <label for="form__branchId">Sucursal</label>
          <select name="branch" id="form__branchId" v-model="branchId">
            <option value disabled>Elige una sucursal</option>
            <option value="LAB">Laboratorio</option>
          </select>
          <div></div>
          <label for="form__moduleGroup">Motivo</label>
          <select name="moduleGroup" v-model="moduleGroup" id="form__moduleGroup">
            <option value disabled>Elige un motivo</option>
            <option value="EJECUTIVO">EJECUTIVO</option>
            <option value="CAJA">CAJA</option>
          </select>
          <div></div>
          <label for="form__date">Fecha</label>
          <v-date-picker
            :mode="datePicker.mode"
            v-model="selectedDate"
            :popover="{ visibility: 'click' }"
            id="form__date"
          >
            <input type="text" v-model="formatDate" readonly />
          </v-date-picker>
          <div></div>
          <label for="form__time">Hora</label>
          <select name="moduleGroup" v-model="selectedTime" id="form__time">
            <option value disabled>Elige una hora</option>
            <option v-for="hour in availableHours" :key="hour.value">{{hour.description}}</option>
          </select>

          <div></div>
          <button type="submit">Aceptar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import config from "@/config/config.json";
import axios from "axios";

export default {
  name: "schedule",
  props: {
    userData: Object,
    changeTab: Function,
    scheduleData: null
  },
  data() {
    return {
      addScheduleURL: "",
      branchId: "",
      moduleGroup: "",
      selectedDate: new Date(),
      selectedTime: "",
      datePicker: {
        mode: "single",
        color: "red"
      },
      timeArray: [
        {
          description: "08:00 - 08:30",
          value: "08:00"
        },
        {
          description: "08:30 - 09:00",
          value: "08:30"
        },
        {
          description: "09:00 - 09:30",
          value: "09:00"
        },
        {
          description: "09:30 - 10:00",
          value: "09:30"
        },
        {
          description: "10:00 - 10:30",
          value: "10:00"
        },
        {
          description: "10:30 - 11:00",
          value: "10:30"
        },
        {
          description: "11:00 - 11:30",
          value: "11:00"
        },
        {
          description: "11:30 - 12:00",
          value: "11:30"
        },
        {
          description: "12:00 - 12:30",
          value: "12:00"
        },
        {
          description: "12:30 - 13:00",
          value: "12:30"
        },
        {
          description: "13:00 - 13:30",
          value: "13:00"
        },
        {
          description: "13:30 - 14:00",
          value: "13:30"
        },
        {
          description: "14:00 - 14:30",
          value: "14:00"
        },
        {
          description: "14:30 - 15:00",
          value: "14:30"
        },
        {
          description: "15:00 - 15:30",
          value: "15:00"
        },
        {
          description: "15:30 - 16:00",
          value: "15:30"
        },
        {
          description: "16:00 - 16:30",
          value: "16:00"
        },
        {
          description: "16:30 - 17:00",
          value: "16:30"
        },
        {
          description: "17:00 - 17:30",
          value: "17:00"
        },
        {
          description: "17:30 - 18:00",
          value: "17:30"
        }
      ]
    };
  },
  mounted() {
    this.setURLs();

    const branchId = sessionStorage.getItem("branchId");
    console.log("branchId", branchId);
    if (branchId) {
      console.log("change branchId");
      this.branchId = branchId;
    }
    console.log("this.branchId", this.branchId);
  },
  methods: {
    onAccept: function() {
      if (
        this.branchId &&
        this.moduleGroup &&
        this.selectedDate &&
        this.selectedTime
      ) {
        sessionStorage.setItem("schedule-information", true);

        this.addSchedule();
        //this.changeTab("finish");
        // this.$router.push('finish');
      }
    },
    setURLs() {
      this.addScheduleURL =
        config.server.domain +
        config.server.folder +
        "/php/schedule/addSchedule.php";

      console.log("this.addScheduleURL", this.addScheduleURL);
    },
    addSchedule() {
      const params = new FormData();
      params.append("branchId", this.branchId);
      params.append("userId", sessionStorage.getItem("userId"));
      params.append("documentId", sessionStorage.getItem("documentId"));
      params.append("userName", this.userData.name);
      params.append("userLastname", this.userData.lastname);
      params.append("moduleGroup", this.moduleGroup);
      params.append("startDate", this.formatDate + " " + this.selectedTime);
      params.append("endDate", this.formatDate + " " + this.selectedTime);

      console.log(params);

      axios
        .post(this.addScheduleURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            console.log("this.addSchedule SUCCESS");
            console.log(data);
          }
          /* this.apiCallsCount++;
          this.initTab(); */
        })
        .catch(error => {
          console.log(error);
          /* this.loader.isLoading = false;
          this.$router.push("404"); */
        });
    }
  },
  computed: {
    formatDate() {
      return moment(this.selectedDate).format("YYYY-MM-DD");
    },
    availableHours() {
      const isCurrentDay = moment(new Date()).isSame(this.selectedDate, "day");
      // console.log("availableHours");

      if (isCurrentDay) {
        return this.timeArray.filter(hour => {
          let hourValue = moment(hour.value, "HH:mm");
          let hourNow = moment(new Date(), "HH:mm");

          // console.log("hourValue", hourValue, "hourNow", hourNow);

          if (hourValue.isAfter(hourNow)) {
            return hour;
          }
        });
      } else {
        return this.timeArray;
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

#form__date {
  > input {
    @include input();
    width: 100%;
    cursor: pointer;
  }
}

select {
  @include select();
  width: 100%;
}
</style>
