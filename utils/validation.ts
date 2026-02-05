/**
 * Runtime Validation Schemas using Zod
 * Provides type-safe API response validation
 */

import { z } from 'zod';

// Base schemas
const TrendPointSchema = z.object({
  date: z.string(),
  price: z.number(),
  differenceAmount: z.number().optional(),
  differencePercentage: z.number().optional(),
});

// Gold-specific schemas
export const GoldTrendPointSchema = TrendPointSchema;

// Silver-specific schemas
export const SilverTrendPointSchema = TrendPointSchema.extend({
  differenceAmount: z.number().optional(),
  differencePercentage: z.number().optional(),
});

// Copper-specific schemas
export const CopperTrendPointSchema = TrendPointSchema.extend({
  percentageChange: z.number().optional(),
});

// Main API response schema
export const MetalsApiResponseSchema = z.object({
  city: z.string(),
  gold_10g: z.number().nullable(),
  gold_22k_10g: z.number().nullable(),
  gold_1g: z.number().nullable(),
  gold_22k_1g: z.number().nullable(),
  gold_18k_1g: z.number().nullable().optional(),
  gold_18k_10g: z.number().nullable().optional(),
  gold_18k_difference: z.string().nullable().optional(),
  gold_22k_difference: z.string().nullable().optional(),
  gold_24k_difference: z.string().nullable().optional(),
  gold_18k_percentage: z.string().nullable().optional(),
  gold_22k_percentage: z.string().nullable().optional(),
  gold_24k_percentage: z.string().nullable().optional(),
  silver_1kg: z.number().nullable(),
  silver_10g: z.number().nullable(),
  silver_1g: z.number().nullable(),
  copper_1kg: z.number().nullable(),
  copper_100g: z.number().nullable(),
  copper_10g: z.number().nullable(),
  copper_1g: z.number().nullable(),
  copper: z.number().nullable(),
  platinum: z.number().nullable(),
  platinum_10g: z.number().nullable(),
  palladium: z.number().nullable(),
  palladium_1g: z.number().nullable().optional(),
  palladium_10g: z.number().nullable().optional(),
  palladiumPercentageChange: z.number().nullable().optional(),
  palladiumVariationType: z.enum(['up', 'down']).optional(),
  palladiumVariation: z.string().optional(),
  updated_at: z.string(),
  cached: z.boolean().default(false),
  error: z.string().optional(),
  trendingCities: z.array(z.string()).optional(),
  goldTrend: z.array(GoldTrendPointSchema).optional(),
  silverTrend: z.array(SilverTrendPointSchema).optional(),
  copperTrend: z.array(CopperTrendPointSchema).optional(),
  percentageChange24k: z.number().nullable().optional(),
  percentageChange22k: z.number().nullable().optional(),
  silverPercentageChange: z.number().nullable().optional(),
  copperPercentageChange: z.number().nullable().optional(),
});

// Type exports
export type MetalsApiResponse = z.infer<typeof MetalsApiResponseSchema>;
export type GoldTrendPoint = z.infer<typeof GoldTrendPointSchema>;
export type SilverTrendPoint = z.infer<typeof SilverTrendPointSchema>;
export type CopperTrendPoint = z.infer<typeof CopperTrendPointSchema>;

// Dashboard API response schema
export const MetalPriceDataSchema = z.object({
  rate: z.number(),
  sellRate: z.number(),
  buyRate: z.number(),
  variationType: z.enum(['up', 'down']),
  variation: z.string(),
});

export const AllMetalPricesSchema = z.object({
  gold: MetalPriceDataSchema,
  silver: MetalPriceDataSchema,
  platinum: MetalPriceDataSchema,
  palladium: MetalPriceDataSchema,
});

export type MetalPriceData = z.infer<typeof MetalPriceDataSchema>;
export type AllMetalPrices = z.infer<typeof AllMetalPricesSchema>;

// Validation functions
export function validateMetalsApiResponse(
  data: unknown
): MetalsApiResponse {
  try {
    return MetalsApiResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
      throw new Error(
        `Invalid API response: ${error.issues.map((e) => e.message).join(', ')}`
      );
    }
    throw error;
  }
}

export function validateAllMetalPrices(data: unknown): AllMetalPrices {
  try {
    return AllMetalPricesSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
      throw new Error(
        `Invalid API response: ${error.issues.map((e) => e.message).join(', ')}`
      );
    }
    throw error;
  }
}

// Safe validation (returns null on error instead of throwing)
export function safeValidateMetalsApiResponse(
  data: unknown
): MetalsApiResponse | null {
  try {
    return MetalsApiResponseSchema.parse(data);
  } catch {
    return null;
  }
}
