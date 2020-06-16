<template>
  <div id="finish">
    <div id="finish__container">
      <div id="finish__title">
        <h1>¡Su agendamiento fue exitoso!</h1>
      </div>
      <div id="finish__form">
        <div class="form__row">
          <div>Sucursal</div>
          <div class="output">Laboratorio</div>
        </div>
        <div class="form__row">
          <div>Motivo</div>
          <div class="output">CAJA</div>
        </div>
        <div class="form__row">
          <div>Fecha</div>
          <div class="output">2020-12-01</div>
        </div>
        <div class="form__row">
          <div>Hora</div>
          <div class="output">10:30</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "finish",
  props: {
    test: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#finish {
  grid-area: content;
  width: 100%;
  height: 100%;
}

#finish__title {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  color: $text_color;
  padding-bottom: 25px;
}

#finish__container {
  position: relative;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#finish__form {
  position: relative;
  margin: 0 auto;
  background-color: $primary_color;
  padding: 20px;
  border-radius: 5px;
  width: 300px;

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

#finish__form > * {
  margin-bottom: 7.5px;
}

.form__row {
  display: flex;
  justify-content: space-between;

  > .output {
    font-weight: bold;
  }
  > div {
    flex: 1;
    // text-align: center;
  }
}
</style>
