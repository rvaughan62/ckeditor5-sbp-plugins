import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SbpAuthorsNoteBoxEditing from './sbp-author-box-editing';
import SbpAuthorsNoteBoxUI from './sbp-author-box-ui';

export default class SbpAuthorsNoteBox extends Plugin {
	static get requires() {
		return [ SbpAuthorsNoteBoxEditing, SbpAuthorsNoteBoxUI ];
	}
}
