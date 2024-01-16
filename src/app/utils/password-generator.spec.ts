import { PasswordGenerator } from './password-generator';

describe('PasswordGenerator', () => {
  it('should create an instance', () => {
    console.log('In PasswordGenerator test')
    expect(new PasswordGenerator()).toBeTruthy();

    for (let cycle = 0; cycle <= 1000; cycle ++) {
      for (let n of [8, 10, 12, 14]) {
        const p = PasswordGenerator.randomPassword(n);
        if (cycle < 10) {
          console.log(`Password for ${n} is ${p}`)
        }
        expect(p.length).toBe(n)
      }
    }

  });
});
