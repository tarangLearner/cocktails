import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CocktailsCategoryModel } from '../models/cocktails-category.model';
import { MiniDrinkDetailApiModel, MiniDrinkDetailModel } from '../models/mini-drink-detail.model';

export const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export enum GroupList {
  Categories = 'c',
  Glasses = 'g',
  Ingredients = 'i',
  Alcoholic = 'a'
}

@Injectable({
  providedIn: 'root'
})

export class CocktailsService {

  constructor(private readonly http: HttpClient) { }

  public getCocktailsGroupList(groupValue: string): Observable<CocktailsCategoryModel> {
    if (groupValue) {
      const url: string = `${BASE_URL}list.php?${groupValue}=list`;
      return this.http.get<CocktailsCategoryModel>(url);
    } else {
      return of(null);
    }

  }

  public getCocktailByGroup(groupValue: string, groupName: string): Observable<MiniDrinkDetailModel[]> {
    if (groupName && groupValue) {
      const url: string = `${BASE_URL}filter.php?${groupValue}=${groupName}`;
      return this.http.get<MiniDrinkDetailApiModel>(url).pipe(map((response) => response.drinks));
    } else {
      return of(null);
    }
  }
}
