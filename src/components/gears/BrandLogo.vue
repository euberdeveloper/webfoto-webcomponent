<template>
  <div class="brand-logo" :style="divStyle">
    <a class="cover" :href="href" v-if="href">
      <img class="image cover" :src="src" alt="logo" />
    </a>
    <img class="image cover" :src="src" alt="logo" v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BrandLogo extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  src!: string;

  @Prop({ type: String, required: true })
  href!: string;

  @Prop({ type: String, default: "150px" })
  width!: string;

  /* GETTERS */

  get divStyle(): { width: string } {
    return { width: this.width };
  }
}
</script>

<style lang="scss" scoped>
.brand-logo {
  display: inline-block;
  position: relative;

  .cover {
    width: 100%;
  }

  .image {
    opacity: 0.6;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>