import { Pipe, PipeTransform } from '@angular/core';
import { MiniDrinkDetailModel } from '../models/mini-drink-detail.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(originalArray: MiniDrinkDetailModel[], searchText: string): MiniDrinkDetailModel[] {
    if (originalArray.length === 0) { return []; }
    if (!searchText) { return originalArray; }
    searchText = searchText.toLowerCase();
    return originalArray.filter(drink => {
      return drink.strDrink.toLowerCase().includes(searchText);
    });
  }

}
