import { buildJsonSchemas } from 'fastify-zod'
import * as z from 'zod'

const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional()
}

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
}

// define the schemas
const createProductSchema = z.object({
  ...productInput
})

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated
})

const productsResponseSchema = z.array(productResponseSchema)

// export the type
export type CreateProductInput = z.infer<typeof createProductSchema>

// export the schemas
export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
    productsResponseSchema
  },
  {
    $id: 'productSchemas'
  }
)
