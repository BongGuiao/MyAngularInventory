export interface RrHead {
    id: number;
    poHeadId: number;
    rrDate: string;
    referenceNo: string;
    supplierId: number;
    terms: string;
    baseAmount: number;
    vatAmount: number;
    netAmount: number;
    taxClaimed: number;
    amountPaid: number;
    isJournalized: boolean;
    isKept: boolean;
    receivedBy: string;
    checkedBy: string;
    remarks: string;
    createdBy: string;
    dateCreated: string;
    updatedBy: string;
    dateUpdated: string;
}
