<template>
  <input class="input-text" :type="type" :placeholder="placeholder" v-model="internalValue" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  model: {
    prop: 'value',
    event: 'input'
  }
})
export default class InputText extends Vue {
  /* PROPS */

  @Prop({ type: [String, Number], required: true })
  value!: string | number;

  @Prop({ type: String, required: false })
  placeholder?: string;

  @Prop({ type: String, default: 'text' })
  type!: string;

  /* GETTERS AND SETTERS */

  get internalValue(): string | number {
    return this.value;
  }
  set internalValue(value: string | number) {
    this.$emit('input', value);
  }

 
}
</script>

<style lang="scss" scoped>
.input-text {
  display: inline-block;

  border: 1px solid white;
  background-color: #1d1d1c80;
  color: white;

  padding: 4px 6px;

  &::placeholder {
    color: #9a9ea1;
  }

  &:focus {
    outline: 1px solid #9a9ea1;
  }
}
</style>
