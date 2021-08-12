<template>
  <button class="controller-button" :disabled="disabled" @click="$emit('click', $event)">
    <img class="icon" :src="iconSrc" v-if="iconSrc" />
    <span class="text" v-if="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ControllerButton extends Vue {
  /* PROPS */

  @Prop({ type: String, required: false })
  icon?: string;

  @Prop({ type: String, required: false })
  text?: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  /* GETTERS */

  get iconSrc(): string | null {
    return this.icon ? require(`@/assets/${this.icon}.svg`) : null;
  }
}
</script>

<style lang="scss" scoped>
.controller-button {
  margin: 0 2px;
  padding: 0;
  border: 0;

  background-color: transparent;
  color: white;
  cursor: pointer;

  > .icon::v-deep * {
    fill: white;
  }

  > .text {
    text-align: center;
    color: white;
    font-size: 14px;
    font-family: "Exo 2 Medium", sans-serif;
  }

  &:hover {
    .text {
      color: red;
    }
    .icon {
      opacity: 0.7;
    }
  }
  &:active {
    .text {
      color: #ad0000;
    }
    .icon {
      opacity: 0.7;
    }
  }
  &:disabled {
    .text {
      color: #9a9ea1;
    }
    .icon {
      opacity: 0.7;
    }
  }
}
</style>
