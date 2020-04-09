import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSbpAuthorsNoteBoxCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			// Insert <sbpAuthorsNoteBox>*</sbpAuthorsNoteBox> at the current selection position
			// in a way that will result in creating a valid model structure.
			const elem = createSbpAuthorsNoteBox( writer );
			this.editor.model.insertContent( elem );

            if ( elem.parent ) {
                writer.setSelection( elem, 'in' );
            }
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'sbpAuthorsNoteBox' );

		this.isEnabled = allowedIn !== null;
	}
}

function createSbpAuthorsNoteBox( writer ) {
	const sbpAuthorsNoteBox = writer.createElement( 'sbpAuthorsNoteBox' );
	const sbpAuthorsNoteBoxEntry = writer.createElement( 'sbpAuthorsNoteBoxEntry' );

	writer.append( sbpAuthorsNoteBoxEntry, sbpAuthorsNoteBox );

	// There must be at least one paragraph for the description to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement( 'paragraph', sbpAuthorsNoteBoxEntry );

	return sbpAuthorsNoteBox;
}