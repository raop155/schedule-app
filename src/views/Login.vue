<template>
  <div id="login">
    <div id="login__container">
      <div id="login__title">
        <h1>Ingrese su número de documento</h1>
      </div>
      <div id="login__form">
        <form @submit.prevent="onLogin">
          <label for="form__documentId">Tipo de documento</label>
          <select name="document" id="form__documentId" v-model="documentId">
            <option value>Elige un tipo de documento</option>
            <option value="RUT">RUT</option>
            <!-- <option value="CE">Carné de extranjería</option> -->
            <!--  <option value="OTHER">Otros</option> -->
            <!-- <option value="DNI">DNI</option> -->
          </select>
          <div></div>
          <label for="form__userId">Número de documento</label>
          <input type="text" placeholder v-model.trim="userId" id="form__userId" />
          <div></div>
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
    branchId: String,
    setData: Function
  },
  data() {
    return {
      documentId: "RUT",
      userId: ""
    };
  },
  mounted() {
    sessionStorage.clear();
    console.log("branchId", this.branchId);
  },
  methods: {
    onLogin: function() {
      if (this.documentId && this.userId) {
        sessionStorage.setItem("logged-in", true);
        if (this.branchId) sessionStorage.setItem("branchId", this.branchId);
        sessionStorage.setItem("documentId", this.documentId);
        sessionStorage.setItem("userId", this.userId);

        this.setData("documentId", this.documentId);
        this.setData("userId", this.userId);

        this.$router.push({ path: "/schedule" });
      }
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
