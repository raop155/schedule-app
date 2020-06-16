<template>
  <div id="app">
    <Header :name="name" :lastname="lastname" />
    <router-view
      :setData="setData"
      :userId="userId"
      :documentId="documentId"
      :userName="name"
      :userLastname="lastname"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header.vue";

export default Vue.extend({
  name: "app",
  components: {
    Header
  },
  mounted() {
    sessionStorage.setItem("companyName", "PX Group");
  },
  data() {
    return {
      userId: "",
      documentId: "",
      name: "",
      lastname: ""
    };
  },
  methods: {
    setData(key, value) {
      this[key] = value;
    },
    setUserData(key, value) {
      this.userData[key] = value;
    },
    setScheduleData(key, value) {
      this.scheduleData[key] = value;
    }
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  // user-select: none;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

html {
  height: 100%;
  // zoom: 100%;
  font-size: 62.5%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  // overflow: hidden;
}

body {
  font-size: $default_size;
  //width: 1080px;
  width: 100%;
  //height: 1920px;
  //height: 100vh;
  height: 100%;
  //font-size: $s_size;
  color: $text_color;
  //background-image: url('./assets/background.png');
  background-color: $base_color;
  background-repeat: no-repeat;
}

#app {
  font-size: $default_size;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  // grid-template-rows: 415px 1fr 150px;
  grid-template-rows: 70px 1fr;
  // align-items: stretch;

  grid-template-areas:
    "header"
    "content";
}

// Vue toasted
.toasted-containerClass-custom {
  width: 65% !important;
}

.toasted-class-custom {
  text-align: center !important;
  font-size: 1.25rem !important;
  justify-content: center !important;
}

// Date picker
.vc-highlight {
  background: $secondary_color !important;
}

.vc-weekday {
  color: $secondary_color !important;
}

// Scrollbar

/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $primary_color;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $secondary_color;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: darken($secondary_color, 10%);
}
</style>
