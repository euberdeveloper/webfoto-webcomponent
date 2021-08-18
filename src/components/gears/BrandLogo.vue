<template>
  <match-media query="(max-width: 720px)" v-slot="{ matches }">
    <div class="brand-logo" :style="getDivStyle(matches)">
      <a class="cover" :href="href" v-if="href">
        <img class="image cover" :src="src" alt="logo" />
      </a>
      <img class="image cover" :src="src" alt="logo" v-else />
    </div>
  </match-media>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { MatchMedia } from "vue-component-media-queries";

@Component({
  components: {
    MatchMedia,
  },
})
export default class BrandLogo extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  src!: string;

  @Prop({ type: String, required: true })
  href!: string;

  @Prop({ type: String, required: true })
  width!: string;

  @Prop({ type: String, required: true })
  widthMobile!: string;

  /* METHODS */

  public getDivStyle(mobile: boolean): { width: string } {
    return { width: mobile ? this.widthMobile : this.width };
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

@media only screen and (max-width: 720px) {
  body {
    background-color: lightblue;
  }
}
</style>