class AnswerInterface {
  constructor(answers) {
    this.buttons = [];
    this.buttonPositions = [createVector(165, 200), createVector(365, 200), createVector(165, 400), createVector(365, 400)];
    AnswerInterface.shuffle(this.buttonPositions);

    this.answers = answers;

    for (var i = 0; i < 4; i++) {
      this.buttons.push(createButton(answers[i]));
      this.buttons[i].position(this.buttonPositions[i].x, this.buttonPositions[i].y);
      this.buttons[i].style('background-color', color(255,255,153)); // set color
      this.buttons[i].size(100, 50); // set size
      this.buttons[i].style('text-align', 'center'); // center text
      this.buttons[i].style('border-radius', '8px'); // round corners
    }

    this.buttons[0].mousePressed(clickCorrectAnswer);
    this.buttons[1].mousePressed(clickWrongAnswer);
    this.buttons[2].mousePressed(clickWrongAnswer);
    this.buttons[3].mousePressed(clickWrongAnswer);
  }

  changeButtonText(i, newText) {
    this.buttons[i].remove();
    this.buttons[i] = createButton(newText);

    this.buttons[i].style('background-color', color(255,255,153)); // set color
    this.buttons[i].size(100, 50); // set size
    this.buttons[i].style('text-align', 'center'); // center text
    this.buttons[i].style('border-radius', '8px'); // round corners

    this.buttons[i].position(this.buttonPositions[i].x, this.buttonPositions[i].y);

    if (i != 0) {
      this.buttons[i].mousePressed(clickWrongAnswer);
    } else if (i === 0) {
      this.buttons[i].mousePressed(clickCorrectAnswer);
    }

    this.answers[i] = newText;
  }

  updateAnswers(answers) {
    AnswerInterface.shuffle(this.buttonPositions);

    for (var i = 0; i < 4; i++) {
      this.changeButtonText(i, answers[i]);
    }
  }

  static shuffle(positions) {
    for (var i = 0; i < 10; i++) {
      var pos1 = random([0,1,2,3]);
      var pos2 = random([0,1,2,3]);

      var tmp = positions[pos1];
      positions[pos1] = positions[pos2];
      positions[pos2] = tmp;
    }
  }
}

function clickWrongAnswer() {
  answer(false);
}

function clickCorrectAnswer() {
  answer(true);
}
