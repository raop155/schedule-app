<template>
  <div id="personal-info">
    <loading
      :active.sync="loader.isLoading"
      :is-full-page="loader.fullPage"
      :color="loader.color"
      :background-color="loader.backgroundColor"
    ></loading>
    <div id="personal-info__container">
      <div id="personal-info__title">
        <h1>{{ userExist ? 'Verifique' : 'Ingrese' }} sus datos personales</h1>
      </div>
      <div id="personal-info__form">
        <form @submit.prevent="onAccept">
          <label for="form__name">Nombres</label>
          <input
            type="text"
            placeholder
            v-model.trim="name"
            @input="onlyLetters"
            id="form__name"
            :class="errors.name ? 'form__input--error' : ''"
          />
          <div class="form__error-message">
            <div v-show="errors.name">{{ errors.name }}</div>
          </div>
          <label for="form__lastname">Apellidos</label>
          <input
            type="text"
            placeholder
            v-model.trim="lastname"
            @input="onlyLetters"
            id="form__lastname"
            :class="errors.lastname ? 'form__input--error' : ''"
          />
          <div class="form__error-message">
            <div v-show="errors.lastname">{{ errors.lastname }}</div>
          </div>
          <label for="form__phone">Número celular</label>
          <input
            type="text"
            placeholder
            v-model.trim="phone"
            @input="onlyNumbers"
            id="form__phone"
            :class="errors.phone ? 'form__input--error' : ''"
          />
          <div class="form__error-message">
            <div v-show="errors.phone">{{ errors.phone }}</div>
          </div>
          <label for="form__email">Email</label>
          <input
            type="text"
            placeholder
            v-model.trim="email"
            id="form__email"
            :class="errors.email ? 'form__input--error' : ''"
          />
          <div class="form__error-message">
            <div v-show="errors.email">{{ errors.email }}</div>
          </div>
          <button type="submit">{{ userExist ? 'Actualizar' : 'Aceptar' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config/config.js";
import axios from "axios";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "personalInformation",
  props: {
    changeTab: Function,
    setUserData: Function,
    userData: Object
  },
  components: {
    Loading
  },
  data() {
    return {
      loader: {
        color: "#c3996c",
        backgroundColor: "black",
        isLoading: false,
        fullPage: true
      },
      addUserURL: "",
      updateUserURL: "",
      name: "",
      lastname: "",
      phone: "",
      email: "",
      errors: {
        name: "",
        lastname: "",
        phone: "",
        email: ""
      },
      validators: {
        email: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    };
  },
  mounted() {
    console.log("PersonalInformation Mounted!");
    this.setURLs();

    this.name = this.userData.name;
    this.lastname = this.userData.lastname;
    this.phone = this.userData.phone;
    this.email = this.userData.email;
  },
  methods: {
    setURLs() {
      this.addUserURL =
        config.server.domain + config.server.folder + "/php/user/addUser.php";

      this.updateUserURL =
        config.server.domain +
        config.server.folder +
        "/php/user/updateUser.php";

      console.log("this.addUserURL", this.addUserURL);
      console.log("this.updateUserURL", this.updateUserURL);
    },
    onlyLetters() {
      if (this.name) {
        this.name = this.name.replace(/[^a-zA-Z\s]*$/, "");
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      }
      if (this.lastname) {
        this.lastname = this.lastname.replace(/[^a-zA-Z\s]*$/, "");
        this.lastname =
          this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1);
      }
    },
    onlyNumbers() {
      this.phone = this.phone.replace(/[^0-9]/g, "");
    },
    onAccept: function() {
      if (!this.name) {
        this.errors.name = "Campo requerido";
        return;
      } else {
        this.errors.name = "";
      }

      if (!this.lastname) {
        this.errors.lastname = "Campo requerido";
        return;
      } else {
        this.errors.lastname = "";
      }

      if (!this.phone) {
        this.errors.phone = "Campo requerido";
        return;
      } else {
        this.errors.phone = "";
      }

      console.log("this.email", this.email);
      if (!this.email) {
        this.errors.email = "Campo requerido";
        return;
      } else {
        // console.log(this.validators.email.test(this.email));
        if (!this.validators.email.test(this.email)) {
          this.errors.email = "Email no válido";
          return;
        } else {
          this.errors.email = "";
        }
      }

      this.loader.isLoading = true;
      this.userExist ? this.updateUser() : this.addUser();
    },
    addUser() {
      const params = new FormData();
      params.append("id", this.userData.userId);
      params.append("documentId", this.userData.documentId);
      params.append("name", this.name);
      params.append("lastname", this.lastname);
      params.append("phone", this.phone);
      params.append("email", this.email);
      // console.log(params);

      axios
        .post(this.addUserURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            console.log("this.addSchedule SUCCESS");
            console.log(data);

            this.setUserData("name", this.name);
            this.setUserData("lastname", this.lastname);
            this.setUserData("phone", this.phone);
            this.setUserData("email", this.email);

            sessionStorage.setItem("personal-information", true);
            this.changeTab("schedule");
          } else {
            console.warn(data);
            this.$toasted.error("Oops an error occurred!");
          }
          this.loader.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Oops an error occurred!");
          this.loader.isLoading = false;
        });
    },
    updateUser() {
      const params = new FormData();
      params.append("id", this.userData.userId);
      params.append("documentId", this.userData.documentId);
      params.append("name", this.name);
      params.append("lastname", this.lastname);
      params.append("phone", this.phone);
      params.append("email", this.email);
      // console.log(params);

      axios
        .post(this.updateUserURL, params)
        .then(response => {
          const status = response.data.status;
          const data = response.data.data;
          console.log(response);
          if (status.toUpperCase() === "SUCCESS") {
            console.log("this.addSchedule SUCCESS");
            console.log(data);

            this.setUserData("name", this.name);
            this.setUserData("lastname", this.lastname);
            this.setUserData("phone", this.phone);
            this.setUserData("email", this.email);

            sessionStorage.setItem("personal-information", true);
            this.changeTab("schedule");
          } else {
            console.warn(data);
            this.$toasted.error("Oops an error occurred!");
          }
          this.loader.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Oops an error occurred!");
          this.loader.isLoading = false;
        });
    }
  },
  computed: {
    userExist() {
      if (this.userData.name && this.userData.lastname) return true;
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
#personal-info {
  grid-area: content;
  width: 100%;
  height: 100%;
}

#personal-info__title {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  color: $text_color;
  padding-bottom: 25px;
}

#personal-info__container {
  position: relative;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#personal-info__form {
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

#personal-info__form > form > * {
  margin-bottom: 7.5px;
}

select {
  @include select();
  width: 100%;
}
</style>
