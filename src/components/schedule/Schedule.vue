<template>
  <div id="schedule">
    <loading
      :active.sync="loader.isLoading"
      :is-full-page="loader.fullPage"
      :color="loader.color"
      :background-color="loader.backgroundColor"
    ></loading>
    <div id="schedule__container">
      <div id="schedule__title">
        <h1>{{ scheduleData.scheduleId ? 'Actualice' : 'Elige' }} las opciones de su agendamiento</h1>
      </div>
      <div id="schedule__form">
        <form @submit.prevent="onAccept">
          <label for="form__branchId">Sucursal</label>
          <select
            name="branch"
            id="form__branchId"
            v-model="branchId"
            ref="branchSelect"
            @change="moduleGroup = ''"
            :class="errors.branchId ? 'form__input--error' : ''"
          >
            <option value disabled>Elige una sucursal</option>
            <option v-for="branch in branches" :value="branch.id" :key="branch.id">{{branch.name}}</option>
          </select>
          <div class="form__error-message">
            <div v-show="errors.branchId">{{ errors.branchId }}</div>
          </div>
          <label for="form__moduleGroup">Motivo</label>
          <select
            name="moduleGroup"
            v-model="moduleGroup"
            id="form__moduleGroup"
            :class="errors.moduleGroup ? 'form__input--error' : ''"
          >
            <option value disabled>Elige un motivo</option>
            <option v-for="module in branchModules" :key="module">{{module}}</option>
          </select>
          <div class="form__error-message">
            <div v-show="errors.moduleGroup">{{ errors.moduleGroup }}</div>
          </div>
          <label for="form__date">Fecha</label>
          <div>
            <v-date-picker
              :mode="datePicker.mode"
              v-model="selectedDate"
              :popover="{ visibility: 'click' }"
              :disabled-dates="{ weekdays: [1, 7] }"
              :min-date="new Date()"
              @input="resetHour()"
              :is-required="true"
              id="form__date"
            >
              <input
                type="text"
                v-model="formatDate"
                :class="errors.date ? 'form__input--error' : ''"
                readonly
              />
            </v-date-picker>
          </div>

          <div class="form__error-message">
            <div v-show="errors.date">{{ errors.date }}</div>
          </div>
          <label for="form__time">Hora</label>
          <select
            name="moduleGroup"
            v-model="selectedTime"
            id="form__time"
            ref="hourSelect"
            :class="errors.time ? 'form__input--error' : ''"
          >
            <option value disabled>Elige una hora</option>
            <option
              v-for="hour in availableHours"
              :value="hour.value"
              :key="hour.value"
            >{{ hour.description }}</option>
          </select>

          <div class="form__error-message">
            <div v-show="errors.time">{{ errors.time }}</div>
          </div>
          <button type="submit">{{ scheduleData.scheduleId ? 'Actualizar' : 'Aceptar' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import config from "@/config/config.js";
import axios from "axios";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "schedule",
  components: {
    Loading
  },
  props: {
    setScheduleData: Function,
    changeTab: Function,
    userData: Object,
    scheduleData: Object
  },
  data() {
    return {
      loader: {
        color: "#c3996c",
        backgroundColor: "black",
        isLoading: false,
        fullPage: true
      },
      addScheduleURL: "",
      updateScheduleURL: "",
      branchId: "",
      branchName: "",
      hourDescription: "",
      moduleGroup: "",
      selectedDate: new Date(),
      selectedTime: "",
      isSetDate: false,
      errors: {
        branchId: "",
        moduleGroup: "",
        date: "",
        time: ""
      },
      datePicker: {
        mode: "single"
      },
      branches: {
        TEST: {
          id: "TEST",
          name: "Test",
          modules: [
            "EJECUTIVO",
            "EJECUTIVO EMPRESAS",
            "CAJA / ATENCION AL CLIENTE"
          ]
        },
        LAB: {
          id: "LAB",
          name: "Laboratorio",
          modules: [
            "EJECUTIVO",
            "EJECUTIVO EMPRESAS",
            "CAJA / ATENCION AL CLIENTE"
          ]
        },
        LABCL: {
          id: "LABCL",
          name: "Laboratorio Chile",
          modules: ["EJECUTIVO", "CAJA / ATENCION AL CLIENTE"]
        },
        LAB2: {
          id: "LAB2",
          name: "Laboratorio 2",
          modules: ["CAJA / ATENCION AL CLIENTE"]
        }
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
    console.log("Schedule Mounted!");
    this.setURLs();

    // Prop scheduleData
    let branchId = this.scheduleData.branchId;
    const moduleGroup = this.scheduleData.moduleGroup;
    const selectedDate = this.scheduleData.date;
    const selectedTime = this.scheduleData.time;

    if (branchId) this.branchId = branchId;
    if (moduleGroup) this.moduleGroup = moduleGroup;
    if (selectedDate) {
      // if (selectedDate !== this.formatDate) this.isSetDate = true;
      this.isSetDate = true;
      this.selectedDate = moment(selectedDate).toDate();
    }
    if (selectedTime) this.selectedTime = selectedTime;

    // Props userData
    branchId = this.userData.branchId;
    // console.log("typof branchId", typeof branchId);
    if (!this.branchId && branchId !== undefined) this.branchId = branchId;

    console.log("this.branchId", this.branchId);
  },
  methods: {
    onAccept: function() {
      if (!this.branchId) {
        this.errors.branchId = "Campo requerido";
        return;
      } else {
        this.errors.branchId = "";
      }

      if (!this.moduleGroup) {
        this.errors.moduleGroup = "Campo requerido";
        return;
      } else {
        this.errors.moduleGroup = "";
      }

      if (!this.selectedDate) {
        this.errors.date = "Campo requerido";
        return;
      } else {
        this.errors.date = "";
      }

      if (!this.selectedTime) {
        this.errors.time = "Campo requerido";
        return;
      } else {
        this.errors.time = "";
      }

      // Get selects texts
      if (this.branchId) {
        const branchSelect = this.$refs.branchSelect;
        const hourSelect = this.$refs.hourSelect;
        this.branchName = branchSelect.options[branchSelect.selectedIndex].text;
        this.hourDescription =
          hourSelect.options[hourSelect.selectedIndex].text;

        this.setScheduleData("this.branchName", this.branchName);
        this.setScheduleData("this.hourDescription", this.hourDescription);
      }

      this.loader.isLoading = true;
      this.scheduleData.scheduleId ? this.updateSchedule() : this.addSchedule();
    },
    setURLs() {
      this.addScheduleURL =
        config.server.domain +
        config.server.folder +
        "/php/schedule/addSchedule.php";

      this.updateScheduleURL =
        config.server.domain +
        config.server.folder +
        "/php/schedule/updateSchedule.php";

      console.log("this.addScheduleURL", this.addScheduleURL);
      console.log("this.updateScheduleURL", this.updateScheduleURL);
    },
    resetHour() {
      console.log("resetHour!", this.isSetDate);
      if (this.isSetDate) {
        this.isSetDate = false;
      } else {
        this.selectedTime = "";
      }
    },
    addSchedule() {
      const params = new FormData();
      params.append("branchId", this.branchId);
      params.append("userId", this.userData.userId);
      params.append("documentId", this.userData.documentId);
      params.append("userName", this.userData.name);
      params.append("userLastname", this.userData.lastname);
      params.append("moduleGroup", this.moduleGroup);
      params.append("startDate", this.formatDate + " " + this.selectedTime);
      params.append(
        "endDate",
        this.formatDate +
          " " +
          moment(this.formatDate + " " + this.selectedTime)
            .add(30, "m")
            .format("HH:mm")
      );

      console.log(...params);

      axios
        .post(this.addScheduleURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            console.log("this.addSchedule SUCCESS");
            console.log(data);

            this.setScheduleData("branchId", this.branchId);
            this.setScheduleData("userId", this.userData.userId);
            this.setScheduleData("documentId", this.userData.documentId);
            this.setScheduleData("userName", this.userData.userName);
            this.setScheduleData("userLastname", this.userData.userLastname);
            this.setScheduleData("moduleGroup", this.moduleGroup);
            this.setScheduleData(
              "startDate",
              this.formatDate + " " + this.selectedTime
            );
            this.setScheduleData(
              "endDate",
              this.formatDate + " " + this.selectedTime
            );
            this.setScheduleData("branchName", this.branchName);
            this.setScheduleData("formatDate", this.formatDate);
            this.setScheduleData("hourDescription", this.hourDescription);

            sessionStorage.setItem("schedule-information", true);
            this.changeTab("finish");
          } else {
            console.warn(data);
            this.$toasted.error("Oops an error occurred!");
          }

          this.loader.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          /* t
          his.loader.isLoading = false;
          this.$router.push("404");
           */
          this.$toasted.error("Oops an error occurred!");
          this.loader.isLoading = false;
        });
    },
    updateSchedule() {
      const params = new FormData();
      params.append("id", this.scheduleData.scheduleId);
      params.append("branchId", this.branchId);
      params.append("userId", this.userData.userId);
      params.append("documentId", this.userData.documentId);
      params.append("userName", this.userData.name);
      params.append("userLastname", this.userData.lastname);
      params.append("moduleGroup", this.moduleGroup);
      params.append("startDate", this.formatDate + " " + this.selectedTime);
      params.append(
        "endDate",
        this.formatDate +
          " " +
          moment(this.formatDate + " " + this.selectedTime)
            .add(30, "m")
            .format("HH:mm")
      );

      console.log(...params);

      axios
        .post(this.updateScheduleURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            console.log("this.updateSchedule SUCCESS");
            console.log(data);

            this.setScheduleData("branchId", this.branchId);
            this.setScheduleData("userId", this.userData.userId);
            this.setScheduleData("documentId", this.userData.documentId);
            this.setScheduleData("userName", this.userData.userName);
            this.setScheduleData("userLastname", this.userData.userLastname);
            this.setScheduleData("moduleGroup", this.moduleGroup);
            this.setScheduleData(
              "startDate",
              this.formatDate + " " + this.selectedTime
            );
            this.setScheduleData(
              "endDate",
              this.formatDate + " " + this.selectedTime
            );
            this.setScheduleData("branchName", this.branchName);
            this.setScheduleData("formatDate", this.formatDate);
            this.setScheduleData("hourDescription", this.hourDescription);

            sessionStorage.setItem("schedule-information", true);
            this.changeTab("finish");
          } else {
            console.warn(data);
            this.$toasted.error("Oops an error occurred!");
          }

          this.loader.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          /* t
          his.loader.isLoading = false;
          this.$router.push("404");
           */
          this.$toasted.error("Oops an error occurred!");
          this.loader.isLoading = false;
        });
    }
  },
  computed: {
    formatDate() {
      return moment(this.selectedDate).format("YYYY-MM-DD");
    },
    availableHours() {
      const isCurrentDay = moment(new Date()).isSame(this.selectedDate, "day");

      if (this.selectedDate !== null) {
        if (isCurrentDay) {
          return this.timeArray.filter(hour => {
            let hourValue = moment(hour.value, "HH:mm");
            let hourNow = moment(new Date(), "HH:mm");
            // console.log("hourValue", hourValue, "hourNow", hourNow);

            if (this.scheduleData.scheduleId) {
              const scheduleDate = this.scheduleData.date;
              const scheduleHour = this.scheduleData.time;

              const isScheduleDay = moment(scheduleDate).isSame(
                this.selectedDate,
                "day"
              );

              if (isScheduleDay) {
                if (scheduleHour && scheduleHour === hour.value) {
                  return hour;
                }
              }
            }

            if (hourValue.isAfter(hourNow)) {
              return hour;
            }
          });
        } else {
          return this.timeArray;
        }
      } else {
        return [];
      }
    },
    branchModules() {
      if (this.branches[this.branchId]) {
        return this.branches[this.branchId].modules;
      } else {
        return [];
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
