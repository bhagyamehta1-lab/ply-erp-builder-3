# Pilot Task 03 — Purchase & GRN
Status: READY FOR CONTRACT REVIEW; implementation blocked pending shared-contract approval.
Shared proposal: [Shared Domain Contract v0.1 (draft)](https://github.com/bhagyamehta1-lab/ply-erp-builder/blob/main/docs/contracts/PILOT-2-3-4-DOMAIN-CONTRACT.md)

## Goal
Specify a traceable purchase-to-GRN receipt workflow that creates raw-material lots and stock movements only when GRN posting succeeds.

## Non-goals
- A purchase order must never directly increase stock.
- Do not create a competing stock ledger or independently define shared migrations.
- Do not assume private ERP API/schema details.
- Do not copy private source, supplier records, invoices or production data.

## Work items
1. Define synthetic supplier, purchase order, PO line, GRN, GRN line and received-lot lifecycle proposals.
2. Specify partial receipt, over-receipt policy as configurable/approval-required, rejected quantity and discrepancy handling.
3. Define atomic GRN posting: document state, lot creation, stock receipt movement and audit event commit together or not at all.
4. Specify lot metadata needed for downstream traceability (item, supplier reference, receipt date, source GRN, quantity/UOM, quality status).
5. Specify duplicate submission/idempotency, cancellation before posting and reversal after posting.
6. Draft synthetic tests for full/partial receipt, rejected material, duplicate post, transaction failure and reversal.

## Acceptance criteria
- Draft PO/GRN has no stock effect.
- Only posted GRN creates lot(s) and receipt movement(s).
- Failed posting leaves no partial lot or movement.
- Every receipt can be traced to its source GRN and synthetic supplier.
- Corrections after posting use linked reversal, not silent edits.
- Handoff includes files, assumptions, test commands/results, gaps and integration notes.

## Dependencies
Shared Domain Contract v0.1 is a draft proposal. Await explicit integration-owner approval before schema/API/posting implementation.

## Synthetic examples
Use Demo Veneers Ltd, RM-PLY-01, PO-DEMO-001, GRN-DEMO-001 and LOT-DEMO-001 only.

## Handoff
Submit state machine, transaction sequence, payload proposal and synthetic acceptance tests. Private integration requires review and a private feature branch.
