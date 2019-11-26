export interface DrDetailRawMaterialModel {
    id: number;
    drHeadRawMaterialId: number;
    itemId: number;
    issuingId: number;
    issuingQtyValue: number;
    drQty: number;
    deliveredQty: number;
    drBalanceQty: number;
    unitCost: number;
    createdBy: string;
    dateCreated: Date;
    updatedBy: string;
    dateUpdated: Date;
}