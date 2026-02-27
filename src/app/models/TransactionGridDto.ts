export interface TransactionGridDto {
transactionId: string;
createdAt: string;
createdBy?: string | null;
modifiedAt: string;
modifiedBy?: string | null;
fields: Record<string, string | null>;
}