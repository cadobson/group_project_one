const SET_TAGS = "tag/SET_TAGS"

const setTags = (tags) => ({
    type: SET_TAGS,
    tags
})

export const loadTagsFromBackend = () => async dispatch => {
    const tagsDataRes = await fetch("/api/tags")
    if (tagsDataRes.ok) {
        const tagsData = await tagsDataRes.json()
        dispatch(setTags(tagsData))
    }
    return tagsDataRes
}

const tagsReducer = (state ={}, action) =>{
    switch(action.type){
      case (SET_TAGS): {
          return {...action.tags}
      }
      default:{
          return state
      }
    }
}

export default tagsReducer
