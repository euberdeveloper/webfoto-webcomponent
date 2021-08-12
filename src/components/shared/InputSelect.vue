<template>
  <select class="input-select" :placeholder="placeholder" v-model="internalValue">
    <option v-for="option of options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SelectOption } from "@/types";

@Component({
  model: {
    prop: "value",
    event: "change",
  },
})
export default class InputSelect extends Vue {
  /* PROPS */

  @Prop({ type: [String, Number], required: true })
  value!: string | number;

  @Prop({ type: String, required: false })
  placeholder?: string;

  @Prop({ type: Array, default: () => [] })
  options!: SelectOption[];

  /* GETTERS AND SETTERS */

  get internalValue(): string | number {
    return this.value;
  }
  set internalValue(value: string | number) {
    this.$emit("change", value);
  }
}
</script>

<style lang="scss" scoped>
.input-select {
  display: inline-block;

  border: 1px solid white;
  background-color: #1d1d1c80;
  color: white;

  padding: 3px 6px;

  &::placeholder {
    color: #9a9ea1;
  }

  &:focus {
    outline: 1px solid #9a9ea1;
  }
}
</style>
