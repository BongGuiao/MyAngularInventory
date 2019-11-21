export interface PoDetailReceipt {

    id: number;
    itemId: number;
    description: string;
    receivingQtyValue: number;
    poQty: number;
    unit: string;
    poDeliveredQty: number;
    poBalanceQty: number;
    unitCost: number;
    amount: number;
    createdBy: string;
    dateCreated: Date;
    updatedBy: string;
    dateUpdated: Date;
}
