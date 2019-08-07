
const initialstate = {}

export default function (state = initialstate, action) {

    switch (action.type) {
        case "getCategoryList":
            return {
                ...state,
                Lists: action.List,
                count: action.count
            }
            // state = {
            //     ...state,
            //     Lists: action.List,
            //     count: action.count
            // }
            break;

        case "GET_Category_SEARCH_LISTS":

            state = {
                ...state,
                Lists: action.lists,
                count: action.count,

            }
            break;


    }
    return state;
}