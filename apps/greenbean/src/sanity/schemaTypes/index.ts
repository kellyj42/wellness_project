import { type SchemaTypeDefinition } from "sanity";

import { menuItem } from "./menuItem";
import { contactSubmission } from "./contactSubmission";
import { orderSubmission } from "./orderSubmission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuItem, contactSubmission, orderSubmission],
};
