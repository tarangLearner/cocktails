export interface MiniDrinkDetailModel {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface MiniDrinkDetailApiModel {
  drinks: MiniDrinkDetailModel[];
}
