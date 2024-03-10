const Reducer=(state,action)=>{
    console.log(action);
    switch(action.type){
        case "LOGIN_START":
        return{
               user:false,
               isFetching:false,
               error:false
        };
        case "LOGIN_SUCCESS":
        return{
               user:action.payload,
               isFetching:false,
               error:false
        };
        case "LOGIN_FAILURE":
        return{
               user:false,
               isFetching:false,
               error:true
        };
        case "LOGOUT":
        return{
               user:false,
               isFetching:false,
               error:false
        };
      default:
          return state;
        
    }
}

export default Reducer;