import React, { useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

async function asyncIteratorWatcher(channel, userId, handleAddMessageByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    const {user} = packet.value;
    if(user.id !== userId) {
      handleAddMessageByWebsocket(packet.value);
    }
  }
}

const RoomItem = ({ socket, userId, title, subTitle, avatar, roomId, type, push, handleAddMessageByWebsocket }) => {
  useEffect(() => {
    const channel = socket.subscribe(`room.newMessage.${roomId}`);
    asyncIteratorWatcher(channel, userId, handleAddMessageByWebsocket);
    return () => channel.kill();
  }, []);

  return (
    <ListItem bottomDivider onPress={() => push("Chat", { roomId, type })}>
      <Avatar source={{ uri: avatar }} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default RoomItem;
