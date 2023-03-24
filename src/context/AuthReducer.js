const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            }

        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error:false,
            }

        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: false,
                error: true
            }

        case "FOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following: [...state.user.following, action.payload],
                }
            }

        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following: state.user.following.filter((followingg) => followingg !== action.payload)
                }
            }

        case "ADDNOTIFICATION":
            const to_add_notification = action.payload
            const new_notification_senderId = to_add_notification.senderId

            const exist = state.notifications.some((n) => n.senderId === new_notification_senderId)
            if(exist){
                const notifications = state.notifications.map((n) => n.senderId === new_notification_senderId ? {...n, quan: n.quan + 1} : n)
                return {...state, notifications}
            }else{
                return{
                    ...state,
                    notifications:[...state.notifications, {...to_add_notification}]
                }
            }

        case "REMOVENOTIFICATION":
            return{
                ...state,
                notifications:state.notifications.filter((notification) => notification.convoId !== action.payload),
            }

        case "ADDFRIENDS":
            return{
                ...state,
                friends: [...action.payload]
            }

        case "ADDCOVERPICTURE":
            return{
                ...state,
                user:{
                    ...state.user,
                    coverPicture: action.payload,

                }
            }

        case "ADDPROFILEPICTURE":
            return{
                ...state,
                user:{
                    ...state.user,
                    profilePicture: action.payload
                }
            }

        case "SHOWSUGGESTIONS":
            return{
                ...state,
                suggestions: action.payload
            }

        case "UPDATEUSERINFO":
            return{
                ...state,
                user: action.payload,
            }

        default:
            return state
    }
}

export default AuthReducer;