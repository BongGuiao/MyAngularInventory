export interface RrDetailReceipt {
    id: number;
    rrHeadId: number;
    poDetailId: number;
    itemId: number;
    description: string;
    receivingId: number;
    receivingQtyValue: number;
    rrQty: number;
    unitCost: number;
    baseCost: number;
    vatAmount: number;
    createdBy: string;
    dateCreated: Date;
    updatedBy: string;
    dateUpdated: Date;
}
