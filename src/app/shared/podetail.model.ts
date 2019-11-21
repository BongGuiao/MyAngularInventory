export interface PoDetail {
    id: number;
    poId: number;
    itemId: number;
    receivingId: number;
    receivingQtyValue: number;
    poQty: number;
    poDeliveredQty: number;
    poBalanceQty: number;
    unitCost: number;
    createdBy: string;
    dateCreated: Date;
    updatedBy: string;
    dateUpdated: Date;
}
