import Vue from "vue";
import Vuetify, {
  VCard,
  VCardTitle,
  VCardText,
  VToolbar,
  VBtn,
  VToolbarItems,
  VSpacer,
  VIcon,
  VTextField,
  VColorPicker,
  VTextarea,
  VList,
  VListItem,
  VListItemAction,
  VListItemActionText,
  VListItemTitle,
  VAppBar,
  VTooltip
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VToolbar,
    VToolbarItems,
    VSpacer,
    VIcon,
    VTextField,
    VBtn,
    VColorPicker,
    VTextarea,
    VList,
    VAppBar,
    VTooltip,
    VListItem,
    VListItemAction,
    VListItemActionText,
    VListItemTitle
  },
  icons: {
    iconfont: "mdiSvg"
  }
});

export default new Vuetify({});
