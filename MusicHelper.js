var possibleNotes = ['A', 'A#/Bb', 'B/Cb', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
var possibleScaleNotes = ['A', 'A#', 'Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'];
var possibleNoteNames = ['A', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'];
var possibleKeyNotes = ['A', 'Bb', 'B', 'Cb', 'C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab'];
var possibleIntervals = ['perfect unison', 'minor second', 'major second', 'minor third', 'major third', 'perfect fourth', 'tritone',
        'perfect fifth', 'minor sixth', 'major sixth', 'minor seventh', 'major seventh'];
var possibleKeyTypes = ['major', 'natural minor', 'harmonic minor'];
var possibleChordTypes = ['major', 'minor', 'augmented', 'diminished', 'major min7', 'major maj7', 'minor min7',
                          'minor maj7', 'sus4', 'sus2'];

function getInterval(note1, note2) {
  var next = new Note(note1);

  for (var i = 0; i < 12; i++) {
    if (next.note === note2) {
      return i;
    }
    next = new Note(Note.above(next.note));
  }

  return 0;
}

function getRandomNote() {
  var noteName = random(possibleNoteNames);
  return new Note(noteName);
}

function getRandomKeyRoot() {
  var noteName = random(possibleKeyNotes);
  return new Note(noteName);
}

function getRandomKeyType() {
  return random(possibleKeyTypes);
}

function getRandomInterval() {
  return int(random(12));
}

function getRandomIntervalName() {
  return getIntervalName(getRandomInterval());
}

function getIntervalName(semitones) {
  return possibleIntervals[semitones];
}

function getIntervalSemitones(name) {
  return possibleIntervals.indexOf(name);
}

function getNoteFromInterval(note, semitones) {
  var next = new Note(note);

  for (var i = 0; i < semitones; i++) {
    next = new Note(Note.above(next.note));
  }

  return next;
}

function getNoteFromIntervalWithName(note, interval) {
  return getNoteFromInterval(note, getIntervalSemitones(interval));
}

function genRandomScale() {
  return genScale(getRandomKeyRoot().name, getRandomKeyType());
}

function intervalTranspose(root1, root2, note) {
  var interval = getIntervalSemitones(root1, note);
  return getNoteFromInterval(interval);
}

function keyTranspose(key1, key2, note) {
  var index = key1.getNoteIndex(note);
  return key2.notes[index];
}

function getRandomChordType() {
  return random(possibleChordTypes);
}

function genChordInKey(root, scale) {
  var type;

  if (!scale.containsNote(getNoteFromIntervalWithName(root.note, 'perfect fifth'))) {
    if (scale.containsNote(getNoteFromIntervalWithName(root.note, 'minor sixth'))) {
      type = 'augmented';
    } else if (scale.containsNote(getNoteFromIntervalWithName(root.note, 'tritone'))) {
      type = 'diminished';
    }
  } else if (scale.containsNote(getNoteFromIntervalWithName(root.note, 'major third'))) {
    type = 'major';
  } else {
    type = 'minor';
  }

  return createChord(root, type);
}

function getChordTypeFromNotes(notes) {
  if (getInterval(notes[0], notes[2]) === 8) { // augmented fifth
    return 'augmented';
  } else if (getInterval(notes[0], notes[2]) === 6) { // diminished fifth
    return 'diminished';
  } else if (getInterval(notes[0], notes[1]) === 4) {
    // major third
    if (notes.length === 4) { // seventh chord
      if (getInterval(notes[0], notes[3]) === 11) { // major seventh
        return 'major maj7';
      } else if (getInterval(notes[0], notes[3]) === 10) { // minor seventh
        return 'major min7';
      }
    } else if (notes.length === 3) {
      return 'major';
    }
  } else if (getInterval(notes[0], notes[1]) === 3) {
    // minor third
    if (notes.length === 4) { // seventh chord
      if (getInterval(notes[0], notes[3]) === 11) { // major seventh
        return 'minor maj7';
      } else if (getInterval(notes[0], notes[3]) === 10) { // minor seventh
        return 'minor min7';
      }
    } else if (notes.length === 3) {
      return 'minor';
    }
  } else if (getInterval(notes[0], notes[1]) === 2) { // suspended second
    return 'sus2';
  } else if (getInterval(notes[0], notes[1]) === 5) { // suspended fourth
    return 'sus4';
  }
}

function genRandomChord() {
  return createChord(getRandomKeyRoot().name, getRandomChordType());
}

function genScale(root, type) {
  switch (type) {
    case 'major':
      return majorScale(root);
    case 'natural minor':
      return naturalMinorScale(root);
    case 'harmonic minor':
      return harmonicMinorScale(root);
  }
}

function majorScale(root) {
  var notes = [];
  notes.push(new Note(root));
  notes.push(getNoteFromIntervalWithName(root, 'major second'));
  notes.push(getNoteFromIntervalWithName(root, 'major third'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fourth'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fifth'));
  notes.push(getNoteFromIntervalWithName(root, 'major sixth'));
  notes.push(getNoteFromIntervalWithName(root, 'major seventh'));

  var accidentalType;

  if (root === 'D' || root === 'E' || root === 'A' || root === 'G' || root === 'B' || root === 'F#' || root === 'C#') {
    accidentalType = 'sharp';
  } else if (root === 'C') {
    accidentalType = 'none';
  } else {
    accidentalType = 'flat';
  }

  return new Scale(notes, "major", accidentalType);
}

function naturalMinorScale(root) {
  var notes = [];
  notes.push(new Note(root));
  notes.push(getNoteFromIntervalWithName(root, 'major second'));
  notes.push(getNoteFromIntervalWithName(root, 'minor third'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fourth'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fifth'));
  notes.push(getNoteFromIntervalWithName(root, 'minor sixth'));
  notes.push(getNoteFromIntervalWithName(root, 'minor seventh'));

  var accidentalType;

  if (root === 'D' || root === 'E' || root === 'A' || root === 'G' || root === 'B' || root === 'F#' || root === 'C#') {
    accidentalType = 'sharp';
  } else if (root === 'C') {
    accidentalType = 'none';
  } else {
    accidentalType = 'flat';
  }

  return new Scale(notes, "natural minor", accidentalType);
}

function harmonicMinorScale(root) {
  var notes = [];
  notes.push(new Note(root));
  notes.push(getNoteFromIntervalWithName(root, 'major second'));
  notes.push(getNoteFromIntervalWithName(root, 'minor third'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fourth'));
  notes.push(getNoteFromIntervalWithName(root, 'perfect fifth'));
  notes.push(getNoteFromIntervalWithName(root, 'minor sixth'));
  notes.push(getNoteFromIntervalWithName(root, 'major seventh'));

  var accidentalType;

  if (root === 'D' || root === 'E' || root === 'A' || root === 'G' || root === 'B' || root === 'F#' || root === 'C#') {
    accidentalType = 'sharp';
  } else if (root === 'C') {
    accidentalType = 'none';
  } else {
    accidentalType = 'flat';
  }

  return new Scale(notes, "harmonic minor", accidentalType);
}

function createChord(root, type) {
  var notes = [];
  notes.push(new Note(root));

  // add third/suspended note
  if (type === 'major' || type === 'major maj7' || type === 'major min7' || type === 'augmented') {
    notes.push(getNoteFromIntervalWithName(root, 'major third'));
  } else if (type === 'minor' || type === 'minor maj7' || type === 'minor min7') {
    notes.push(getNoteFromIntervalWithName(root, 'minor third'));
  } else if (type === 'sus2') {
    notes.push(getNoteFromIntervalWithName(root, 'major second'));
  } else if (type === 'sus4') {
    notes.push(getNoteFromIntervalWithName(root, 'perfect fourth'));
  }

  // add fifth
  if (type === 'diminshed') {
    notes.push(getNoteFromIntervalWithName(root, 'tritone'));
  } else if (type === 'augmented') {
    notes.push(getNoteFromIntervalWithName(root, 'minor sixth'));
  } else {
    notes.push(getNoteFromIntervalWithName(root, 'perfect fifth'));
  }

  if (type === 'major maj7' || type === 'minor maj7') {
    notes.push(getNoteFromIntervalWithName(root, 'major seventh'));
  } else if (type === 'major min7' || type === 'minor min7') {
    notes.push(getNoteFromIntervalWithName(root, 'minor seventh'));
  }

  var accidentalType;

  if (root === 'D' || root === 'E' || root === 'A' || root === 'G' || root === 'B' || root === 'F#' || root === 'C#') {
    accidentalType = 'sharp';
  } else if (root === 'C') {
    accidentalType = 'none';
  } else {
    accidentalType = 'flat';
  }

  return new Chord(notes, type, accidentalType);
}
