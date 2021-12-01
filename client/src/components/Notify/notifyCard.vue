<template>
  <transition
    @after-enter="afterTransitionEnter"
    @after-leave="afterTransitionLeave"
    name="notify"
  >
    <div v-if="visible" class="card" :style="changeableStyle">
      <close-icon @click="hide" class="closeIcon"></close-icon>
      <span
        v-if="header !== ''"
        style="display: block; font-size: 22px; padding-bottom: 5px"
      >
        {{ header }}
      </span>
      <span>{{ text }}</span>
    </div>
  </transition>
</template>

<script>
import CloseIcon from "vue-material-design-icons/Close.vue";
export default {
  name: "NotifyCard",
  data() {
    return {
      visible: false,
    };
  },
  components: {
    CloseIcon,
  },
  props: {
    header: { type: String, default: "" },
    text: { type: String, default: "" },
    backgroundColor: { type: String, default: "green" },
    textColor: { type: String, default: "white" },
  },
  beforeMount() {
    let container = document.createElement("div");
    document.body.appendChild(container);
    container.appendChild(this.$el);
  },
  beforeDestroy() {
    this.$el.remove();
  },
  mounted() {
    this.visible = true;
  },
  computed: {
    changeableStyle() {
      var obj = {
        background: this.$props.backgroundColor,
        color: this.$props.textColor,
      };
      return obj;
    },
  },
  methods: {
    afterTransitionEnter() {
      setTimeout(() => {
        this.hide();
      }, 2000);
    },
    afterTransitionLeave() {
      this.$emit("hidden");
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style>
.card {
  position: relative;
  left: 40%;
  width: 400px;
  z-index: 100;
  margin-top: 15px;
  padding: 12px 30px;
  background: #ccc;
  border-radius: 5px;
}
.closeIcon {
  float: right;
  cursor: pointer;
}
.notify-leave-to {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 1s, opacity 1s linear, all 1s ease;
}
.notify-enter-active {
  transition: opacity 0.5s;
}
.notify-enter {
  opacity: 0;
}
</style>