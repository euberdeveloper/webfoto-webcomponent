<template>
  <div>
    <bounce-loader loading :color="spinnerColor" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

import { ImageInfo } from "@/types";
import { getImages } from "@/utils/api";

@Component({
  components: { BounceLoader },
})
export default class WebFoto extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  apiUrl!: string;

  @Prop({ type: String, required: false })
  spinnerColor?: string;

  /* DATA */

  private images: ImageInfo[] = [];

  /* LIFE CYCLE */

  async mounted(): Promise<void> {
    this.images = await getImages(this.apiUrl, this.name);
  }
}
</script>

<style lang="scss">
#app {
  margin: 0;
}
</style>

<style lang="scss" scoped>
.ldBar {
  position: relative;
}
.ldBar.label-center::v-deep {
  > .ldBar-label {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-shadow: 0 0 3px #fff;
  }
  > .ldBar-label:after {
    content: "%";
    display: inline;
  }
  > .ldBar.no-percent .ldBar-label:after {
    content: "";
  }
}
</style>

