var expect = require('chai').expect;

var SbpRecommendationBox = require('../src/sbp-box');
var SbpRecommendationBoxEditing = require('../src/sbp-box-editing');
var SbpRecommendationBoxUI = require('../src/sbp-box-ui');

describe( 'HorizontalLine', () => {
	it( 'should require HorizontalLineEditing and HorizontalLineUI', () => {
		expect( SbpRecommendationBox.requires ).to.deep.equal( [ SbpRecommendationBoxEditing, SbpRecommendationBoxUI ] );
	} );

	it( 'should be named', () => {
		expect( SbpRecommendationBox.pluginName ).to.equal( 'SbpRecommendationBox' );
	} );
} );
