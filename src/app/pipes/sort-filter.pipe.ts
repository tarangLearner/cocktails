import { Pipe, PipeTransform } from '@angular/core';
import { MiniDrinkDetailModel } from '../models/mini-drink-detail.model';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(originalArray: MiniDrinkDetailModel[], sortType: string): MiniDrinkDetailModel[] {
    if (sortType === 'no-change') { return originalArray; }
    if (sortType === 'asc') {
      return originalArray.sort((a, b) => {
        if (a.strDrink > b.strDrink) { return 1; }
        if (a.strDrink < b.strDrink) { return -1; }
        return 0;
      });
    }
    if (sortType === 'desc') {
      return originalArray.sort((a, b) => {
        if (a.strDrink > b.strDrink) { return -1; }
        if (a.strDrink < b.strDrink) { return 1; }
        return 0;
      });
    }
  }

}
