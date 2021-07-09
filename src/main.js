import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'



import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

const AmpConfigure = () => {
  aws_exports.graphql_headers = async () => {
    const currentSession = await Auth.currentSession();
    return { Authorization: currentSession.getIdToken().getJwtToken() };
  };
  Amplify.configure(aws_exports);
}

AmpConfigure();





Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
