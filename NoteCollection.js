class Scale {
  constructor(notes, quality, accidentalType) {
    this.notes = notes;
    this.root = this.notes[0];
    this.quality = quality;

    this.name = this.root.name + ' ' + this.quality;

    this.accidentalType = accidentalType;
    this.accidentals = [];

    for (var i = 0; i < this.notes.length; i++) {
      var n = this.notes[i];

      // if it's accidental, label correctly
      if (this.accidentalType === 'flat') {
        this.notes[i] = Note.makeFlatNote(n);
        if (n.flat) this.accidentals.push(n);
      } else if (this.accidentalType === 'sharp') {
        this.notes[i] = Note.makeSharpNote(n);
        if (n.sharp) this.accidentals.push(n);
      }
    }
  }

  nextNote(note) {
    var idx = this.notes.indexOf(note);

    if (idx >= this.notes.length-1) {
      return this.notes[0];
    } else {
      return this.notes[idx+1];
    }
  }

  prevNote(note) {
    var idx = this.notes.indexOf(note);

    if (idx == 0) {
      return this.notes[this.notes.length];
    } else {
      return this.notes[0];
    }
  }

  containsNote(note) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].note === note.note) {
        return true;
      }
    }
    return false;
  }

  getNoteIndex(note) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].note === note.note) {
        return i;
      }
    }
    return -1;
  }

  asStr() {
    var result = "";

    for (var i = 0; i < this.notes.length; i++) {
      result = result.concat(" " + this.notes[i].name);
    }

    return result;
  }
}

class Chord {
  constructor(notes, quality, accidentalType) {
    this.notes = notes;
    this.root = this.notes[0];
    this.quality = quality;

    this.name = this.root.name + ' ' + this.quality;
    this.accidentalType = accidentalType;

    for (var i = 0; i < this.notes.length; i++) {
      var n = this.notes[i];

      // if it's accidental, label correctly
      if (this.accidentalType === 'flat') {
        this.notes[i] = Note.makeFlatNote(n);
      } else if (this.accidentalType === 'sharp') {
        this.notes[i] = Note.makeSharpNote(n);
      }
    }
  }

  asStr() {
    var result = "";

    for (var i = 0; i < this.notes.length; i++) {
      result = result.concat(" " + this.notes[i].name);
    }

    return result;
  }
}
