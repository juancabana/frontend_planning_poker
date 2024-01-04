import { ShortNamePipe } from './short-name.pipe';

describe('ShortNamePipe', () => {
  let pipe: ShortNamePipe;

  beforeEach(() => {
    pipe = new ShortNamePipe();
  });

  it('should remove spaces and return the first two characters in uppercase', () => {
    const result = pipe.transform('j uan');
    expect(result).toEqual('JU');
  });

  it('should remove spaces and return the first two characters in uppercase', () => {
    const result = pipe.transform('B rIX');
    expect(result).toEqual('BR');
  });

  it('should return the first two characters in uppercase', () => {
    const result = pipe.transform('olixx');
    expect(result).toEqual('OL');
  });
});
