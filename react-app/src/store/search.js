const SEARCH = '/search/search_result'

const getSearch =(result)=>({
    type:SEARCH,
    result

})

export const loadSearchResult = (input) => async (dispatch) => {
    const res = await fetch(`/api/search?q=${input}`);

    if(res.ok){
        const result = await res.json();
        console.log(result, " this is the result")
        dispatch(getSearch(result))
    }
}

const searchReducer = (state ={}, action) => {
    switch(action.type){
        case SEARCH:{
            console.log(action.result, " this is action result ")
            const newState = {...action.result}
          
            console.log(newState)
            return newState
        }
        default:{
            return state
        }
    }
}

export default searchReducer