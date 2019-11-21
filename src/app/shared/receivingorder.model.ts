import { RrDetailReceipt } from './rrdetailreceipt.model';
import { RrHead } from './rrhead.model';
import { RrDetail } from './rrdetail.model';
export interface ReceivingOrder {
    rrHead: RrHead;
    rrDetail: RrDetail[];
    rrReceipt: RrDetailReceipt[];
}
