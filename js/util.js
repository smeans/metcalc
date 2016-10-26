var ms = {
  "E": 18,
  "P": 15,
  "T": 12,
  "G": 9,
  "M": 6,
  "k": 3,
  "d": -1,
  "c": -2,
  "m": -3,
  "u": -6,
  "n": -9,
  "p": -12,
  "f": -15,
  "a": -18,
  "xa": 18,
  "peta": 15,
  "tera": 12,
  "giga": 9,
  "mega": 6,
  "kilo": 3,
  "deci": -1,
  "centi": -2,
  "milli": -3,
  "micro": -6,
  "nano": -9,
  "pico": -12,
  "femto": -15,
  "atto": -18
};

var msa = [{suffix:"", exp:0}];

for (var k in ms) {
  if (k.length > 1) {
    msa.push({suffix: k, exp:ms[k]});
  }
}

msa.sort(function (a, b) {
	return a.exp > b.exp ? 1 : -1;
});

function scaledNumber(n) {
	var na = Math.abs(n);
    var sv = {suffix: "", exp:0};

	if (na < Math.pow(10, msa[0].exp)) {
    	sv = msa[0];
    } else if (na > Math.pow(10, msa[msa.length-1].exp)) {
    	sv = msa[msa.length-1];
    } else {
    	var i = 0;

        while (i < msa.length-1) {
          var lv = Math.pow(10, msa[i].exp);
          var hv = Math.pow(10, msa[i+1].exp);

          if (na >= lv && na < hv) {
          	sv = msa[i];

            break;
          }

          i++;
        }
    }

    return {value: math.round((n/Math.pow(10, sv.exp)), 1).toString(), units:sv.suffix};
}
