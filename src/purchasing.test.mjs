import test from 'node:test';
import assert from 'node:assert/strict';
export function remainingOrderQuantity(ordered,received,draftReserved=0) {
 if (![ordered,received,draftReserved].every(Number.isFinite)||ordered<0||received<0||draftReserved<0) throw new Error('Invalid purchase quantities');
 return Math.max(0,ordered-received-draftReserved);
}
export function validateReceiptLine({ordered,received,draftReserved=0,receiptQuantity,unitRate}) {
 if (!Number.isFinite(receiptQuantity)||receiptQuantity<=0) throw new Error('Receipt quantity must be positive');
 if (!Number.isFinite(unitRate)||unitRate<0) throw new Error('Unit rate cannot be negative');
 if (receiptQuantity>remainingOrderQuantity(ordered,received,draftReserved)) throw new Error('Receipt exceeds remaining PO quantity');
 return Object.freeze({acceptedQuantity:receiptQuantity,unitRate,lineValue:receiptQuantity*unitRate});
}
export function nextPurchaseStatus(orderedLines) {
 if (!orderedLines.length) throw new Error('Purchase order must contain lines');
 const received=orderedLines.reduce((s,l)=>s+l.received,0);
 const total=orderedLines.reduce((s,l)=>s+l.ordered,0);
 if (received===0) return 'approved';
 return received>=total?'received':'part_received';
}
test('GRN permits partial receipt and computes line value',()=>{
 assert.deepEqual(validateReceiptLine({ordered:100,received:20,receiptQuantity:30,unitRate:42}),{acceptedQuantity:30,unitRate:42,lineValue:1260});
});
test('GRN rejects over-receipt including other draft reservations',()=>{
 assert.throws(()=>validateReceiptLine({ordered:100,received:60,draftReserved:20,receiptQuantity:21,unitRate:1}));
});
test('PO status reflects cumulative receipt',()=>{
 assert.equal(nextPurchaseStatus([{ordered:10,received:4}]),'part_received');
 assert.equal(nextPurchaseStatus([{ordered:10,received:10}]),'received');
});