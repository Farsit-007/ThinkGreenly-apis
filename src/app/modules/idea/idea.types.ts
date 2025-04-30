/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdeaStatus } from '@prisma/client';

export type TIdeaPayload = {
  title: string;
  problemStatement: string;
  solution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price: number;
  status: IdeaStatus;
  //   status: ['DRAFT'| 'PENDING'| 'UNDER_REVIEW'| 'APPROVED'| 'REJECTED'];
  feedback?: string;
  categoryId: string;
  authorId: string;
};
export type TIdeaFilterParams = {
  searchTerm?: string;
  title?: string;
  problemStatement?: string;
  solution?: string;
  description?: string;
  isPaid?: boolean | string;
  price?: number;
  status?: string;
  feedback?: string;
  categoryId?: string;
  authorId?: string;
  [key: string]: any;
};
