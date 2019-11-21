import { PoDetailReceipt } from './podetailreceipt.model';
import { PoHead } from './pohead.model';
import { PoDetail } from './podetail.model';
export interface PurchaseOrder {
    poHead: PoHead;
    poDetail: PoDetail[];
    poReceipt: PoDetailReceipt[];
}
