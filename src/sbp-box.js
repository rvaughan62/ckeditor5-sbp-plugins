import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SbpRecommendationBoxEditing from './sbp-box-editing';
import SbpRecommendationBoxUI from './sbp-box-ui';

export default class SbpRecommendationBox extends Plugin {
	static get requires() {
		return [ SbpRecommendationBoxEditing, SbpRecommendationBoxUI ];
	}
}
