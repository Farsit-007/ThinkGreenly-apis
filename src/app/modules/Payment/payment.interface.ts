import { PaymentStatus, Prisma } from '@prisma/client';

export type TPayment = {
  userId: string;
  ideaId: string;
  amount: number;
  status: PaymentStatus; // default: 'Pending',
  transactionId: string; // default: null,
  gatewayResponse?: Prisma.InputJsonValue; // default: null,
  createdAt?: Date;
};
