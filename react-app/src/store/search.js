const SEARCH = '/search/search_result'

const getSearch =(result)=>({
    type:SEARCH,
    result

})

export const loadSearchResult = (result) => async dispatch => {
    const res = await fetch('/api/search',{
        method:['POST','GET'],
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(comment)
    })
    if(res.ok){
        const result = await res.json();
        dispatch(getSearch(result))
    }
}

const searchReducer = (state ={}, action) => {
    switch(action.type){
        case SEARCH:{
            const newState ={};
            newState = {...action.returnValue}
            return newState
        }
        default:{
            return state
        }
    }
}

export default searchReducer