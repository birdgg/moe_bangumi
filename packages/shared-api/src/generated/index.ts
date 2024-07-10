import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const BangumiScalarFieldEnumSchema = z.enum(['id', 'nameZh', 'nameJp', 'nameEn', 'poster', 'season', 'group', 'sub', 'dpi', 'createdAt', 'updatedAt']);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const NullsOrderSchema = z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BANGUMI SCHEMA
/////////////////////////////////////////

export const BangumiSchema = z.object({
  id: z.number().int(),
  nameZh: z.string(),
  nameJp: z.string().nullable(),
  nameEn: z.string().nullable(),
  poster: z.string(),
  season: z.number().int(),
  group: z.string().nullable(),
  sub: z.string().nullable(),
  dpi: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Bangumi = z.infer<typeof BangumiSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BANGUMI
//------------------------------------------------------

export const BangumiSelectSchema = z.object({
  id: z.boolean().optional(),
  nameZh: z.boolean().optional(),
  nameJp: z.boolean().optional(),
  nameEn: z.boolean().optional(),
  poster: z.boolean().optional(),
  season: z.boolean().optional(),
  group: z.boolean().optional(),
  sub: z.boolean().optional(),
  dpi: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BangumiWhereInputSchema: z.ZodType<Prisma.BangumiWhereInput> = z.object({
  AND: z.union([z.lazy(() => BangumiWhereInputSchema), z.lazy(() => BangumiWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => BangumiWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BangumiWhereInputSchema), z.lazy(() => BangumiWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  nameZh: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  nameJp: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  nameEn: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  poster: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  season: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  group: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  sub: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  dpi: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
}).strict();

export const BangumiOrderByWithRelationInputSchema: z.ZodType<Prisma.BangumiOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nameZh: z.lazy(() => SortOrderSchema).optional(),
  nameJp: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  nameEn: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  poster: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional(),
  group: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  sub: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  dpi: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BangumiWhereUniqueInputSchema: z.ZodType<Prisma.BangumiWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    nameZh_season: z.lazy(() => BangumiNameZhSeasonCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    nameZh_season: z.lazy(() => BangumiNameZhSeasonCompoundUniqueInputSchema),
  }),
])
  .and(z.object({
    id: z.number().int().optional(),
    nameZh_season: z.lazy(() => BangumiNameZhSeasonCompoundUniqueInputSchema).optional(),
    AND: z.union([z.lazy(() => BangumiWhereInputSchema), z.lazy(() => BangumiWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => BangumiWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => BangumiWhereInputSchema), z.lazy(() => BangumiWhereInputSchema).array()]).optional(),
    nameZh: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    nameJp: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    nameEn: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    poster: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    season: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
    group: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    sub: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    dpi: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  }).strict());

export const BangumiOrderByWithAggregationInputSchema: z.ZodType<Prisma.BangumiOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nameZh: z.lazy(() => SortOrderSchema).optional(),
  nameJp: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  nameEn: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  poster: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional(),
  group: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  sub: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  dpi: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BangumiCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BangumiAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BangumiMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BangumiMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BangumiSumOrderByAggregateInputSchema).optional()
}).strict();

export const BangumiScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BangumiScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BangumiScalarWhereWithAggregatesInputSchema), z.lazy(() => BangumiScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => BangumiScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => BangumiScalarWhereWithAggregatesInputSchema), z.lazy(() => BangumiScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  nameZh: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  nameJp: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  nameEn: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  poster: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  season: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  group: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  sub: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  dpi: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
}).strict();

export const BangumiCreateInputSchema: z.ZodType<Prisma.BangumiCreateInput> = z.object({
  nameZh: z.string(),
  nameJp: z.string().optional().nullable(),
  nameEn: z.string().optional().nullable(),
  poster: z.string().optional(),
  season: z.number().int().optional(),
  group: z.string().optional().nullable(),
  sub: z.string().optional().nullable(),
  dpi: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BangumiUncheckedCreateInputSchema: z.ZodType<Prisma.BangumiUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nameZh: z.string(),
  nameJp: z.string().optional().nullable(),
  nameEn: z.string().optional().nullable(),
  poster: z.string().optional(),
  season: z.number().int().optional(),
  group: z.string().optional().nullable(),
  sub: z.string().optional().nullable(),
  dpi: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BangumiUpdateInputSchema: z.ZodType<Prisma.BangumiUpdateInput> = z.object({
  nameZh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  nameJp: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  nameEn: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  poster: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  season: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  group: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sub: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  dpi: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BangumiUncheckedUpdateInputSchema: z.ZodType<Prisma.BangumiUncheckedUpdateInput> = z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  nameZh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  nameJp: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  nameEn: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  poster: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  season: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  group: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sub: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  dpi: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BangumiCreateManyInputSchema: z.ZodType<Prisma.BangumiCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nameZh: z.string(),
  nameJp: z.string().optional().nullable(),
  nameEn: z.string().optional().nullable(),
  poster: z.string().optional(),
  season: z.number().int().optional(),
  group: z.string().optional().nullable(),
  sub: z.string().optional().nullable(),
  dpi: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BangumiUpdateManyMutationInputSchema: z.ZodType<Prisma.BangumiUpdateManyMutationInput> = z.object({
  nameZh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  nameJp: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  nameEn: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  poster: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  season: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  group: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sub: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  dpi: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const BangumiUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BangumiUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  nameZh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  nameJp: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  nameEn: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  poster: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  season: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  group: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sub: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  dpi: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const BangumiNameZhSeasonCompoundUniqueInputSchema: z.ZodType<Prisma.BangumiNameZhSeasonCompoundUniqueInput> = z.object({
  nameZh: z.string(),
  season: z.number()
}).strict();

export const BangumiCountOrderByAggregateInputSchema: z.ZodType<Prisma.BangumiCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nameZh: z.lazy(() => SortOrderSchema).optional(),
  nameJp: z.lazy(() => SortOrderSchema).optional(),
  nameEn: z.lazy(() => SortOrderSchema).optional(),
  poster: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  dpi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BangumiAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BangumiAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BangumiMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BangumiMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nameZh: z.lazy(() => SortOrderSchema).optional(),
  nameJp: z.lazy(() => SortOrderSchema).optional(),
  nameEn: z.lazy(() => SortOrderSchema).optional(),
  poster: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  dpi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BangumiMinOrderByAggregateInputSchema: z.ZodType<Prisma.BangumiMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nameZh: z.lazy(() => SortOrderSchema).optional(),
  nameJp: z.lazy(() => SortOrderSchema).optional(),
  nameEn: z.lazy(() => SortOrderSchema).optional(),
  poster: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  dpi: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BangumiSumOrderByAggregateInputSchema: z.ZodType<Prisma.BangumiSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  season: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BangumiFindFirstArgsSchema: z.ZodType<Prisma.BangumiFindFirstArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereInputSchema.optional(),
  orderBy: z.union([BangumiOrderByWithRelationInputSchema.array(), BangumiOrderByWithRelationInputSchema]).optional(),
  cursor: BangumiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([BangumiScalarFieldEnumSchema, BangumiScalarFieldEnumSchema.array()]).optional(),
}).strict();

export const BangumiFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BangumiFindFirstOrThrowArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereInputSchema.optional(),
  orderBy: z.union([BangumiOrderByWithRelationInputSchema.array(), BangumiOrderByWithRelationInputSchema]).optional(),
  cursor: BangumiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([BangumiScalarFieldEnumSchema, BangumiScalarFieldEnumSchema.array()]).optional(),
}).strict();

export const BangumiFindManyArgsSchema: z.ZodType<Prisma.BangumiFindManyArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereInputSchema.optional(),
  orderBy: z.union([BangumiOrderByWithRelationInputSchema.array(), BangumiOrderByWithRelationInputSchema]).optional(),
  cursor: BangumiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([BangumiScalarFieldEnumSchema, BangumiScalarFieldEnumSchema.array()]).optional(),
}).strict();

export const BangumiAggregateArgsSchema: z.ZodType<Prisma.BangumiAggregateArgs> = z.object({
  where: BangumiWhereInputSchema.optional(),
  orderBy: z.union([BangumiOrderByWithRelationInputSchema.array(), BangumiOrderByWithRelationInputSchema]).optional(),
  cursor: BangumiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BangumiGroupByArgsSchema: z.ZodType<Prisma.BangumiGroupByArgs> = z.object({
  where: BangumiWhereInputSchema.optional(),
  orderBy: z.union([BangumiOrderByWithAggregationInputSchema.array(), BangumiOrderByWithAggregationInputSchema]).optional(),
  by: BangumiScalarFieldEnumSchema.array(),
  having: BangumiScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BangumiFindUniqueArgsSchema: z.ZodType<Prisma.BangumiFindUniqueArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereUniqueInputSchema,
}).strict();

export const BangumiFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BangumiFindUniqueOrThrowArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereUniqueInputSchema,
}).strict();

export const BangumiCreateArgsSchema: z.ZodType<Prisma.BangumiCreateArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  data: z.union([BangumiCreateInputSchema, BangumiUncheckedCreateInputSchema]),
}).strict();

export const BangumiUpsertArgsSchema: z.ZodType<Prisma.BangumiUpsertArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereUniqueInputSchema,
  create: z.union([BangumiCreateInputSchema, BangumiUncheckedCreateInputSchema]),
  update: z.union([BangumiUpdateInputSchema, BangumiUncheckedUpdateInputSchema]),
}).strict();

export const BangumiCreateManyArgsSchema: z.ZodType<Prisma.BangumiCreateManyArgs> = z.object({
  data: z.union([BangumiCreateManyInputSchema, BangumiCreateManyInputSchema.array()]),
}).strict();

export const BangumiCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BangumiCreateManyAndReturnArgs> = z.object({
  data: z.union([BangumiCreateManyInputSchema, BangumiCreateManyInputSchema.array()]),
}).strict();

export const BangumiDeleteArgsSchema: z.ZodType<Prisma.BangumiDeleteArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  where: BangumiWhereUniqueInputSchema,
}).strict();

export const BangumiUpdateArgsSchema: z.ZodType<Prisma.BangumiUpdateArgs> = z.object({
  select: BangumiSelectSchema.optional(),
  data: z.union([BangumiUpdateInputSchema, BangumiUncheckedUpdateInputSchema]),
  where: BangumiWhereUniqueInputSchema,
}).strict();

export const BangumiUpdateManyArgsSchema: z.ZodType<Prisma.BangumiUpdateManyArgs> = z.object({
  data: z.union([BangumiUpdateManyMutationInputSchema, BangumiUncheckedUpdateManyInputSchema]),
  where: BangumiWhereInputSchema.optional(),
}).strict();

export const BangumiDeleteManyArgsSchema: z.ZodType<Prisma.BangumiDeleteManyArgs> = z.object({
  where: BangumiWhereInputSchema.optional(),
}).strict();