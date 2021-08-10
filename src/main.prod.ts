import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import WebFoto from './WebFoto.vue';

const CustomElement = wrap(Vue, WebFoto);

window.customElements.define('web-foto', CustomElement as any);