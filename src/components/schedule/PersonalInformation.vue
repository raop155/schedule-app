<template>
  <div id="personal-info">
    <div id="personal-info__container">
      <div id="personal-info__title">
        <h1 v-if="userData">Verifique sus datos personales</h1>
        <h1 v-else>Ingrese sus datos personales</h1>
      </div>
      <div id="personal-info__form">
        <form @submit.prevent="onAccept">
          <label for="form__name">Nombres</label>
          <input type="text" placeholder v-model.trim="name" id="form__name" />
          <div></div>
          <label for="form__lastname">Apellidos</label>
          <input
            type="text"
            placeholder
            v-model.trim="lastname"
            id="form__lastname"
          />
          <div></div>
          <label for="form__phone">Número celular</label>
          <input
            type="text"
            placeholder
            v-model.trim="phone"
            id="form__phone"
          />
          <div></div>
          <label for="form__email">Email</label>
          <input
            type="text"
            placeholder
            v-model.trim="email"
            id="form__email"
          />
          <div></div>
          <button type="submit">Aceptar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personalInformation',
  props: {
    changeTab: Function,
    setData: Function,
    userData: null,
  },
  data() {
    return {
      name: '',
      lastname: '',
      phone: '',
      email: '',
    };
  },
  methods: {
    onAccept: function() {
      if (this.name && this.lastname && this.phone && this.email) {
        sessionStorage.setItem('personal-information', true);

        this.setData('name', this.name);
        this.setData('lastname', this.lastname);

        this.changeTab('schedule');
        // this.$router.push('schedule');
      }
    },
  },
  watch: {
    userData(n, o) {
      console.log(n, o);
      if (n) {
        this.name = this.userData.name;
        this.lastname = this.userData.lastname;
        this.phone = this.userData.phone;
        this.email = this.userData.email;
      }
    },
  },
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
