<template>
  <div class="actions">
    <transition-group name="actions" tag="div">
      <action-button class="button" icon="share" :text="shareText" :color="shareColor" :active="textCopied" key="share" @click="$emit('share')" v-if="showActions" />
      <action-button class="button" icon="update" text="Time lapse" key="time-lapse" :active="showTimeLapse" @click="$emit('timelapse')" v-if="showActions" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ActionButton from "./ActionButton.vue";

@Component({
  components: {
    ActionButton,
  },
})
export default class Actions extends Vue {
  /* PROPS */

  @Prop({ type: Boolean, default: true })
  showActions!: boolean;

  @Prop({ type: Boolean, default: true })
  textCopied!: boolean;

  @Prop({ type: Boolean, default: false })
  showTimeLapse!: boolean;

  /* GETTERS */

  get shareColor(): string | undefined {
    return this.textCopied ? "green" : undefined;
  }
  get shareText(): string {
    return this.textCopied ? "Copiato!" : "Condividi";
  }
}
</script>

<style lang="scss" scoped>
.actions {
  margin-left: 15px;

  .button {
    margin: 5px 0;
  }
}

.actions-enter-active,
.actions-leave-active {
  transition: all 500ms;
}
.actions-enter,
.actions-leave-to {
  opacity: 0;
  margin-left: -15px !important;
}
</style>
