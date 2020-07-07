<template>
  <div id="header">
    <div id="header__content">
      <div id="header__leftside">
        <img src="@/assets/logo.png" />
      </div>

      <div id="header__rightside" v-if="name">
        <div id="header__icon">
          <img height="20px" :src="require('@/assets/dashboard/ico_user.png')" />
        </div>
        <div id="header__user">{{ name }} {{ lastname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-view",
  props: {
    name: String,
    lastname: String
  },
  methods: {
    onLogout: function() {
      console.log("Logout success!");
    }
  },
  computed: {
    companyName() {
      return sessionStorage.getItem("companyName");
    }
  }
};
</script>

<style lang="scss" scoped>
#header {
  grid-area: header;
  width: 100%;
  height: 100%;
  // border: 1px solid;
  background-color: lighten($base_color, 5%);
}

#header__content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    flex: 1;
    // text-align: center;
  }
}

#header__leftside {
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding-left: 15px;

  img {
    height: 85%;
    //display: block;
    //margin: auto;
  }
}

#header__rightside {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: $default_size;
  padding-right: 15px;
  > * {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}

#header__title {
  display: flex;
  align-items: center;

  > #title__company {
    color: white;
    font-size: $m_size;
  }
}

#header__user {
  display: flex;
  font-size: $s_size;
  text-align: end;
  justify-content: flex-end;
  align-items: center;

  > button {
    @include button();
    font-size: $xs_size;
    height: 100%;
    padding: 5px 5px;
  }
}

#header__button {
  > button {
    @include button();
    font-size: $xs_size;
    height: 100%;
    padding: 5px 5px;
  }
}
</style>
