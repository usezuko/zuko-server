import { ClaimType } from "@sismo-core/sismo-connect-server";

export const claims = [{
    groupId: "0x61ca006d72682a6b4a2a2e566be777be", //APE coin holders     
    claimType: ClaimType.GTE,
    value: 1,
    isOptional: true,
    isSelectableByUser: true,
}, {
    groupId: "0xf002554351fe264d75f59e7fba89c2e6", //pudgy penguins
    claimType: ClaimType.GTE,
    value: 1,
    isOptional: true,
    isSelectableByUser: true,
},
{
    groupId: "0x5f4f2e4af0c05a5dbf5e13624b5de706", //liquality ETHDenver event
    claimType: ClaimType.GTE,
    value: 1,
    isOptional: true,
    isSelectableByUser: true,
},

]