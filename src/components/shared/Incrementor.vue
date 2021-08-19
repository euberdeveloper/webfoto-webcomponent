<template>
  <div class="incrementor">
    <button class="button" :disabled="disabledIncrement" @click="$emit('increment')">
      <span class="arrow-up" />
    </button>
    <span class="text">{{ text }}</span>
    <button class="button" :disabled="disabledDecrement" @click="$emit('decrement')">
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

  @Prop({ type: Boolean, default: false })
  disabledIncrement!: boolean;

  @Prop({ type: Boolean, default: false })
  disabledDecrement!: boolean;
}
</script>

<style lang="scss" scoped>
$arrow-size: 5px;
$arrow-size-mobile: 7px;

@mixin arrow($disabled: false) {
  width: 0;
  height: 0;
  border-left: $arrow-size solid transparent;
  border-right: $arrow-size solid transparent;
  position: absolute;
  left: -$arrow-size;

  @media screen and (max-width: 720px) {
    border-left-width: $arrow-size-mobile;
    border-right-width: $arrow-size-mobile;
    left: -$arrow-size-mobile;
  }

  &:hover {
    border-bottom-color: red;
    border-top-color: red;
  }
  &:active {
    border-bottom-color: #ad0000;
    border-top-color: #ad0000;
  }

  @if $disabled {
    border-bottom-color: #9a9ea1;
    border-top-color: #9a9ea1;
  }
}

.incrementor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 2px;

  .button {
    position: relative;
    cursor: pointer;

    padding: 0;
    margin: 0;
    border: 0;

    text-align: center;

    .arrow-up {
      @include arrow();
      border-bottom: $arrow-size solid white;
      bottom: #{$arrow-size - 2px};

      @media screen and (max-width: 720px) {
        border-bottom-width: $arrow-size-mobile;
        bottom: #{$arrow-size-mobile - 1px};
      }
    }
    .arrow-down {
      @include arrow();
      border-top: $arrow-size solid white;
      top: #{$arrow-size - 1px};

      @media screen and (max-width: 720px) {
        border-top-width: $arrow-size-mobile;
        top: #{$arrow-size-mobile - 0px};
      }
    }

    &:disabled {
      .arrow-up,
      .arrow-down {
        @include arrow(true);
      }
    }
  }

  .text {
    text-align: center;
    white-space: pre;
  }
}
</style>
