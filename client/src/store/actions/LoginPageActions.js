import * as socketConnection from "../../socketConnection/socketConnection";

export const proceedWithLogin = (data) => {
  socketConnection.login(data);
};
