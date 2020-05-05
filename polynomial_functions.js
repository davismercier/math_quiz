//Pass in latex form of factored polynomial; returns array of standard form coefficients

function factored_to_standard_polynomial(answer)  {
  
  console.log(answer);
  
  //Replace "left" and "right" with "S" and then splits into array at each "S" (separates factors)
  var replace_left = (answer.indexOf("\\left(") != -1);

  while (replace_left === true) {
    answer = answer.replace("\\left(", "S");
    
    if (answer.indexOf("\\left(") === -1) {
      replace_left = false;
    }
  }
  
  var replace_right = (answer.indexOf("\\right)") != -1);
    
  while (replace_right === true) {
    answer = answer.replace("\\right)", "S");
    
    if (answer.indexOf("\\right)") === -1) {
      replace_right = false;
    } 
  }
  
  var array_with_empty_strings = (answer.split("S"));
  
  //Tests if an element of the new array is empty and if so ignores it
  var array_of_constants_and_factors = [];
  var x = 0
  
  for (var i = 0; i < array_with_empty_strings.length; i++) {
    if (array_with_empty_strings[i] != "") {
      array_of_constants_and_factors[x] = array_with_empty_strings[i];
      x += 1;
    }
  }
  
  //Tests if an array element is constant and assigns it to leading_coefficient; otherwise stays in array
  var leading_coefficient = 1;
  var array_of_factors = [];
  var y = 0;
  
  for (var i = 0; i < array_of_constants_and_factors.length; i++) {
    if (array_of_constants_and_factors[i].indexOf("x") === -1) {
      leading_coefficient *= array_of_constants_and_factors[i];
    } else {
      array_of_factors[y] = array_of_constants_and_factors[i];
      y += 1;
    }
  }

  //Splits each element into array of characters, replaces "+" with "+-" and then joins characters
  for (var i = 0; i < array_of_factors.length; i++) {
    var array_of_characters = array_of_factors[i].split("");
    
    for (var j = 0; j < array_of_characters.length; j++) {
      if (array_of_characters[j] === "-") {
        array_of_characters[j] = "+-";
      }
    }
    array_of_factors[i] = array_of_characters.join("");  
  }

  //Splits each element at "+" - creates array of arrays (each array contains each term of a factor)
  var array_of_terms = [];
  
  for (var i = 0; i < array_of_factors.length; i++) {
    array_of_terms[i] = array_of_factors[i].split("+");
  }
  
  
  //Breaks each term up into an object of LC and degree
  var array_of_LC_degree_objects = [];
  for (var i = 0; i < array_of_terms.length; i++) {
    array_of_LC_degree_objects[i] = [];
  }
  var m = 0;

  
  function Term(LC, degree) {
    this.LC = LC;
    this.degree = degree;
  }
  
  for (var i = 0; i < array_of_terms.length; i++) {
    var n = 0;
    for (var j = 0; j <array_of_terms[i].length; j++) {
      if(array_of_terms[i][j] != "") {
        if(array_of_terms[i][j].indexOf("x") === -1){
          var LC = parseInt(array_of_terms[i][j]);
          var degree = 0;
        } else if (array_of_terms[i][j].indexOf("x") === 0) {
          var LC = 1;
          if (array_of_terms[i][j].indexOf("^") === -1) {
            var degree = 1;
          } else {
            var degree = parseInt(array_of_terms[i][j].slice(array_of_terms[i][j].indexOf("^")+1, array_of_terms[i][j].indexOf("^")+2));
          }
        } else if (array_of_terms[i][j].indexOf("x") > 0) {
          if (array_of_terms[i][j].slice(0, array_of_terms[i][j].indexOf("x")) === "-") {
            var LC = -1;
          } else {
            var LC = parseInt(array_of_terms[i][j].slice(0, array_of_terms[i][j].indexOf("x")));
          }
          if (array_of_terms[i][j].indexOf("^") === -1) {
            var degree = 1;
          } else {
            var degree = parseInt(array_of_terms[i][j].slice(array_of_terms[i][j].indexOf("^")+1, array_of_terms[i][j].indexOf("^")+2));
          }
        }
      array_of_LC_degree_objects[m][n] = new Term(LC, degree);
      n += 1;  
      }
    }
    m += 1;
  }
  
  console.log(leading_coefficient);
  console.log(array_of_LC_degree_objects);
  
  var new_terms_to_multiply = [];
  var result_of_multiplication =[];
  new_terms_to_multiply[0] = new Term(1, 0);
  var h = 0;
  
  while (h < array_of_LC_degree_objects.length) {
    var t = 0;
    for (var i = 0; i < new_terms_to_multiply.length; i++) {
      for (var j = 0; j < array_of_LC_degree_objects[h].length; j++) {
        var multiplied_LC = new_terms_to_multiply[i].LC * array_of_LC_degree_objects[h][j].LC;
        var multiplied_degree = new_terms_to_multiply[i].degree + array_of_LC_degree_objects[h][j].degree;
        result_of_multiplication[t] = new Term(multiplied_LC, multiplied_degree);
        t += 1;
      }
    }
    h+=1;
    new_terms_to_multiply = result_of_multiplication;
    result_of_multiplication = [];
  }
  
  console.log(new_terms_to_multiply);

  var max_degree = 0;
  
  for (var i = 0; i < new_terms_to_multiply.length; i++) {
    if (max_degree < new_terms_to_multiply[i].degree) {
      max_degree = new_terms_to_multiply[i].degree;
    }
  }
  console.log(max_degree);
  

  var answer_array = [];
  var q = 0;

  while (max_degree > -1) {
    var temp_lc = 0;
    for (var i = 0; i<new_terms_to_multiply.length; i++) {
      if(new_terms_to_multiply[i].degree === max_degree) {
        temp_lc = temp_lc + new_terms_to_multiply[i].LC;
      }
    }
    answer_array[q] = temp_lc;
    q += 1;
    max_degree -= 1;
  }
  
  for (var i = 0; i <answer_array.length; i++) {
    answer_array[i] = answer_array[i]*leading_coefficient;
  }
  
  console.log(answer_array);
  
  return answer_array;
};