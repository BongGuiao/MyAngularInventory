export interface Itemfile {
    id: number;
    itemCode: string;
    majorGroupId: string;
    itemGroupId: string;
    overGroupId: string;
    description: string;
    posDescription: string;
    classCode: string;
    receivingUnitId: string;
    receivingQtyValue: string;
    issuingUnitId: string;
    issuingQtyValue: string;
    departmentId: string;
    parStock: string;
    reorder: string;
    lastCost: string;
    retailPrice: string;
    wholeSalePrice: string;
    lastMovement: string;
    vatable: string;
    markUp: string;
    createdBy: string;
    dateCreated: string;
    updatedBy: string ;
    dateUpdated: string;
    deleted: number;
}
