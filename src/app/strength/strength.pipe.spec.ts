import {StrengthPipe} from "./strength.pipe";

describe('Test of strength pipe', () => {

  let pipeObj;
  let strengthPipe;

  beforeEach(() => {
    pipeObj = {};
    strengthPipe = new StrengthPipe();
  });

  it('should be weak if less then 10', () => {
    pipeObj.value = '9';
    let s = strengthPipe.transform(pipeObj.value);
    expect(s).toBe( pipeObj.value + " (weak)");
  })

  it('should be strong if 10 to 20', () => {
    pipeObj.value = '15';
    let s = strengthPipe.transform(pipeObj.value);
    expect(s).toBe( pipeObj.value + " (strong)");
  })

  it('should be unbelievable if greater then 20', () => {
    //how you would normally do this and no before etc necessary for something this easy.
    expect(strengthPipe.transform('25')).toBe(  "25 (unbelievable)");
  })

})






// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({
//   name: 'strength'
// })
// export class StrengthPipe implements PipeTransform {
//   transform(value: number): string {
//     if(value < 10) {
//       return value + " (weak)";
//     } else if(value >= 10 && value < 20) {
//       return value + " (strong)";
//     } else {
//       return value + " (unbelievable)";
//     }
//   }
// }
