/*
* Simple Arithmetics Grammar
* ==========================
*
* Accepts expressions like "2 * (3 + 4)" and computes their value.
*/
{
  function evalTree(n) {
    if (typeof n != 'object') {
      return n;
    }

    var lv = evalTree(n.left);
    var rv = evalTree(n.right);

    switch (n.atag) {
      case '+': return math.add(lv, rv);
      case '-': return math.subtract(lv, rv);
      case '*': return math.multiply(lv, rv);
      case '/': return math.divide(lv, rv);
    }

    console.log('evalTree() error: ' + JSON.stringify(n));
    return NaN;
  }
}

expression = a:additive { var v = evalTree(a); return {value:v, scaled:scaledNumber(v)}; }

additive
= first:multiplicative rest:(("+" / "-") multiplicative)+ {
  return rest.reduce(function(memo, curr) {
    return {atag: curr[0], left: memo, right: curr[1]};
  }, first);
}
/ multiplicative

multiplicative
= first:primary rest:(("*" / "/") primary)+ {
  return rest.reduce(function(memo, curr) {
    return {atag: curr[0], left: memo, right: curr[1]};
  }, first);
}
/ primary

primary
= number
/ "(" additive:additive ")" { return additive; }

number
= [0-9.]+ e:exp? { return parseFloat(text(), 10) * Math.pow(10, e ? e : 0); }

exp
= [a-zA-Z]+ { return text() in ms ? ms[text()] : 1; }

_ "whitespace"
= [ \t\n\r]*
