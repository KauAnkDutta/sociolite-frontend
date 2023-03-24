export const get_sender_name = (senderId, friends) => {
    if(friends){
        const sender = friends?.find((friend) => friend._id === senderId)
        return sender?.username;
    }
    
}
