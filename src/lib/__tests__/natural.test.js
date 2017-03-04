import faker from 'faker';
import natural from '../natural';

describe('natural library', () => {
  it('call natural', async () => {
    expect(natural('我可以幫忙寫前端')).toEqual(['me', 'can', 'frontend']);
    expect(natural('有人可以幫忙寫前端嗎？')).toEqual(['who', 'can', 'frontend']);
  });
});