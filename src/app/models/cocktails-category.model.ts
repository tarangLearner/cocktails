export interface CocktailsCategoryModel {
  drinks: DrinkCategoryModel[];
}

export interface DrinkCategoryModel {
  [keyName: string]: string
}
