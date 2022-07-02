class Note {
  constructor(note) {
    this.note = note;
    this.flat = false;
    this.sharp = false;
    this.name;

    switch (this.note) {
      case 'B#':
        this.note = 'C';
        this.sharp = true;
        break;
      case 'Cb':
        this.note = 'B';
        this.flat = true;
        break;
      case 'Bb':
        this.note = 'A#';
        this.flat = true;
        break;
      case 'A#':
        this.sharp = true;
        break;
      case 'Db':
        this.note = 'C#';
        this.flat = true;
        break;
      case 'C#':
        this.sharp = true;
        break;
      case 'Eb':
        this.note = 'D#';
        this.flat = true;
        break;
      case 'E#':
        this.note = 'F';
        this.sharp = true;
        break;
      case 'D#':
        this.sharp = true;
        break;
      case 'Gb':
        this.note = 'F#';
        this.flat = true;
        break;
      case 'F#':
        this.sharp = true;
        break;
      case 'Ab':
        this.note = 'G#';
        this.flat = true;
        break;
      case 'G#':
        this.sharp = true;
        break;
      default:
        this.flat = false;
        this.sharp = false;
        break;
    }

    if (this.flat) {
      this.name = Note.above(this.note) + "b";
    } else if (this.sharp) {
      this.name = Note.below(this.note) + "#";
    } else {
      this.name = this.note;
    }
  }

  static above(note) {
    switch (note) {
      case 'A':
        return 'A#';
        break;
      case 'A#':
        return 'B';
        break;
      case 'B':
        return 'C';
        break;
      case 'C':
        return 'C#';
        break;
      case 'C#':
        return 'D';
        break;
      case 'D':
        return 'D#';
        break;
      case 'D#':
        return 'E';
        break;
      case 'E':
        return 'F';
        break;
      case 'F':
        return 'F#';
        break;
      case 'F#':
        return 'G';
        break;
      case 'G':
        return 'G#';
        break;
      case 'G#':
        return 'A';
        break;
    }
  }

  static below(note) {
    switch (note) {
      case 'A':
        return 'G#';
        break;
      case 'G#':
        return 'G';
        break;
      case 'G':
        return 'F#';
        break;
      case 'F#':
        return 'F';
        break;
      case 'F':
        return 'E';
        break;
      case 'E':
        return 'D#';
        break;
      case 'D#':
        return 'D';
        break;
      case 'D':
        return 'C#';
        break;
      case 'C#':
        return 'C';
        break;
      case 'C':
        return 'B';
        break;
      case 'B':
        return 'A#';
        break;
      case 'A#':
        return 'A';
        break;
    }
  }

  static makeFlatNote(noteObj) {
    var name;
    if (noteObj.sharp == true || noteObj.note === 'E' || noteObj.note === 'B') name = Note.above(noteObj.note) + "b";
    else name = noteObj.name;

    return new Note(name);
  }

  static makeSharpNote(noteObj) {
    var name;
    if (noteObj.flat == true || noteObj.note === 'E' || noteObj.note === 'B') name = Note.below(noteObj.note) + "#";
    else name = noteObj.name;

    return new Note(noteObj.note);
  }
}
