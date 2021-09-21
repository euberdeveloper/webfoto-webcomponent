<template>
  <div class="actions">
    <transition-group name="actions" tag="div" class="container">
      <action-button class="button" icon="share" :text="shareText" :color="shareColor" :active="textCopied" key="share" @click="$emit('share')" v-if="showActions" />
      <action-button class="button" icon="update" text="Time lapse" key="time-lapse" :active="showTimeLapse" @click="$emit('timelapse')" v-if="showActions" />
      <action-button class="button" icon="youtube" text="YouTube" key="you-tube" :active="showYoutube" @click="$emit('youtube')" v-if="showActions && youtubeAvailable" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import ActionButton from "@/components/shared/ActionButton.vue";

@Component({
  components: {
    ActionButton,
  },
})
export default class Actions extends Vue {
  /* PROPS */

  @Prop({ type: Boolean, required: true })
  showActions!: boolean;

  @Prop({ type: Boolean, required: true })
  textCopied!: boolean;

  @Prop({ type: Boolean, required: true })
  showTimeLapse!: boolean;

  @Prop({ type: Boolean, required: true })
  showYoutube!: boolean;

  @Prop({ type: Boolean, required: true })
  youtubeAvailable!: boolean;

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
  margin-right: 15px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

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
  margin-right: -15px !important;
}
</style>
