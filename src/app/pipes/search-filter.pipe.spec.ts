import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return expected result', () => {
    const pipe = new SearchFilterPipe();
    const originalArray = [{
      idDrink: '123',
      strDrink: 'a',
      strDrinkThumb: 'https://www.test.com/test-test.jpg'
    }, {
      idDrink: '1234',
      strDrink: 'b',
      strDrinkThumb: 'https://www.test.com/test-test1.jpg'
    }, {
      idDrink: '12345',
      strDrink: 'c',
      strDrinkThumb: 'https://www.test.com/test-test2.jpg'
    }, {
      idDrink: '123456',
      strDrink: 'aa',
      strDrinkThumb: 'https://www.test.com/test-test3.jpg'
    }];
    const expectResult = [{
      idDrink: '123',
      strDrink: 'a',
      strDrinkThumb: 'https://www.test.com/test-test.jpg'
    }, {
      idDrink: '123456',
      strDrink: 'aa',
      strDrinkThumb: 'https://www.test.com/test-test3.jpg'
    }];
    const result = pipe.transform(originalArray, 'a');
    expect(result).toEqual(expectResult);
  });
});
