import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icons you need from each style
import { 
    faUser, 
    faSpinner, 
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faPlusCircle,
    faDownload,
    faCog,
    faBell,
    faCopy, 
    faTimes,
    faEnvelope,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons'

import { 
    faBell as farBell,
    faCircle 
} from '@fortawesome/free-regular-svg-icons'

import { 
    faWhatsapp,
    faGithub 
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    // Solid icons
    faUser, 
    faSpinner, 
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faCog,
    faBell,
    faPlusCircle,
    faDownload,
    faCopy, 
    faTimes,
    faEnvelope,
    faMobileScreen,
    // Regular icons
    farBell,
    faCircle,
    // Brand icons
    faWhatsapp,
    faGithub
)

export { FontAwesomeIcon }