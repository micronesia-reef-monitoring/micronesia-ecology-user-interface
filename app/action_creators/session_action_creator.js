import Types from "app/action_types/session";

import {
  fetchSession as fetchSessionCall,
  authenticate as authenticateCall,
  initCsrf as initCsrfCall
} from "app/api/api_calls";


export function authenticate (email, password) {
  return {
    type: Types.AUTHENTICATE,
    callAPI: () => authenticateCall({email, password})
  }
}
export function initCsrf () {
  return {
    type: Types.INIT_CSRF,
    callAPI: () => initCsrfCall()
  }
}
