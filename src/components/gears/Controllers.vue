<template>
  <div class="controllers">
    <div class="controller-container">
      <div class="triangle" />
      <div class="controller">
        <incrementor class="incrementor" :text="day" @increment="$emit('increment', 'day')" @decrement="$emit('decrement', 'day')" />
        <span class="text">/</span>
        <incrementor class="incrementor" :text="month" @increment="$emit('increment', 'month')" @decrement="$emit('decrement', 'month')" />
        <span class="text">/</span>
        <incrementor class="incrementor" :text="year" @increment="$emit('increment', 'year')" @decrement="$emit('decrement', 'year')" />
        <span class="divider" />
        <incrementor class="incrementor" :text="hours" @increment="$emit('increment', 'hours')" @decrement="$emit('decrement', 'hours')" />
        <span class="text">:</span>
        <incrementor class="incrementor" :text="minutes" @increment="$emit('increment', 'minutes')" @decrement="$emit('decrement', 'minutes')" />
        <span class="divider" />
        <button class="clickable" :disabled="isLastDate" @click="$emit('current')">Current</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Incrementor from "./Incrementor.vue";

@Component({
  components: {
    Incrementor,
  },
})
export default class Controllers extends Vue {
  /* PROPS */

  @Prop({ type: Date, required: true })
  value!: Date;

  @Prop({ type: Boolean, required: true })
  isLastDate!: boolean;

  /* GETTERS AND SETTERS */

  get internalValue(): Date {
    return this.value;
  }
  set internalValue(value: Date) {
    this.$emit("update:value", value);
  }

  get day(): string {
    const format = new Intl.DateTimeFormat(undefined, { weekday: "long", day: "2-digit" });
    const parts = format.formatToParts(this.internalValue);
    const day = parts.find((el) => el.type === "day")?.value ?? "";
    const weekday = parts.find((el) => el.type === "weekday")?.value ?? "";
    return `${weekday.slice(0, 3)} ${day}`;
  }
  get month(): string {
    const format = new Intl.DateTimeFormat(undefined, { month: "2-digit" });
    const parts = format.formatToParts(this.internalValue);
    const month = parts.find((el) => el.type === "month")?.value ?? "";
    return this.twoDigits(month);
  }
  get year(): string {
    const format = new Intl.DateTimeFormat(undefined, { year: "numeric" });
    const parts = format.formatToParts(this.internalValue);
    const year = parts.find((el) => el.type === "year")?.value ?? "";
    return this.twoDigits(year);
  }
  get hours(): string {
    const format = new Intl.DateTimeFormat(undefined, { hour: "2-digit" });
    const parts = format.formatToParts(this.internalValue);
    const hour = parts.find((el) => el.type === "hour")?.value ?? "";
    return this.twoDigits(hour);
  }
  get minutes(): string {
    const format = new Intl.DateTimeFormat(undefined, { minute: '2-digit' });
    const parts = format.formatToParts(this.internalValue);
    const minute = parts.find((el) => el.type === "minute")?.value ?? "";
    return this.twoDigits(minute);
  }

  /* METHODS */

  private twoDigits(value: string): string {
    return value.length > 1 ? value : `0${value}`;
  }
}
</script>

<style lang="scss" scoped>
.controllers {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  .controller-container {
    position: relative;
    background: #1d1d1c80;
    height: 50px;

    .triangle {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      display: inline;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 15px solid rgba(29, 29, 28, 0.5);
      top: -15px;
      width: 0;
    }

    .controller {
      padding: 0 12px;

      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      font-family: "Exo 2 Medium", sans-serif;
      font-size: 14px;
      color: white;

      .incrementor {
        margin: 0 2px;
      }

      .divider {
        height: 80%;
        width: 1px;
        background-color: #9a9ea1;
        margin: 0 10px;
      }

      .text {
        margin: 0 1px;
        color: #c4c5c5;
      }

      .clickable {
        margin: 0 2px;
        padding: 0;
        border: 0;

        background-color: transparent;
        color: white;
        cursor: pointer;

        &:hover {
          color: red;
        }
        &:active {
          color: #ad0000;
        }
        &:disabled {
          color: #9a9ea1;
        }
      }
    }
  }
}
</style>
