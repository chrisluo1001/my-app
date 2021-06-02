import { SET_DST_ID } from "../constants/ActionTypes";

/**
 * Part of the initial bootstraping of the app. Sets the DST ID
 * found in the URI into the Redux store.
 *
 * @param {string} dstId The DST Identifier for the consult
 */
export const setDstId = (dstId) => ({
  type: SET_DST_ID,
  dstId,
});
