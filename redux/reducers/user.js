const initialstate={
	currentUser: null
}
export const user=(state=initialstate, action)=>{
	return {
		...state,
		currentUser: action.currentUser
	}
}
export default user;