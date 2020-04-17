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
  VDialog,
  VTooltip,
  VDivider
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
    VDialog,
    VListItemTitle,
    VDivider
  },
  icons: {
    iconfont: "mdiSvg"
  }
});

export default new Vuetify({});
