import { AverageFormatPipe } from './average-format.pipe';

describe('AverageFormatPipe', () => {
  const pipe = new AverageFormatPipe();

  it('transform: should aproximate', () => {
    const result = pipe.transform(1.666666)
    expect(result).toBe('1,67');
  });
});
