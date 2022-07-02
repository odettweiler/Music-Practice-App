var possibleQuestions = ['interval', 'semitone', 'key', 'fifths', 'relativekey', 'chord', 'root', 'transpose'];

var possibleNotes = ['A', 'A#/Bb', 'B/Cb', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
var possibleNoteNames = ['A', 'A#', 'Bb', 'B', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'];
var possibleIntervals = ['perfect unison', 'minor second', 'major second', 'minor third', 'major third', 'perfect fourth', 'tritone',
        'perfect fifth', 'minor sixth', 'major sixth', 'minor seventh', 'major seventh', 'perfect octave'];
var possibleKeyTypes = ['major', 'natural minor', 'harmonic minor'];

var font;
var score;
var numCorrect = 0;
var questionsAnswered = 0;
var corrTimer = 0;
var incTimer = 0;
var fadeSpeed = 5;

var displayQType = false;
var displayCorrectAnswer = false;

var qData;
var interface;

function setup() {
    var canvas = createCanvas(600, 600);
    score = str(numCorrect + "/" + questionsAnswered);
    font = loadFont('assets/Avenir-LT-Std-45-Book_5171.ttf')

    // testing
    qData = QuestionData.genNewQuestion();
    interface = new AnswerInterface(getPossibleAnswers(qData));
}

function draw() {
    background(incTimer, corrTimer, 0, 255);
    stroke(255);

    if (incTimer > 0) incTimer -= 5;
    if (corrTimer > 0) corrTimer -= 5;

    drawInfo(qData);
}

// question functions

function drawInfo(data) {
  // draw the info to the screen using text based on the question
  textSize(20);
  textFont(font);
  textAlign(CENTER);

  switch(data.type) {
    case 'interval':
      text("What is the interval between " + data.note1.name + " and " + data.note2.name + "?", width/2, 30);
      if (displayCorrectAnswer) text(data.intervalName, width/2, 60);
      break;
    case 'semitone':
      if (data.displayMode == 1) {
        text("Convert from semitones to interval: " + data.semitones, width/2, 30);
        if (displayCorrectAnswer) text(data.intervalName, width/2, 60);
      } else {
        text("Convert interval to semitones: " + data.intervalName, width/2, 30);
        if (displayCorrectAnswer) text(data.semitones, width/2, 60);
      }
      break;
    case 'key':
      text("Which scale is this?", width/2, 30);
      text(data.scale.asStr(), width/2, 60);
      if (displayCorrectAnswer) text(data.scale.name + " scale", width/2, 90);
      break;
    case 'fifths':
      text("Which note is a fifth above " + data.note1.name + "?", width/2, 30);
      if (displayCorrectAnswer) text(data.note2.name, width/2, 60);
      break;
    case 'relativekey':
      if (data.displayMode === 1) {
        text("Relative minor of " + data.majScale.name + " scale?", width/2, 30);
        if (displayCorrectAnswer) text(data.minScale.name + " scale", width/2, 60);
      } else {
        text("Relative major of " + data.minScale.name + " scale?", width/2, 30);
        if (displayCorrectAnswer) text(data.majScale.name + " scale", width/2, 60);
      }
      break;
    case 'chord':
      text("What is this chord?", width/2, 30);
      text(data.chord.asStr(), width/2, 60);
      if (displayCorrectAnswer) text(data.chord.name + " chord", width/2, 90);
      break;
    case 'root':
      text("In " + data.key.name + ", what's the quality of the " + data.root.name + " chord?", width/2, 30);
      if (displayCorrectAnswer) text(data.chord.quality, width/2, 60);
      break;
    case 'transpose':
      text("Transpose " + data.note1.name + " from Key 1 to Key 2.", width/2, 30);
      text("Key 1: " + data.key1.name, width/2, 60);
      text("Key 2: " + data.key2.name, width/2, 90);
      if (displayCorrectAnswer) text(data.note2.name, width/2, 120);
    default:
      break;
  }

  if (displayQType) {
    text(data.type, width/2, height-30);
  }
  text(score, 40, height-40);

  fill(0, 102, 153);
  fill(255);
}

function getCorrectAnswer(data) {
  // draw multiple choice options based on which question type it is
  switch(data.type) {
    case 'interval':
      return data.intervalName;
      break;
    case 'semitone':
      if (data.displayMode === 1) {
        return data.intervalName;
      } else {
        return data.semitones;
      }
      break;
    case 'key':
       return data.scale.name;
       break;
    case 'fifths':
      return data.note2.name;
      break;
    case 'relativekey':
      if (data.displayMode === 1) {
        return data.minScale.name;
      } else {
        return data.majScale.name;
      }
      break;
    case 'chord':
      return data.chord.name;
      break;
    case 'root':
      return data.chord.quality;
      break;
    case 'transpose':
      return data.note2.name;
      break;
    default:
      return;
      break;
  }
}

function getPossibleAnswers(data) {
  // get possible multiple choice answers based on which question type it is
  var answers = [getCorrectAnswer(data), '', '', ''];

  switch(data.type) {
    case 'interval':
      var count = 1;
      while (count < 4) {
        var answer = getRandomIntervalName();
        if (!answers.includes(answer)) {
          answers[count] = answer;
          count++;
        } else {
          continue;
        }
      }
      break;
    case 'semitone':
      var count = 1;
      while (count < 4) {
        if (data.displayMode == 1) {
          var answer = getRandomIntervalName();
          if (!answers.includes(answer)) {
            answers[count] = answer;
            count++;
          } else {
            continue;
          }
        } else if (data.displayMode == 2) {
          var answer = getRandomInterval();
          if (!answers.includes(answer)) {
            answers[count] = answer;
            count++;
          } else {
            continue;
          }
        }
      }
      break;
    case 'key':
      var counter = 1;
      while (answers[counter] === '' && counter < 3) {
        var randAnswer = genScale(data.scale.root.name, getRandomKeyType()).name;
        if (!answers.includes(randAnswer)) {
          answers[counter] = randAnswer;
          counter++;
        }
      }

      answers[3] = '';

      while (answers[3] === '') {
        var randAnswer = genScale(getRandomKeyRoot().name, getRandomKeyType()).name;
        if (!answers.includes(randAnswer)) {
          answers[3] = randAnswer;
        }
      }
      break;
    case 'fifths':
      answers[1] = Note.above(answers[0]);
      answers[2] = Note.below(answers[0]);

      var randAnswer = answers[1];
      while (answers.includes(randAnswer)) {
        randAnswer = getRandomKeyRoot().name;
      }

      answers[3] = randAnswer;

      break;
    case 'relativekey':
      var counter = 1;
      var keyType;

      if (data.displayMode === 1) {
        keyType = 'natural minor';
      } else {
        keyType = 'major';
      }

      answers[1] = '';
      answers[2] = '';
      answers[3] = '';

      while (answers[counter] === '' && counter < 4) {
        var randAnswer = genScale(getRandomKeyRoot().name, keyType).name;
        if (!answers.includes(randAnswer)) {
          answers[counter] = randAnswer;
          counter++;
        }
      }
      break;
    case 'chord':
      var counter = 1;
      var keyType;

      answers[1] = '';
      answers[2] = '';
      answers[3] = '';

      while (answers[counter] === '' && counter < 4) {
        var randAnswer = createChord(data.chord.root.name, getRandomChordType()).name;
        if (!answers.includes(randAnswer)) {
          answers[counter] = randAnswer;
          counter++;
        }
      }
      break
    case 'root':
      if (getCorrectAnswer(data) === 'minor') {
        answers[1] = 'major';
        answers[2] = 'augmented';
        answers[3] = 'diminished';
      } else if (getCorrectAnswer(data) === 'major') {
        answers[1] = 'minor';
        answers[2] = 'augmented';
        answers[3] = 'diminished';
      } else if (getCorrectAnswer(data) === 'augmented') {
        answers[1] = 'major';
        answers[2] = 'minor';
        answers[3] = 'diminished';
      } else if (getCorrectAnswer(data) === 'diminished') {
        answers[1] = 'major';
        answers[2] = 'augmented';
        answers[3] = 'minor';
      }
      break;
    case 'transpose':
      answers[1] = Note.above(data.note1.note);
      answers[2] = Note.below(data.note1.note);
      answers[3] = '';

      var randAnswer = getRandomNote().name;
      while(answers[3] === '') {
        if (answers.includes(randAnswer)) {
          randAnswer = getRandomNote().name;
        } else {
          answers[3] = randAnswer;
        }
      }
      break;
    default:
      answers = [getCorrectAnswer(data), 'answer', 'answer', 'answer'];
      break;
  }

  return answers;
}

function answer(correct) {
  if (correct) {
    numCorrect++;
    corrTimer = 255;
    incTimer = 0;
  } else {
    incTimer = 255;
    corrTimer = 0;
  }
  questionsAnswered++;
  score = str(numCorrect + "/" + questionsAnswered);

  qData = QuestionData.genNewQuestion();
  interface.updateAnswers(getPossibleAnswers(qData));
}
