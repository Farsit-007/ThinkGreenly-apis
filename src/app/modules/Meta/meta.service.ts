import { IdeaStatus, PaymentStatus, Role } from '@prisma/client';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../config/prisma';

const fetchDashboardMetaData = async (user: JwtPayload) => {
  let metaData;

  switch (user?.role) {
    case Role.ADMIN:
      metaData = getAdminMetaData();
      break;

    case Role.MEMBER:
      metaData = getMemberMetaData(user);
      break;

    default:
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user role!');
  }

  return metaData;
};

const getAdminMetaData = async () => {
  const totalIdeaCount = await prisma.idea.count();

  const freeIdeaCount = await prisma.idea.count({
    where: {
      status: IdeaStatus.APPROVED,
      isPaid: false,
    },
  });

  const paidIdeaCount = await prisma.idea.count({
    where: {
      status: IdeaStatus.APPROVED,
      isPaid: true,
    },
  });

  const underReviewIdeaCount = await prisma.idea.count({
    where: {
      status: IdeaStatus.UNDER_REVIEW,
    },
  });

  const userCount = await prisma.user.count();
  const paymentCount = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: {
      status: PaymentStatus.Paid,
    },
  });

  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();

  return {
    totalIdeaCount,
    freeIdeaCount,
    paidIdeaCount,
    underReviewIdeaCount,
    userCount,
    paymentCount,
    totalRevenue: totalRevenue._sum.amount ?? 0,
    barChartData,
    pieChartData,
  };
};

const getMemberMetaData = async (user: JwtPayload) => {
  const myTotalIdeaCount = await prisma.idea.count({
    where: {
      authorId: user.id,
    },
  });

  const myFreeIdeaCount = await prisma.idea.count({
    where: {
      authorId: user.id,
      status: IdeaStatus.APPROVED,
      isPaid: false,
    },
  });

  const myPaidIdeaCount = await prisma.idea.count({
    where: {
      authorId: user.id,
      status: IdeaStatus.APPROVED,
      isPaid: true,
    },
  });

  const myUnderReviewIdeaCount = await prisma.idea.count({
    where: {
      authorId: user.id,
      status: IdeaStatus.UNDER_REVIEW,
    },
  });

  const myIdeaSoldCount = await prisma.payment.count({
    where: {
      idea: { authorId: user.id },
      status: PaymentStatus.Paid,
    },
  });

  const myIdeaBoughtCount = await prisma.payment.count({
    where: {
      userEmail: user.email,
      status: PaymentStatus.Paid,
    },
  });

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      idea: {
        authorId: user.id,
      },
      status: PaymentStatus.Paid,
    },
  });

  const ideaStatusDistribution = await prisma.idea.groupBy({
    by: ['status'],
    _count: { id: true },
    where: {
      authorId: user.id,
    },
  });

  const formattedIdeaStatusDistribution = ideaStatusDistribution.map(
    ({ status, _count }) => ({
      status,
      count: Number(_count.id),
    })
  );

  return {
    myTotalIdeaCount,
    myUnderReviewIdeaCount,
    myFreeIdeaCount,
    myPaidIdeaCount,
    myIdeaSoldCount,
    myIdeaBoughtCount,
    totalRevenue: totalRevenue._sum.amount ?? 0,
    formattedIdeaStatusDistribution,
  };
};

const getBarChartData = async () => {
  const ideaCountByMonth: { month: Date; count: bigint }[] =
    await prisma.$queryRaw`
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "ideas"
        WHERE "status" = 'APPROVED'
        GROUP BY month
        ORDER BY month ASC
    `;

  return ideaCountByMonth;
};

const getPieChartData = async () => {
  const ideaStatusDistribution = await prisma.idea.groupBy({
    by: ['status'],
    _count: { id: true },
  });

  const formattedIdeaStatusDistribution = ideaStatusDistribution.map(
    ({ status, _count }) => ({
      status,
      count: Number(_count.id),
    })
  );

  return formattedIdeaStatusDistribution;
};

export const metaService = {
  fetchDashboardMetaData,
};
