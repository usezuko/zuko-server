import { ClaimRequest } from "@sismo-core/sismo-connect-server";
import User from "./classes/User";

type Helper = {
  //findByAddress: (address: string) => void;
  setUserToCommunity: (claim: ClaimRequest[], vaultId: string) => Promise<void>;

};

const helper: Helper = {
  setUserToCommunity: async (claims: ClaimRequest[], vaultId: string) => {
    const user = new User();

    for (const claim of claims) {
      if (claim.groupId) {
        const groupId = claim.groupId as string;
        const setUserToCommunity = await user.createVaultIdToGroupId(groupId, vaultId);
      }
    }
  }
};

export default helper;
