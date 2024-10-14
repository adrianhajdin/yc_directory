import { type SchemaTypeDefinition } from "sanity";

import { author } from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup],
};
