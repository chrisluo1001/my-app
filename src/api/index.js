import MockApi from "./MockDstApi";
import LiveApi from "./DstApi";

export default true ? MockApi : LiveApi;
//export default (process.env.NODE_ENV && process.env.NODE_ENV !== "production")
//  ? MockApi
//  : LiveApi;
