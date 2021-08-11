<template>
  <div class="incrementor">
    <button class="button" @click="$emit('increment')">
      <span class="arrow-up" />
    </button>
    <span class="text">{{ text }}</span>
    <button class="button" @click="$emit('decrement')">
      <span class="arrow-down" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DateController extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  text!: string;
}
</script>

<style lang="scss" scoped>
@mixin arrow() {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
  left: -5px;

  &:hover {
    border-bottom-color: red;
    border-top-color: red;
  }
  &:active {
    border-bottom-color: #ad0000;
    border-top-color: #ad0000;
  }
}

.incrementor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 2px;

  .arrow-up {
    @include arrow();
    border-bottom: 5px solid white;
    bottom: 3px;
  }
  .arrow-down {
    @include arrow();
    border-top: 5px solid white;
    top: 3.5px;
  }

  .button {
    position: relative;
    cursor: pointer;

    padding: 0;
    margin: 0;
    border: 0;

    text-align: center;
  }

  .text {
    text-align: center;
    white-space: pre;
  }
}
</style>
