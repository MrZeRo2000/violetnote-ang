export class PasswordGenerator {

  public static randomPassword(len: number): string {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    len = Math.floor(len / 2) * 2
    if (len < 8) {
      len = 8
    }
    const length = len - 2
    const conso =  ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const vowel = ['a', 'e', 'i', 'o', 'u']
    const spchars = ['!', '@', '#', '$', '%', '^', '&', '-', '+', '?', '=', '~']
    let password = ''
    const max = length / 2;
    for (let i = 1; i<=max; i++) {
      password += conso[randomInt(0, conso.length - 1)]
      password += vowel[randomInt(0, vowel.length - 1)]
    }

    password = password.slice(0, password.length - 1) + spchars[randomInt(0, spchars.length - 1)]

    password += randomInt(10, 99)

    // cap first
    password = password[0].toUpperCase() + password.slice(1);

    // move sp and digit
    if (Math.random() < 0.8) {
      const pos = randomInt(1, len - 3);
      password = password.slice(0, pos) + password.slice(len - 3, len) + password.slice(pos, len - 3)
    }

    return password
  }
}
