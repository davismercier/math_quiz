var question1 = new Question();

question1.text = "Factor the following quadratic equation";

var a = get_coefficient(-5,5);
var b = get_coefficient(-5,5);
var c = get_coefficient(-5,5);
var d = get_coefficient(-5,5);

var a_1 = a*c;
var b_1 = a*d + b*c;
var c_1 = b*d;


question1.equation = get_display([a_1, b_1, c_1],);

var cf1 = get_gcf([a,b]);
var cf2 = get_gcf([c,d]);

if (a < 0) {
  cf1 = -1*cf1;
}

if (c < 0) {
  cf2 = -1*cf2;
}

var lc = cf1*cf2;

if (lc != 1) {
  question1.answer = lc + "(" + get_display([a/cf1, b/cf1]) + ")(" + get_display([c/cf2, d/cf2]) + ")";
  } else {
  question1.answer = "(" + get_display([a/cf1, b/cf1]) + ")(" + get_display([c/cf2, d/cf2]) + ")";
  }

console.log(question1.answer);


question1.checkAnswer = function(answer) {
  var user_answer = factored_to_standard_polynomial(answer);

  var correct = true;
  
  if (a_1 != user_answer[0]) {
    correct = false;
  }  
  
  if (b_1 != user_answer[1]) {
    correct = false;
  } 
  
  if (c_1 != user_answer[2]) {
    correct = false;
  } 
  
  if (correct === true) {
    console.log("Nice Job!");
  } else {
    console.log("Try Again");
  }
}




