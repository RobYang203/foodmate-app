import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Button from '~/components/Button';

const getEventUserIds = (event, authUserId) => {
  return event.users.find((user) => user.info.id === authUserId);
};

const DisabledButton = ({ title, ...props }) => {
  return <Button {...props} title={title} disabled onPress={() => false} />;
};

const EventButton = ({ event, validatedUserCount, authUserId, onJoinClick, ...props }) => {
  if (authUserId === event.creator.id) {
    return <DisabledButton {...props} title='主辦人' />;
  }

  const user = getEventUserIds(event, authUserId);

  if (isEmpty(user)) {
    return <Button title='我要參加' {...props} onPress={onJoinClick} />;
  }

  if (event.userCountMax <= validatedUserCount) {
    return <DisabledButton {...props} title='已滿團' />;
  }

  if(user.info.status === 1) {
    return <DisabledButton {...props} title='活動即將進行' />;
  }

  return <DisabledButton {...props} title='等待審核' />
};

export default EventButton;