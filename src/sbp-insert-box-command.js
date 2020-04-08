import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSbpRecommendationBoxCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			// Insert <sbpRecommendationBox>*</sbpRecommendationBox> at the current selection position
			// in a way that will result in creating a valid model structure.
			this.editor.model.insertContent( createSbpRecommendationBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'sbpRecommendationBox' );

		this.isEnabled = allowedIn !== null;
	}
}

function createSbpRecommendationBox( writer ) {
	const sbpRecommendationBox = writer.createElement( 'sbpRecommendationBox' );
	const sbpRecommendationBoxTitle = writer.createElement( 'sbpRecommendationBoxTitle' );
	const sbpRecommendationBoxDescription = writer.createElement( 'sbpRecommendationBoxDescription' );

	writer.append( sbpRecommendationBoxTitle, sbpRecommendationBox );
	writer.append( sbpRecommendationBoxDescription, sbpRecommendationBox );
	writer.appendText( 'Recommendation:', sbpRecommendationBoxTitle );

	// There must be at least one paragraph for the description to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement( 'paragraph', sbpRecommendationBoxDescription );

	return sbpRecommendationBox;
}