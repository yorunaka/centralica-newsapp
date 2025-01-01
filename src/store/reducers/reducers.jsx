const newsState = {
    newsData: [],
  }

const newsReducer = (state = newsState, action) => {
    switch (action.type) {
        case 'NEWS_DATA':
          // console.log(action.news)
          return {
            ...state,
            newsData: action.news,
          }
        default:
          return state
      }
}

export { newsReducer }