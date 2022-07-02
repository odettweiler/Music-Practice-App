class QuestionData {
  constructor(type) {
    this.type = type;
  }

  static genNewQuestion() {
    // generate a random question and return it
    var possibleQuestions = ['interval', 'semitone', 'key', 'fifths', 'relativekey', 'chord', 'root', 'transpose'];
    var questionType = random(possibleQuestions);

    switch (questionType) {
      case 'interval':
        return IntervalQuestionData.genQuestionData();
      case 'semitone':
        return SemitoneQuestionData.genQuestionData();
      case 'key':
        return KeyQuestionData.genQuestionData();
      case 'fifths':
        return FifthQuestionData.genQuestionData();
      case 'relativekey':
        return RelativeKeyQuestionData.genQuestionData();
      case 'chord':
        return ChordQuestionData.genQuestionData();
      case 'root':
        return RootQualityQuestionData.genQuestionData();
      case 'transpose':
        return TransposeQuestionData.genQuestionData();
      default:
        return null;
    }
  }
}

// naming intervals between certain notes
class IntervalQuestionData extends QuestionData {
  constructor(note1, note2) {
    super('interval');
    this.note1 = note1;
    this.note2 = note2;
    this.interval = getInterval(note1.note, note2.note);
    this.intervalName = getIntervalName(this.interval);
  }

  static genQuestionData() {
    return new IntervalQuestionData(getRandomNote(), getRandomNote());
  }
}

// converting from semitones to intervals and back
class SemitoneQuestionData extends QuestionData {
  constructor(interval) {
    super('semitone');
    this.displayMode = random([1, 2]);
    this.semitones = interval;
    this.intervalName = getIntervalName(this.semitones);
  }

  static genQuestionData() {
    return new SemitoneQuestionData(getRandomInterval());
  }
}

// key identification
class KeyQuestionData extends QuestionData {
  constructor(scale) {
    super('key');
    this.scale = scale;
  }

  static genQuestionData() {
    return new KeyQuestionData(genScale(getRandomNote().name, getRandomKeyType()));
  }
}

// memorization of perfect fifths
class FifthQuestionData extends QuestionData {
  constructor(note) {
    super('fifths');
    this.note1 = note;
    this.note2 = getNoteFromIntervalWithName(note.note, 'perfect fifth');
  }

  static genQuestionData() {
    return new FifthQuestionData(getRandomNote());
  }
}

// memorization of relative major and minor keys
class RelativeKeyQuestionData extends QuestionData {
  constructor(scale) {
    super('relativekey');
    this.displayMode = random([1, 2]);
    this.majScale = scale;
    this.minScale = genScale(getNoteFromIntervalWithName(scale.root.note, 'major sixth').note, 'natural minor');
  }

  static genQuestionData() {
    return new RelativeKeyQuestionData(majorScale(getRandomNote().note));
  }
}

// identification of chords
class ChordQuestionData extends QuestionData {
  constructor(chord) {
    super('chord');
    this.chord = chord;
  }

  static genQuestionData() {
    return new ChordQuestionData(genRandomChord());
  }
}

// identification of chord qualities given roots and key
class RootQualityQuestionData extends QuestionData {
  constructor(key, root) {
    super('root');
    this.key = key;
    this.root = root;
    this.chord = genChordInKey(root, key);
  }

  static genQuestionData() {
    return new RootQualityQuestionData(genRandomScale(), getRandomNote());
  }
}

class TransposeQuestionData extends QuestionData {
  constructor(key1, key2, note) {
    super('transpose');
    this.key1 = key1;
    this.key2 = key2;
    this.note1 = note;
    this.note2 = keyTranspose(key1, key2, this.note1);
  }

  static genQuestionData() {
    var key1 = genRandomScale();
    var key2 = genRandomScale();
    var note = getRandomNote();

    while(!key1.containsNote(note)) {
      note = getRandomNote();
    }

    return new TransposeQuestionData(key1, key2, note);
  }
}

// missing question types: transpose
