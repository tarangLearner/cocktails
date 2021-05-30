import { SortFilterPipe } from './sort-filter.pipe';

describe('SortFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SortFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort filter when transform method called', () => {
    const pipe = new SortFilterPipe();
    const originalArray = [{
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
    const expectResult = [{
      idDrink: '123456',
      strDrink: 'Test-Test3',
      strDrinkThumb: 'https://www.test.com/test-test3.jpg'
    }, {
      idDrink: '12345',
      strDrink: 'Test-Test2',
      strDrinkThumb: 'https://www.test.com/test-test2.jpg'
    }, {
      idDrink: '1234',
      strDrink: 'Test-Test1',
      strDrinkThumb: 'https://www.test.com/test-test1.jpg'
    }, {
      idDrink: '123',
      strDrink: 'Test-Test',
      strDrinkThumb: 'https://www.test.com/test-test.jpg'
    }];
    const result = pipe.transform(originalArray, 'desc');
    expect(result).toEqual(expectResult);
  })
});
