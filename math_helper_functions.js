//Generates a question class object

class Question {
  constructor(text, equation, answer) {
    this.text = text;
    this.equation = equation;
    this.answer = answer;
  }
}



//generates a random integer between -10 and 10; no zero

function get_coefficient(min, max) {
  var range = max - min;
  var coefficient = 0;
  
  while(coefficient === 0) {
    coefficient = Math.ceil(Math.random()*range) + min;
  }
  return coefficient;
}  



//takes coefficient array and returns proper display string for polynomial
function get_display(array_of_coefficients) {
  
  var string_to_return = "";
  var degree = array_of_coefficients.length - 1;
  var i = 0;
  
  //get leading term
  if (degree === 1) {
    if (array_of_coefficients[i] > 1) {
      string_to_return += array_of_coefficients[i] + "x";
    } else if (array_of_coefficients[i] === 1) {
      string_to_return += "x";
    } else if (array_of_coefficients[i] === -1) {
      string_to_return += "-x";
    } else if (array_of_coefficients[i] < -1) {
      string_to_return += array_of_coefficients[i] + "x";
    }
  } else if (degree > 1) {
    if (array_of_coefficients[i] > 1) {
      string_to_return += array_of_coefficients[i] + "x^" + degree;
    } else if (array_of_coefficients[i] === 1) {
      string_to_return += "x^" + degree;
    } else if (array_of_coefficients[i] === -1) {
      string_to_return += "-x^" + degree;
    } else if (array_of_coefficients[i] < -1) {
      string_to_return += array_of_coefficients[i] + "x^" + degree;
    }
  }
  degree = degree - 1;
  i = i + 1;
  
  //get non-linear and non-constant terms
  while (degree > 1) {
    if (array_of_coefficients[i] > 1) {
      string_to_return += "+" + array_of_coefficients[i] + "x^" + degree;
    } else if (array_of_coefficients[i] === 1) {
      string_to_return += "+x^" + degree;
    } else if (array_of_coefficients[i] === 0) {
      string_to_return += "";
    } else if (array_of_coefficients[i] === -1) {
      string_to_return += "-x^" + degree;
    } else if (array_of_coefficients[i] < -1) {
      string_to_return += array_of_coefficients[i] + "x^" + degree;
    }
    degree = degree - 1;
    i = i + 1;
  }
  
  //get linear term (if not already processed)
  if (degree === 1) {
    if (array_of_coefficients[i] > 1) {
      string_to_return += "+" + array_of_coefficients[i] + "x";
    } else if (array_of_coefficients[i] === 1) {
      string_to_return += "+x";
    } else if (array_of_coefficients[i] === 0) {
      string_to_return += "";
    } else if (array_of_coefficients[i] === -1) {
      string_to_return += "-x";
    } else if (array_of_coefficients[i] < -1) {
      string_to_return += array_of_coefficients[i] + "x";
    }
  degree = degree - 1;
  i = i + 1;
  }
  
//get constant term
  if (array_of_coefficients[i] > 0) {
    string_to_return += "+" + array_of_coefficients[i];
  } else if (array_of_coefficients[i] === 0) {
    string_to_return += "";
  } else if (array_of_coefficients[i] < 0) {
    string_to_return += array_of_coefficients[i];
  }
  return string_to_return;
}



//check for common factor (2 to 100) of array of numbers; return gcf

function get_gcf(array) {
  var gcf = 1;
  
  for (var i = 2; i < 100; i++) {
    var x;
    var T_F = false;
    for (x of array) {
      if (x%i === 0) {
         T_F = true;
      } else {
         T_F = false;
         break;
      }
    }
    if (T_F === true) {
        gcf = i;
    }
  }
  return(gcf);
}


