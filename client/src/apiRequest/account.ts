import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  //vi khong the lay token nen truyen vao tham so(chi lay dc o route, cac component)
  me: (sessionToken: string) =>
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  meClient: () => http.get<AccountResType>("account/me"),
};

export default accountApiRequest;
