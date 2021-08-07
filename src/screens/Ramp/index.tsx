import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Subheading} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import trade from '../../assets/lottie/trade.json';
import ContainerWidth from '../../components/View/containerWidth';
import SafeAreaView from '../../components/View/safeAreaView';
import globalStyles from '../../style/global';

const Ramp: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ContainerWidth>
        <LottieView source={trade} autoPlay loop style={styles.lottie} />
        <View>
          <Subheading style={[globalStyles.textCenter, globalStyles.my1]}>
            {t(
              'You can buy and sell cryptocurrencies with your credit/debit card, Apple Pay and many other payments methods with our partner Ramp',
            )}
          </Subheading>
          <Subheading style={[globalStyles.textCenter, globalStyles.my1]}>
            {t(
              'Ramp has almost worldwide coverage, you can start buying and selling crypto today, from the app!',
            )}
          </Subheading>
          <Button
            mode="contained"
            style={[globalStyles.my2]}
            onPress={() => navigation.navigate('RampView')}>
            {t('Start')}
          </Button>
        </View>
      </ContainerWidth>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    alignSelf: 'center',
    height: 200,
    marginBottom: 20,
  },
});

export default Ramp;
