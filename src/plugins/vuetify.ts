import Vue from "vue";
import Vuetify, {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
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
  VRadioGroup,
  VRadio,
  VChip,
  VDivider,
  VSelect,
  VAutocomplete,
  VTabs,
  VTab,
  VTabsItems,
  VTabItem
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VCard,
    VCardTitle,
    VCardActions,
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
    VRadioGroup,
    VRadio,
    VChip,
    VDivider,
    VSelect,
    VAutocomplete,
    VTabs,
    VTab,
    VTabsItems,
    VTabItem
  },
  icons: {
    iconfont: "mdiSvg"
  }
});

export default new Vuetify({});
