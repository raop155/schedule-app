<template>
  <div id="login">
    <div id="login__container">
      <div id="login__title">
        <h1>Ingrese su número de documento</h1>
      </div>
      <div id="login__form">
        <form @submit.prevent="onLogin">
          <label for="form__documentId">Tipo de documento</label>
          <select
            name="document"
            id="form__documentId"
            v-model="documentId"
            :class="errors.documentId ? 'form__input--error' : ''"
          >
            <option value disabled>Elige un tipo de documento</option>
            <option value="RUT">RUT</option>
            <!-- <option value="CE">Carné de extranjería</option> -->
            <!--  <option value="OTHER">Otros</option> -->
            <!-- <option value="DNI">DNI</option> -->
          </select>
          <div class="form__error-message">
            <div v-show="errors.documentId">{{errors.documentId}}</div>
          </div>
          <label for="form__userId">Número de documento</label>
          <input
            type="text"
            placeholder
            v-model.trim="userId"
            @input="onlyRUTLetters"
            id="form__userId"
            :class="errors.userId ? 'form__input--error' : ''"
          />
          <div class="form__error-message">
            <div v-show="errors.userId">{{errors.userId}}</div>
          </div>
          <button type="submit">Aceptar</button>
        </form>
      </div>
      <div id="login__legal">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {
    branchId: {
      type: String,
      default: ""
    },
    setUserData: Function
  },
  data() {
    return {
      documentId: "RUT",
      userId: "",
      errors: {
        documentId: "",
        userId: ""
      },
      validators: {
        rut: /^[0-9]+[K]?$/i
      }
    };
  },
  mounted() {
    sessionStorage.clear();
    console.log("branchId", this.branchId);

    this.setUserData("name", "");
    this.setUserData("lastname", "");
  },
  methods: {
    onlyRUTLetters() {
      if (this.userId)
        this.userId = this.userId.toUpperCase().replace(/^[a-jl-z]+[k]?/gi, "");
    },
    onLogin: function() {
      if (!this.documentId) {
        this.errors.documentId = "Campo requerido";
        return;
      } else {
        this.errors.documentId = "";
      }

      if (!this.userId) {
        this.errors.userId = "Campo requerido";
        return;
      } else {
        console.log(this.validators.rut.test(this.userId));
        if (!this.validators.rut.test(this.userId)) {
          this.errors.userId = "RUT no válido";
          return;
        } else {
          this.errors.userId = "";
        }
      }

      // Set data to storages and variables
      sessionStorage.setItem("logged-in", true);
      sessionStorage.setItem("branchId", this.branchId);
      sessionStorage.setItem("documentId", this.documentId);
      sessionStorage.setItem("userId", this.userId);

      this.setUserData("branchId", this.branchId);
      this.setUserData("documentId", this.documentId);
      this.setUserData("userId", this.userId);

      // Change scene
      this.$router.push({ path: "/schedule" });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  grid-area: content;
  width: 100%;
  height: 100%;
}

#login__title {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  color: $text_color;
  padding-bottom: 25px;
}

#login__container {
  position: relative;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#login__form {
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

#login__form > form > * {
  margin-bottom: 7.5px;
}

#login__legal {
  margin: 0 auto;
  width: 90%;
  text-align: center;
  padding-top: 25px;
  font-size: $xs_size;
}

select {
  @include select();
  width: 100%;
}
</style>
