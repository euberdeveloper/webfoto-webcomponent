<template>
  <div class="date-controller">
    <div class="controller-container">
      <div class="triangle" />
      <div class="controller">
        <span class="part">{{day}}</span>
        <span class="part">{{month}}</span>
        <span class="part">{{year}}</span>
        <span class="part">{{hours}}</span>
        <span class="part">{{minutes}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DateController extends Vue {
  /* PROPS */

  @Prop({ type: Date, required: true })
  value!: Date;

  @Prop({ type: Array, required: true })
  dates!: Date[];

  /* GETTERS AND SETTERS */

  get internalValue(): Date {
    return this.value;
  }
  set internalValue(value: Date) {
    this.$emit("update:value", value);
  }

  get day(): string {
    const format = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: '2-digit' });
    const parts = format.formatToParts(this.internalValue);
    const day = parts.find(el => el.type === 'day')?.value ?? '';
    const weekday = parts.find(el => el.type === 'weekday')?.value ?? '';
    return `${weekday.slice(0, 3)}, ${day}`;
  }
  get month(): string {
    const format = new Intl.DateTimeFormat(undefined, { month: '2-digit' });
    const parts = format.formatToParts(this.internalValue);
    const month = parts.find(el => el.type === 'month')?.value ?? '';
    return month.toString();
  }
  get year(): string {
    const format = new Intl.DateTimeFormat(undefined, { year: 'numeric' });
    const parts = format.formatToParts(this.internalValue);
    const year = parts.find(el => el.type === 'year')?.value ?? '';
    return year.toString();
  }
  get hours(): string {
    const format = new Intl.DateTimeFormat(undefined, { hour: '2-digit' });
    const parts = format.formatToParts(this.internalValue);
    const hour = parts.find(el => el.type === 'hour')?.value ?? '';
    return hour.toString();
  }
  get minutes(): string {
    const format = new Intl.DateTimeFormat(undefined, { minute: '2-digit' });
    const parts = format.formatToParts(this.internalValue);
    const minute = parts.find(el => el.type === 'minute')?.value ?? '';
    return minute.toString();
  }
}
</script>

<style lang="scss" scoped>
.date-controller {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  .controller-container {
    position: relative;
    background: #1d1d1c80;
    width: 266px;
    height: 40px;

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

      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;

      font-family: "Exo 2 Medium", sans-serif;
      font-size: 14px;
      color: white;

      .part {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0 2px;
      }
    }
  }
}
</style>
