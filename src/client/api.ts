import { rpcClient } from "typed-rpc";
import { APIService } from "../server/server";

export const api = rpcClient<APIService>("http://localhost:5000/rpc");