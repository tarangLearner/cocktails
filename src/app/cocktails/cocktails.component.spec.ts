import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CocktailsComponent } from './cocktails.component';
import { SortFilterPipe } from '../pipes/sort-filter.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { CocktailsService, GroupList } from '../services/cocktails.service';
import { CocktailsCategoryModel } from '../models/cocktails-category.model';
import { defer, of } from 'rxjs';
import { MiniDrinkDetailModel } from '../models/mini-drink-detail.model';
import { FormsModule } from '@angular/forms';

describe('CocktailsComponent', () => {
  let component: CocktailsComponent;
  let fixture: ComponentFixture<CocktailsComponent>;
  let cocktailsServiceSpy: jasmine.SpyObj<CocktailsService>;
  let expectCocktailsGroup: CocktailsCategoryModel;
  let expectedMiniDrinkDetails: MiniDrinkDetailModel[];

  expectCocktailsGroup = {
    drinks: [{
      strCategory: 'Test'
    }, {
      strCategory: 'Test1'
    }, {
      strCategory: 'Test2'
    }, {
      strCategory: 'Test3'
    }]
  };

  expectedMiniDrinkDetails = [{
    idDrink: '123',
    strDrink: 'Test-Test',
    strDrinkThumb: 'https://www.test.com/test-test.jpg'
  }, {
    idDrink: '1234',
    strDrink: 'Test-Test1',
    strDrinkThumb: 'https://www.test.com/test-test1.jpg'
  }, {
    idDrink: '12345',
    strDrink: 'Test-Test2',
    strDrinkThumb: 'https://www.test.com/test-test2.jpg'
  }, {
    idDrink: '123456',
    strDrink: 'Test-Test3',
    strDrinkThumb: 'https://www.test.com/test-test3.jpg'
  }];

  cocktailsServiceSpy = jasmine.createSpyObj<CocktailsService>('cocktailsService', [
    'getCocktailsGroupList',
    'getCocktailByGroup'
  ]);

  cocktailsServiceSpy.getCocktailsGroupList.and.returnValue(of(expectCocktailsGroup));
  cocktailsServiceSpy.getCocktailByGroup.and.returnValue(of(expectedMiniDrinkDetails));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CocktailsComponent, SortFilterPipe, SearchFilterPipe],
      providers: [{
        provide: CocktailsService,
        useValue: cocktailsServiceSpy
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call #cocktailsGroupList method on load', () => {
      const cocktailsGroupListSpy = spyOn<any>(component, 'cocktailsGroupList');
      component.ngOnInit();
      expect(cocktailsGroupListSpy).toHaveBeenCalled();
    });

    describe('cocktailsGroupList', () => {
      it('should call #cocktailsService.getCocktailsGroupList method', () => {
        component.ngOnInit();
        expect(cocktailsServiceSpy.getCocktailsGroupList).toHaveBeenCalled();
      });

      it('should return error when service throws error', fakeAsync(() => {
        cocktailsServiceSpy.getCocktailsGroupList.and.returnValue(defer(() => Promise.reject(new Error('Test Error'))));
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.isError).toBeTruthy();
      }));

      it('should return error message when service throws error', fakeAsync(() => {
        cocktailsServiceSpy.getCocktailsGroupList.and.returnValue(defer(() => Promise.reject(new Error('Test Error'))));
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.errorMessage).toEqual('Test Error');
      }));
    })
  });

  describe('changeCategory', () => {
    let getCocktailsByGroupSpy: jasmine.Spy;
    beforeEach(() => {
      getCocktailsByGroupSpy = spyOn<any>(component, 'getCocktailsByGroup');
    });
    it('should call getCocktailsByGroup method', () => {
      component.changeCategory('Test');
      expect(getCocktailsByGroupSpy).toHaveBeenCalled();
    });

    it('should return selectedCategory value when getCocktailsByGroup method called', () => {
      component.changeCategory('Test1');
      expect(component.selectedCategory).toEqual('Test1');
    });
  });

  describe('changeSort', () => {
    it('should return sortTypeValue', () => {
      component.changeSort(' asc ');
      expect(component.sortTypeValue).toEqual('asc');
    });

    it('should return sortType', () => {
      component.changeSort(' desc ');
      expect(component.sortType).toEqual('Descending Order');
    });
  });
});
