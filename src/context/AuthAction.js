export const loginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
})

export const unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
})

export const addnotifications = (notification) => ({
    type: "ADDNOTIFICATION",
    payload: notification,
})

export const removenotifications = () => ({
    type: "REMOVENOTIFICATION",
    payload: convoId,
})

export const addfriends = (friend) => ({
    type: "ADDFRIENDS",
    payload: friend,
})

export const addCoverPicture = (coverPictureName) => ({
    type: "ADDCOVERPICTURE",
    payload: coverPictureName,
})
export const addProfilePicture = (profilePictureName) => ({
    type: "ADDPROFILEPICTURE",
    payload: profilePictureName,
})

export const showSuggestions = (suggestions) => ({
    type: "SHOWSUGGESTIONS",
    playload: suggestions
})

export const updateUserInfo = (user) => ({
    type: "UPDATEUSERINFO",
    payload: user
})

