export const menuItemsQuery = `*[_type == "menuItem" && available == true] | order(name asc) {
  _id,
  name,
  slug,
  category,
  price,
  description,
  tag,
  image,
  featured,
  available,
  allowExtraGrilledChicken,
  enableCustomBowlBuilder
}`;
