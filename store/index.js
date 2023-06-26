export const state = () => ({
  solutionMenus: [
    { category_name: 'Power Cable Test'},
    { category_name: 'Transformer Test'},
    { category_name: 'Power Generator Test'},
    { category_name: 'Switchgear Test'},
    { category_name: 'CVT Test'},
    { category_name: 'On-line Monitoring and Live Testing'},
  ],
  productMenus: [
    { category_name: 'HV Resonant Test Sets'},
    { category_name: 'Fixed & Variable Reactors'},
    { category_name: 'AC/DC Hipot Test Sets'},
    { category_name: 'Induced Voltage Withstand Test sets'},
    { category_name: 'VLF'},
    { category_name: 'Primary Current & Temperature Rise Test'},
    { category_name: 'Relay Test Set'},
    { category_name: 'Transformer Test Sets'},
    { category_name: 'Circuit Breaker Test Set'},
    { category_name: 'CT & CVT Test Set'},
    { category_name: 'Dielectric Loss equipment'},
    { category_name: 'Cable Fault Test Sets'},
    { category_name: 'Motor & Generator test set'},
    { category_name: 'On-line monitoring and live testing'},
    { category_name: 'Oil Filtering'},
    { category_name: 'Others'},
  ],
  serviceMenus: [
    { category_name: 'Warranty and the Extended Warranty'},
    { category_name: 'Site service/based on extra charge'},
    { category_name: 'Update & Migration'},
  ],
  infoCenterMenus: [
    { category_name: 'Industry News In China'},
    { category_name: 'New Products in China'},
    { category_name: 'New Solutions in China'},
  ],
  faqMenus: [
    { category_name: 'Products FAQ'},
    { category_name: 'Solutions FAQ'},
    { category_name: 'Others'},
  ],
  cooperationList: [],
  recommendProducts: []
});

export const mutations = {
  setSolutionMenus (state, val) {
    state.solutionMenus = val;
  },
  setProductMenus (state, val) {
    state.productMenus = val;
  },
  setServiceMenus (state, val) {
    state.serviceMenus = val;
  },
  setInfoCenterMenus (state, val) {
    state.infoCenterMenus = val;
  },
  setFaqMenus (state, val) {
    state.faqMenus = val;
  },
  setCooperation(state, data) {
    state.cooperationList = data;
  },
  setRecommendProducts(state, data) {
    state.recommendProducts = data;
  }
};

export const actions = {
  // 全局服务初始化
  nuxtServerInit (store, context) {

  }
};
