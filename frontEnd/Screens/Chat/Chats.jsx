import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
import { APP_API_URL } from '../../env';
import styles from './ChatStyles';
import { useRoute } from '@react-navigation/native';

const Chats = ({}) => {
    route=useRoute()
 const   {idOwner}=route.params
 console.log("route",route.params);
    const userId = SessionStorage.getItem("userid");
    console.log("userid",userId);
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState(null);
    const ownerId = SessionStorage.getItem("ownerid");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const getMessage = async () => {
        try {
            console.log("uesrid ownerid ",userId,idOwner);
            const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userId}/${idOwner}`);
            console.log("getmsg",res.data);
            
            const formattedMessages = res.data.map(msg => ({
                _id:msg.id,
                text:msg.message,
                user: {
                    id: msg.id,
                    name:msg.sender===msg.User.id ? msg.User?.FirstName : msg.Owner?.FirstName,
                    avatar:  msg.sender===msg.User.id ? msg.User?.image : msg.Owner?.image,
                },
                createdAt: new Date(msg.createdAt)
            }));
            setMessages(formattedMessages);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchOwnerData = async () => {
        try {
            const id = await SessionStorage.getItem('userid');
            if (id) {
                const res = await axios.get(`${APP_API_URL}/user/user/${id}`);
                setUser(res.data[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        
        fetchOwnerData();
        getMessage();
    }, [userId, ownerId]);
    
    useEffect(() => {
        const socketConnection = io("http://192.168.139.186:3000");
        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("Socket connected.");
        });

        socketConnection.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        socketConnection.on("receive-message", message => {
            console.log("messga==>",message);
            setMessages(previousMessages => GiftedChat.append(previousMessages, {
                _id: message.id,
                text: message.message,
                createdAt: new Date(messages.createdAt),
                user: {
                    id: message.sender,
                   
                    avatar:message.sender=== msg.Owner.id? msg.Owner?.image : msg.User?.image,
                }
            }));
        });

        return () => {
            if (socketConnection) {
                socketConnection.disconnect();
            }
        };
    }, []);

    const handleSend = useCallback(async (messages = []) => {
        console.log("messages",messages);
        const newMessage = messages;
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsgO/${ownerId}/${userId}`, {
                message: newMessage[0].text,
                sender:userId
            });

            if (socket) {
                socket.emit("send-message", newMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }, [userId, idOwner, socket]);
    const renderBubble = (props) => {
        const isUser = props.currentMessage.user._id === userId;
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: isUser ? '#f0f0f0' : '#0078fe',
                    },
                    right: {
                        backgroundColor: isUser ? '#0078fe' : '#f0f0f0',
                    }
                }}
                textStyle={{
                    left: {
                        color: isUser ? '#000' : '#fff',
                    },
                    right: {
                        color:owner ? '#fff' : '#000',
                    }
                }}
                usernameStyle={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}
                renderUsernameOnMessage={true}
            />
        );
    };

    return (
        <View style={styles.messagingscreen}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{
                    _user:{
                        name: user.FirstName,
                        avatar:  user.image,
                    }
                }}
                inverted={false}
                renderBubble={renderBubble}
                
            />
        </View>
    );
};

export default Chats;
