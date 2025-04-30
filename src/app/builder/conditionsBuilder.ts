import { globalQueryOptions } from '../constants/global.constants';
import pick from '../utils/pick';
import { TModelFieldsType } from '../types';

const buildConditionsForPrisma = (
  query: Record<string, unknown>,
  andConditions: any,
  fields: TModelFieldsType
) => {
  const filterFields = pick(query, [
    ...globalQueryOptions,
    ...(fields.filterableStringFields as []),
    ...(fields.filterableNumberFields as []),
    ...(fields.filterableBooleanFields as []),
  ]);
  const { search, searchTerm, ...filterData } = filterFields;

  /* Convert String to Number type */
  if (filterData && (fields.filterableNumberFields as [])) {
    for (const key of fields.filterableNumberFields as []) {
      if (Object.hasOwnProperty.call(filterData, key)) {
        filterData[key] = Number(filterData[key]);
      }
    }
  }

  /* Convert String to Boolean type */
  if (filterData && (fields.filterableBooleanFields as [])) {
    for (const key of fields.filterableBooleanFields as []) {
      if (Object.hasOwnProperty.call(filterData, key)) {
        filterData[key] = Boolean(filterData[key]);
      }
    }
  }

  /* Search */
  if (searchTerm) {
    andConditions.push({
      OR: (fields.searchable as []).map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  /* Filter */
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  /* Date Filter */
  const dateFields: Record<string, unknown> = pick(query, [
    ...(fields.filterableDateFields as []),
  ]);
  if (Object.keys(dateFields).length > 0) {
    const dateConditions = [];

    for (const [field, value] of Object.entries(dateFields)) {
      const prismaConditions: Record<string, any> = {};

      if (typeof value === 'string' && value.includes(',')) {
        const [start, end] = value.split(',').map(Number);
        if (!isNaN(start) && !isNaN(end) && start !== 0 && end !== 0) {
          prismaConditions[field] = {
            gte: start,
            lte: end,
          };
          dateConditions.push(prismaConditions);
        }
      }
    }

    if (dateConditions.length > 0)
      andConditions.push({
        AND: dateConditions,
      });
  }

  return andConditions;
};

const buildConditionsForRawSQL = (
  query: Record<string, unknown>,
  fields: TModelFieldsType,
  whereConditions: string[] = ['WHERE 1=1 ']
) => {
  const filterFields: Record<string, unknown> = pick(query, [
    ...globalQueryOptions,
    ...(fields.filterableStringFields as []),
    ...(fields.filterableNumberFields as []),
    ...(fields.filterableBooleanFields as []),
  ]);
  const { search, searchTerm, ...filterData } = filterFields;

  /* Search */
  if (searchTerm && (fields.searchable as [])) {
    const searchConditions = (fields.searchable as [])
      .map((field) => `${fields.tableName}.${field} ILIKE '%${searchTerm}%'`)
      .join(' OR ');

    whereConditions.push(searchConditions ? ` AND (${searchConditions})` : '');
  }

  /* Filter */
  if (Object.keys(filterData).length > 0) {
    const filterString = Object.entries(filterData)
      .map(([key, value]) => `AND ${fields.tableName}.${key} = '${value}'`)
      .join(' ');
    whereConditions.push(filterString ? filterString : '');
  }

  /* Date Filter */
  const dateFields: Record<string, unknown> = pick(query, [
    ...(fields.filterableDateFields as []),
  ]);
  if (Object.keys(dateFields).length > 0) {
    const sqlParts: string[] = [];

    for (const [field, value] of Object.entries(dateFields)) {
      if (typeof value === 'string' && value.includes(',')) {
        const [start, end] = value.split(',').map(Number);
        if (!isNaN(start) && !isNaN(end) && start !== 0 && end !== 0) {
          sqlParts.push(
            `(${fields.tableName}.${field} BETWEEN ${start} AND ${end})`
          );
        }
      }
    }

    whereConditions.push(
      sqlParts.length > 0 ? ` AND ${sqlParts.join(' AND ')}` : ''
    );
  }

  return whereConditions.join(' ');
};

export const ConditionsBuilder = {
  prisma: buildConditionsForPrisma,
  rawSQL: buildConditionsForRawSQL,
};
