import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { CocktailsCategoryModel } from '../models/cocktails-category.model';
import { MiniDrinkDetailApiModel } from '../models/mini-drink-detail.model';

import { BASE_URL, CocktailsService } from './cocktails.service';

describe('CocktailsService', () => {
  let service: CocktailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(CocktailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCocktailsGroupList', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be http get request when valid input passed', async(() => {
      service.getCocktailsGroupList('test').subscribe(() => {
        expect().nothing();
      });

      const expectedResponse: CocktailsCategoryModel = {
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

      const mockRequest = httpMock.expectOne({
        method: 'GET',
        url: `${BASE_URL}list.php?test=list`
      });

      mockRequest.flush(expectedResponse);
      httpMock.verify();
    }));

    it('should not make http get request when inValid input passed', async(() => {
      service.getCocktailsGroupList(null).subscribe((res) => {
        expect(res).toEqual(null);
      });

      const expectedResponse = [];

      const mockRequest = httpMock.expectNone({
        method: 'GET',
        url: `${BASE_URL}list.php?test=list`
      });

      httpMock.verify();
    }));
  });

  describe('getCocktailByGroup', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be http get request when valid input passed', async(() => {
      service.getCocktailByGroup('test', 'test1').subscribe(() => {
        expect().nothing();
      });

      const expectedResponse: MiniDrinkDetailApiModel = {
        drinks: [{
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
        }]
      };

      const mockRequest = httpMock.expectOne({
        method: 'GET',
        url: `${BASE_URL}filter.php?test=test1`
      });

      mockRequest.flush(expectedResponse);
      httpMock.verify();
    }));

    it('should not make http get request when inValid input passed', async(() => {
      service.getCocktailByGroup(null, 'test1').subscribe((res) => {
        expect(res).toEqual(null);
      });

      httpMock.expectNone({
        method: 'GET',
        url: `${BASE_URL}filter.php?null=test1`
      });

      httpMock.verify();
    }));

    it('should not make http get request when inValid input passed', async(() => {
      service.getCocktailByGroup(null, null).subscribe((res) => {
        expect(res).toEqual(null);
      });

      httpMock.expectNone({
        method: 'GET',
        url: `${BASE_URL}filter.php?null=null`
      });

      httpMock.verify();
    }));
  });
});
