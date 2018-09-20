'use strict';

const storage = require('../lib/storage/data-store');
const uuid = require('uuid/v1');

class Notes {
  constructor(title, content) {
    this.id = uuid();
    this.createdOn = this.lastUpdated = new Date();
    this.title = title;
    this.content = content;

  }

  save() {
    return storage.save(this);
  }

  static get(noteId) {
    return storage.get(noteId);
  }
}

module.exports = Notes;