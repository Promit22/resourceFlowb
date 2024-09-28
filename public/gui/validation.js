/*function isValid(m, k, t, l, i) {
  if (m === 'POST') {
    if (k && t && l) {
      return true;
    }
    return false;
  }
 if (m === 'PUT') {
    if (k) {
      return true;
    }
    return false;
  }
}

let v = isValid('POST', 'hejemd', 'hujubuju');
console.log(v);*/
function test(a, b) {
  return [a,
    b];
}

console.log(test('A', 'B', 'C'));