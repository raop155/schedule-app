<template>
  <div id="page-not-found">
    <div id="page-not-found__box">Oops... Page Not Found!</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'page-not-found',
  data() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>

<style lang="scss" scoped>
#page-not-found {
  grid-area: content;
  width: 100%;
  height: 100%;
}

#page-not-found__box {
  width: 300px;

  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: $primary_color;
  padding: 20px;
  border-radius: 5px;

  text-align: center;
}
</style>
