import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';


if (Meteor.isClient) {
  describe('NoteList', function() {

    it ('should render NoteList item for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(notes.length);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it ('should render NoteListEmptyItem if zero nodes', function() {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);

    });
  });
}
