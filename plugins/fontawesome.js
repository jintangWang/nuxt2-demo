import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserTie, faReply, faPen, faGlobeAsia, faAngleRight, faAngleDown, faAngleUp, faAngleLeft,
  faChevronUp, faChevronDown, faTimes, faBars, faSearch, faCheck, faCheckCircle, faExternalLinkAlt,
  faCalendarAlt, faSync
} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faTwitterSquare, faTwitter, faFacebookF} from '@fortawesome/free-brands-svg-icons'
import {faFilePdf} from '@fortawesome/free-regular-svg-icons'


// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  // solid icons
  faUserTie, faReply, faPen, faGlobeAsia, faAngleRight, faAngleDown, faAngleUp, faAngleLeft,
  faChevronUp, faChevronDown, faTimes, faBars, faSearch, faCheck, faCheckCircle, faExternalLinkAlt,
  faCalendarAlt, faSync,
  // brands icons
  faFacebookSquare, faTwitterSquare, faTwitter, faFacebookF,
  // regular icons
  faFilePdf,
);

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);
