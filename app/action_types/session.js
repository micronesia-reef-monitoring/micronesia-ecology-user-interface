import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "AUTHENTICATE", "INIT_CSRF"
]);

export default {...AsyncTypes};
