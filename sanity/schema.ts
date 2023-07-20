import { type SchemaTypeDefinition } from 'sanity'
import {product} from './product'   // import the model/document
import {category} from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category],   // add it to schema array. there we can add mutilpe schemas/models by seprating them with comma between them
}
