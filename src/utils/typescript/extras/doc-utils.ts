import { mathRandom } from "@ts-natives/math/math-utils";

class DocUtils {


  static randomCnpj() {
    const nums: number[] = [
      1,0,0,0,
      ...Array.from({ length: 8 }, (): number => mathRandom(0, 9))
    ];
    let d1: number = 0;
    let d2: number = 0;
    nums.forEach((num: number, i: number): void =>{
      let value: number = i+2;
      if (value > 9) {
        value -= 8;
      }
      d1 += num*value;
    });
    d1 = 11 - ( d1%11 );
    if (d1>=10) d1 = 0;
    nums.unshift(d1)
    nums.forEach((num: number, i: number): void =>{
      let value: number = i+2;
      if (value > 9) {
        value -= 8;
      }
      d2 += num*value;
    });
    d2 = 11 - ( d2%11 );
    if (d2>=10) d2 = 0;
    nums.unshift(d2)
    nums.reverse()
    return nums.join('')
  }
}

export {
  DocUtils
}