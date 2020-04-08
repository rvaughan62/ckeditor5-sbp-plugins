import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertSbpRecommendationBoxCommand from './sbp-insert-box-command';

export default class SbpRecommendationBoxEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		console.log( 'SbpRecommendationBoxEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertSbpRecommendationBox', new InsertSbpRecommendationBoxCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'sbpRecommendationBox', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		} );

		schema.register( 'sbpRecommendationBoxTitle', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'sbpRecommendationBox',

			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: '$block'
		} );

		schema.register( 'sbpRecommendationBoxDescription', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'sbpRecommendationBox',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'sbpRecommendationBoxDescription' ) && childDefinition.name == 'sbpRecommendationBox' ) {
				return false;
			}
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// <sbpRecommendationBox> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'sbpRecommendationBox',
			view: {
				name: 'section',
				classes: 'sbp-recommendation-box'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'sbpRecommendationBox',
			view: {
				name: 'section',
				classes: 'sbp-recommendation-box'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'sbpRecommendationBox',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement( 'section', { class: 'sbp-recommendation-box' } );

				return toWidget( section, viewWriter, { label: 'Recommendation:' } );
			}
		} );

		// <sbpRecommendationBoxTitle> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'sbpRecommendationBoxTitle',
			view: {
				name: 'div',
				classes: 'sbp-recommendation-box-title'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'sbpRecommendationBoxTitle',
			view: {
				name: 'div',
				classes: 'sbp-recommendation-box-title'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'sbpRecommendationBoxTitle',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'sbp-recommendation-box-title' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );

		// <sbpRecommendationBoxDescription> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'sbpRecommendationBoxDescription',
			view: {
				name: 'div',
				classes: 'sbp-recommendation-box-description'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'sbpRecommendationBoxDescription',
			view: {
				name: 'div',
				classes: 'sbp-recommendation-box-description'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'sbpRecommendationBoxDescription',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'sbp-recommendation-box-description' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}