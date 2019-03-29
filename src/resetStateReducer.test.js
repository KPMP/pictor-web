import { resetStateReducer } from './resetStateReducer';
import actionNames from './actions/actionNames';
import loadedState from './initialState';

describe('resetStateReducer', () => {
	it('should reset to initial state when correct action', () => {
		let action = {
			type: actionNames.RESET_STATE
		}
		let newState = resetStateReducer({}, action);
		expect(newState).toEqual(loadedState);
	});
	
	it('should keep the original state when different action', () => {
		let action = {
				type: "SOMETHING ELSE"
			}
			let newState = resetStateReducer({"key": "value"}, action);
			expect(newState).toEqual({"key": "value"});
	});
	
});