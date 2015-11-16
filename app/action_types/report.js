import createAsyncActionsTypes from "./utils/create_async_actions_types";
import createSyncActionsTypes from "./utils/create_sync_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "GETREPORT", "GETCSVREPORT", "GETTABDATA"
]);

const SyncTypes = createSyncActionsTypes([
	"UPDATECHECKBOXINFO"
]);

export default {...AsyncTypes, ...SyncTypes}
