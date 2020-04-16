<template>
  <v-dialog
    v-model="opened"
    id="project-dialog"
    class="elevation-20"
    :class="color"
    :height="height"
    max-width="800px"
    persistent
  >
    <slot></slot>
    <v-card class="pt-5">
      <v-card-actions v-if="!noAction" ref="card_actions" style="bottom:0px;right:0px;">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!disableCancel"
          :text="!cancelRaised"
          class="ma-0"
          :color="cancelColor ? cancelColor : ''"
          @click="close"
          >{{ cancelText ? cancelText : this.$lang.Get("cancel") }}</v-btn
        >

        <v-btn
          v-if="!disableAccept"
          :text="!acceptRaised"
          class="ma-0"
          :color="acceptColor ? acceptColor : 'primary'"
          @click="accept"
          >{{ acceptText ? acceptText : this.$lang.Get("save") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    width: String,
    height: String,
    cancelText: String,
    acceptText: String,
    disableAccept: Boolean,
    disableCancel: Boolean,
    acceptColor: String,
    cancelColor: String,
    acceptRaised: Boolean,
    cancelRaised: Boolean,
    noAction: Boolean
  },
  data: () => ({
    opened: true,
    // / Height of the tilebar
    top: 30
  }),
  methods: {
    /**
     * When the users clicks on the close button
     */
    close(event) {
      this.rollUp(() => this.$emit("close", event));
    },

    /**
     * When the user clicks on the accept button.
     */
    accept(event) {
      this.rollUp(() => this.$emit("accept", event));
    },

    /**
     * Roll-up the dialog, but does not close it.
     */
    rollUp(callback) {
      const element = document.getElementById("project-dialog");
      const { height } = element.getBoundingClientRect();

      element.classList.remove("dialog--reveal__animation");
      element.classList.add("dialog--hide__animation");

      // Callback 10ms before the end of the animation to avoid flickering
      setTimeout(callback, 190);
    }
  },
  computed: {
    color() {
      return !this.$store.getters.isDarkMode ? "grey lighten-2" : "";
    }
  },
  mounted() {
    const maxHeightRatio = 0.9;
    const actionsOffset = 0;
    const element = document.getElementById("project-dialog");

    const { width } = this;
    const offsetTop = this.top;
    const { height } = element.getBoundingClientRect();
    const minHeight = height;
    const maxHeight = window.innerHeight * maxHeightRatio;
    element.style.position = "fixed";
    element.style.left = `${window.innerWidth / 2 - width / 2}px`;
    element.style.maxHeight = `${maxHeight}px`;

    element.style.width = `${width}px`;
    element.style.zIndex = 1;

    if (!this.noAction) {
      if (height >= maxHeight) this.$refs.card_actions.style.position = "relative";
      else this.$refs.card_actions.style.position = "absolute";

      if (minHeight < window.innerHeight) element.style.minHeight = `${minHeight}px`;

      window.addEventListener("resize", () => {
        const maxHeight = window.innerHeight * maxHeightRatio;
        element.style.left = `${window.innerWidth / 2 - width / 2}px`;
        element.style.maxHeight = `${maxHeight}px`;
      });

      element.classList.remove("dialog--hide__animation");
      element.classList.add("dialog--reveal__animation");

      // Adjust the top if it's mac
      if (this.$store.getters.isMac) this.top = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
#project-dialog {
  position: fixed;
  border-radius: 0;
  overflow-y: auto;
}

#project-dialog button {
  border-radius: 0;
}

.dialog--reveal__animation {
  animation: 200ms ease reveal;
}

.dialog--hide__animation {
  animation: 200ms ease hide;
}

@keyframes reveal {
  0% {
    top: -100%;
  }
  100% {
    top: 0;
  }
}

@keyframes hide {
  0% {
    top: 0;
  }

  100% {
    top: -100%;
  }
}
</style>
