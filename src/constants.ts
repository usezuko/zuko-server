import { ClaimType } from "@sismo-core/sismo-connect-server";

export const claims = [{
    groupId: "0x85c7ee90829de70d0d51f52336ea4722", //ENS voters
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
},]