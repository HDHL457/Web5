var templates = {};
var questionNumber = 0;
var testData;

$(document).ready(function(){
  templates.questionSingle = Handlebars.compile($("#template-question-single").html());
  templates.questionMultiple = Handlebars.compile($("#template-question-multiple").html());
  templates.questionFill = Handlebars.compile($("#template-question-fill").html());
  templates.test = Handlebars.compile($("#template-all").html());

  Handlebars.registerHelper('listQuestions', function(questions) {
    console.log("yooo");
    var result= "";
    for(var i=0;i<questions.length;i++){
      questionNumber++;
      questions[i].number = questionNumber;
      switch(questions[i].type){
        case "single":
          result += templates.questionSingle(questions[i]);
          break;
        case "multiple":
          result += templates.questionMultiple(questions[i]);
          break;
        case "fill":
          result += templates.questionFill(questions[i]);
          break;
        case "default":
          break;
      }
    }

    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper("inc", function(value, options)
  {
      return parseInt(value) + 1;
  });

  $.ajax({
    url: "/test",
    dataType: "json"
  }).done(function(data){
    testData = data;
    $("#content").html(templates.test(data));
  }).fail(function(err){
    console.log(err);
  });

  $("#content").on('submit', function(e){
    e.preventDefault();

    var answersAsJSON = $(this).serializeObject();

    for(var sectionIndex = 0; sectionIndex < testData["sections"].length; sectionIndex++){
      for(var partIndex = 0; partIndex < testData["sections"][sectionIndex]["parts"].length; partIndex++) {
        for(var questionIndex = 0; questionIndex < testData["sections"][sectionIndex]["parts"][partIndex]["questions"].length; questionIndex++) {
          var question = testData["sections"][sectionIndex]["parts"][partIndex]["questions"][questionIndex];
          question["correctAnswers"] = answersAsJSON[question.id + "_" + question.part + "_" + question.section + "_" + question.test];
          testData["sections"][sectionIndex]["parts"][partIndex]["questions"][questionIndex] = question;
        }
      }
    }

    $.ajax({
      url   : "/answer",
      data  : JSON.stringify(testData),
      type  : "post",
      contentType: "application/json",
    }).done(function(data){
      $("#content").html("<h1>Congratulation, you got " + data.result + "</h1>");
    }).fail(function(err){
      console.log(err);
    })
  });
});

$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = [this.value] || [];
    }
  });
  return o;
};
