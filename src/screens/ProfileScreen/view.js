import React, {Fragment, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import {useNavigationButtonPress} from 'react-native-navigation-hooks';
import {Avatar, Button as NativeButton} from 'react-native-elements';
import colors from '../../theme/color';
import shadow from '../../theme/shadow';
import Text from '~/components/Text';
import QRCodeModal from './components/QRCodeModal';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const goto = (push) => (path, params={}) => () => {
  push(path, { passProps: params});
};

const ProfileScreen = ({componentId, auth}) => {
  const {push} = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const onGoToPath = goto(push);

  useNavigationButtonPress((e) => {
    if (
      componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      setShowModal(true);
    }
  });

  return (
    <Fragment>
      <QRCodeModal
        value={auth.get('account')}
        isVisible={showModal}
        username={auth.get('name')}
        onClose={() => setShowModal(false)}
      />
      <View style={styles.infoBox}>
        <Avatar
          rounded
          style={styles.avatar}
          source={{uri: auth.get('avatar')}}
        />
        <View>
          <Text style={styles.nickname}>{auth.get('name')}</Text>
          <Text h4>初級食伴</Text>
        </View>
      </View>
      <View style={styles.introZone}>
        <Text h5>{auth.get('description')}</Text>
      </View>
      <View style={styles.settingsZone}>
        <NativeButton
          title='編輯個人資料'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
          onPress={onGoToPath('EditProfile', { username: auth.get('name'), description: auth.get('description') })}
        />
        <NativeButton
          title='設定'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
          onPress={onGoToPath('Setting')}
        />
      </View>
    </Fragment>
  );
};

ProfileScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/qrcode.png'),
        color: colors.grey,
      },
    ],
  },
};

const styles = StyleSheet.create({
  infoBox: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
  },
  button: {
    borderWidth: 1.5,
    height: 30,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  introZone: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  settingsZone: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 5,
    marginRight: 15,
    borderRadius: 80,
    borderColor: '#fff',
    backgroundColor: '#fff',
    ...shadow.black,
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
  title: {
    paddingLeft: 20,
  },
  nickname: {
    fontSize: 36,
    color: colors.grey,
  },
});

export default ProfileScreen;