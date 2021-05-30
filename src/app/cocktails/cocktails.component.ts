import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DrinkCategoryModel } from '../models/cocktails-category.model';
import { MiniDrinkDetailModel } from '../models/mini-drink-detail.model';
import { CocktailsService, GroupList } from '../services/cocktails.service';

export const DEFAULT_VALUE = 'Please select';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  public groupList = GroupList;
  public selectedCocktailsGroup: string = Object.keys(GroupList)[0];
  public groupListResponse: string[] = [];
  public selectedCategory: string = DEFAULT_VALUE;
  public miniDrinksDetail: MiniDrinkDetailModel[] = [];
  public searchByName: string = '';
  public sortType: string = 'Sort by Name';
  public sortTypeValue: string = 'no-change';
  public isLoading = false;
  public isError = false;
  public errorMessage = '';
  private selectedCocktailGroupValue: string = Object.values(GroupList)[0];

  constructor(private readonly cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.cocktailsGroupList(GroupList.Categories);
  }

  public changeGroup(selectedGroup: GroupList) {
    const objectEntry = Object.entries(selectedGroup);
    this.selectedCategory = DEFAULT_VALUE;
    this.selectedCocktailsGroup = objectEntry[0][1];
    this.selectedCocktailGroupValue = objectEntry[1][1];
    this.cocktailsGroupList(this.selectedCocktailGroupValue);
  }

  public changeCategory(category: string): void {
    this.selectedCategory = category;
    this.getCocktailsByGroup();
  }

  public changeSort(sortType: string): void {
    this.sortTypeValue = sortType.trim();
    this.sortType = this.sortTypeValue === 'asc' ? 'Ascending Order' : this.sortTypeValue === 'desc' ? 'Descending Order' : 'Sort by Name';
  }

  private cocktailsGroupList(groupValue: string): void {
    this.isError = false;
    this.isLoading = true;
    this.cocktailsService.getCocktailsGroupList(groupValue).subscribe((res) => {
      this.isLoading = false;
      const keyName = Object.keys(res.drinks[0]);
      this.groupListResponse = this.getFieldsValue(res.drinks, keyName[0]);
    }, (error: HttpErrorResponse) => {
      this.isError = true;
      this.errorMessage = error.message;
    });
  }

  private getFieldsValue(input: DrinkCategoryModel[], field: string): string[] {
    return input.map(function (o) {
      return o[field];
    });
  }

  private getCocktailsByGroup(): void {
    this.isError = false;
    this.isLoading = true;
    this.cocktailsService.getCocktailByGroup(this.selectedCocktailGroupValue, this.selectedCategory).subscribe((res) => {
      this.isLoading = false;
      this.miniDrinksDetail = res;
    }, (error: HttpErrorResponse) => {
      this.isError = true;
      this.errorMessage = error.message;
    });
  }

}
