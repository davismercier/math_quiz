var MQ = MathQuill.getInterface(2);


//Get text span from HTML, fill with text from question page      
var problem_text_span = document.getElementById('problem_text');
problem_text_span.innerHTML = question1.text;


//Get equation span from HTML, fill with equation (modified by MQ) from question page
var problem_equation_span = document.getElementById('problem_equation');
problem_equation_span.innerHTML = question1.equation;
MQ.StaticMath(problem_equation_span);

//Grabs answer Div       
var answer_div = document.getElementById('user_answer_div');


//Function that fills answer div with number of answer boxes based on counter
var answer_box_counter = 1;

var answer_span_array = [];

function fill_answer_div(answer_box_counter) {
  for (var i=0; i<answer_box_counter; i++) {
    answer_div.innerHTML += "<p><span id = 'user_answer_" + i + "'></span></p>";
  }
  for (var i = 0; i < answer_box_counter; i++) {
    answer_span_array[i] = MQ.MathField(document.getElementById("user_answer_" + i));
  }
}

//Gets latex form of answer from user and passes to polynomial function (adjust to general purpose!)

document.getElementById("check_answer").addEventListener("click", function() {
  var answer = answer_span_array[0].latex();
  question1.checkAnswer(answer);
});

//calls fill answer div function
fill_answer_div(answer_box_counter);


//increases answer counter
function add_answer() {
  answer_box_counter += 1;
  answer_div.innerHTML = "";
  fill_answer_div(answer_box_counter);
}


//decreases answer counter
function remove_answer() {
  answer_box_counter -= 1;
  answer_div.innerHTML = "";
  fill_answer_div(answer_box_counter);
}



//creates graph 
 var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-8, 8, 8, -8], axis: true});
 
 //creates variables to hold created points / graphs
 var p1;
 var p2;
 var li;
 var quad;
 
 //listens and adds points / curves on click
 document.getElementById("add_point").addEventListener("click", function () {
      p1 = b.create('point',[Math.floor(Math.random()*8),1], {name:'A',size:4});
      p2 = b.create('point',[Math.floor(Math.random()*8),5], {name:'B',size:4});
      p2.setProperty({fixed:true})
      li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});
      quad = b.create('functiongraph', [function(x){return (x-3)*(x+1);}]);
   }
 );
 
 //Gets coordinates of point p1 on button click
 document.getElementById("coordinates").addEventListener("click", function () {
   console.log("(" + p1.X() + "," + p1.Y() + ")");
 });



/* this calls checkAnswer function on every keystroke

var answerMathField1 = MQ.MathField(answerSpan1, {
  handlers: {
    edit: function() {
      var enteredMath1 = answerMathField1.latex(); // Get entered math in LaTeX format
      checkAnswer(enteredMath1);
      }
    }
});*/