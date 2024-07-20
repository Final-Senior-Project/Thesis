import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import styles from './OwnerChatStyle';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { APP_API_URL } from '../../env';
import { useRoute } from '@react-navigation/native';

const OwnerChats = () => {
    const route = useRoute();
    const { userid } = route.params;
    const [ownerId, setOwnerId] = useState(null);
    const [user, setUser] = useState(null);
    const [owner, setOwner] = useState({});
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchOwnerId = async () => {
            const id = await SessionStorage.getItem('ownerid');
            setOwnerId(id);
        };

        fetchOwnerId();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/user/user/${userid}`);
                setUser(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, [userid]);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const id = await SessionStorage.getItem('ownerid');
                if (id) {
                    const res = await axios.get(`${APP_API_URL}/user/user/${id}`);
                    setOwner(res.data[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchOwnerData();
    }, []);

    useEffect(() => {
        if (!ownerId) return;

        const getMessage = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userid}/${ownerId}`);
                const formattedMessages = res.data.map(msg => ({
                    _id: msg.id,
                    text: msg.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: msg.id,
                        name:  msg.sender===msg.Owner.id? msg.Owner?.FirstName : msg.User?.FirstName,
                        avatar:  msg.sender===msg.Owner.id? msg.Owner?.image : msg.User?.image,
                    }
                }));
                console.log("response",res.data);
                setMessages(formattedMessages);
                console.log("msg", formattedMessages);
            } catch (err) {
                console.log(err);
            }
        };

        getMessage();
    }, [userid, ownerId, user, owner]);

    useEffect(() => {
        const socketConnection = io("http://192.168.11.206:3000");
        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("Socket connected.");
        });

        socketConnection.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        // socketConnection.on("receive-message", message => {
            
        
        // });

        return () => {
            if (socketConnection) {
                socketConnection.disconnect();
            }
        };
    }, [ownerId, user, owner]);

    const handleSend = useCallback(async (messages = []) => {
        const newMessage = messages[0];
        console.log("mes=>",messages);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
console.log("owner user",ownerId,userid);
        try {
            await axios.post(`${APP_API_URL}/chat/addmsgO/${ownerId}/${userid}`, {
                message: newMessage.text,
                sender:ownerId,
            });

            if (socket) {
                socket.emit("send-message", newMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }, [userid, ownerId, socket]);

    const renderBubble = (props) => {
        const isOwner = props.currentMessage.user._id === ownerId;
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: isOwner ? '#f0f0f0' : '#0078fe',
                    },
                    right: {
                        backgroundColor: isOwner ? '#0078fe' : '#f0f0f0',
                    }
                }}
                textStyle={{
                    left: {
                        color: isOwner ? '#000' : '#fff',
                    },
                    right: {
                        color:user ? '#fff' : '#000',
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
                user={{user:{
                    name: owner.FirstName,
                    avatar:  owner.image,
                }
                    // _id: ownerId,
                    // name: owner?.email,
                    // avatar: owner?.image,
                }}
                renderBubble={renderBubble}
                inverted={false}
            />
        </View>
    );
};

export default OwnerChats;
