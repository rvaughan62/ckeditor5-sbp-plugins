import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertSbpAuthorsNoteBoxCommand from './sbp-insert-author-box-command';

export default class SbpAuthorsNoteBoxEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		console.log( 'SbpAuthorsNoteBoxEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertSbpAuthorsNoteBox', new InsertSbpAuthorsNoteBoxCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'sbpAuthorsNoteBox', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		} );

		schema.register( 'sbpAuthorsNoteBoxEntry', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'sbpAuthorsNoteBox',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'sbpAuthorsNoteBoxEntry' ) && childDefinition.name == 'sbpAuthorsNoteBox' ) {
				return false;
			}
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// <sbpAuthorsNoteBox> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'sbpAuthorsNoteBox',
			view: {
				name: 'section',
				classes: 'sbp-authors-note-author-box'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'sbpAuthorsNoteBox',
			view: {
				name: 'section',
				classes: 'sbp-authors-note-author-box'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'sbpAuthorsNoteBox',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement( 'section', { class: 'sbp-authors-note-author-box' } );

				return toWidget( section, viewWriter, { label: 'AuthorsNote:' } );
			}
		} );

		// <sbpAuthorsNoteBoxEntry> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'sbpAuthorsNoteBoxEntry',
			view: {
				name: 'div',
				classes: 'sbp-authors-note-author-box-description'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'sbpAuthorsNoteBoxEntry',
			view: {
				name: 'div',
				classes: 'sbp-authors-note-author-box-description'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'sbpAuthorsNoteBoxEntry',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'sbp-authors-note-author-box-description' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}