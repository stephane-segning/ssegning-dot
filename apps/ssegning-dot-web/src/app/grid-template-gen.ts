export function gridTemplateGen(l: number) {
  let acc = '';
  for (let i = 0; i < l; i++) {
    if (i % 2 === 0) {
      acc += '20px ';
    } else {
      acc += '60px ';
    }
  }
  return acc;
}
