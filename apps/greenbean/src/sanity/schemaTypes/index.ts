import { type SchemaTypeDefinition } from "sanity";

import { menuItem } from "./menuItem";
import { contactSubmission } from "./contactSubmission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuItem, contactSubmission],
};
