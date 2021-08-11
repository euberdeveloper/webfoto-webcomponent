<template>
  <button class="action-button" :style="backgroundStyle" @mouseenter="hovered = true" @mouseleave="hovered = false" @click="$emit('click', $event)">
    <img class="icon" :src="iconSrc" />
    <span class="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActionButton extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  icon!: string;

  @Prop({ type: String, required: true })
  text!: string;

  @Prop({ type: String, default: "red" })
  color!: string;

  /* DATA */

  private hovered = false;

  /* GETTERS */

  get iconSrc(): string {
    return require(`@/assets/${this.icon}.svg`);
  }

  get backgroundStyle(): { background: string } {
    return {
      background: this.hovered ? this.color : "#1d1d1c80",
    };
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  position: relative;

  border: 1px solid white;
  padding: 4px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  height: 32px;

  cursor: pointer;

  > .icon {
    height: 100%;
  }

  > .text {
    max-width: 0;
    overflow: hidden;

    text-align: center;
    color: white;
    font-size: 15px;
    font-family: "Exo 2 Medium", sans-serif;

    transition: max-width, padding 300ms;
  }

  &:hover {
    > .text {
      max-width: 100px;
      padding: 4px 8px;
    }
  }

  &:active {
    background-color: #ad0000;
  }
}
</style>
