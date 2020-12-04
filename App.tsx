import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ButtonCalc } from './src/component/button';
import { first, fourth, second, third } from './src/valueButtonCalc/data';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import 'react-native-gesture-handler';
import { InputNumber } from './src/component/input';

function HomeScreen() {
  const arrIcon = [first, second, third, fourth];

  interface IbuttonCalc {
    value?: string;
    color?: string;
    icon: string;
    class?: string;
    press?:
      | ((
          value: string
        ) => {
          type: string;
          number: any;
        })
      | undefined
      | ((
          value: string
        ) => {
          type: string;
        });
  }

  const li = useMemo(
    () => (arr: IbuttonCalc[]) => {
      return arr.map((el: IbuttonCalc) => {
        return (
          <View key={el.icon}>
            <ButtonCalc
              icon={el.icon}
              color={el.color}
              className={el.class}
              value={el.value}
              press={el.press}
            />
          </View>
        );
      });
    },
    [arrIcon]
  );

  const list = useMemo(
    () =>
      arrIcon.map((el, i: number) => {
        return <View key={i}>{li(el)}</View>;
      }),
    [arrIcon]
  );

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <InputNumber />
      <View style={styles.wrapBody}>
        <View style={styles.body}>{list}</View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
          }}
        >
          <Stack.Screen name=' ' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
    position: 'relative',
    bottom: 0,
  },
  app: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    textAlign: 'right',
    paddingHorizontal: 30,
    fontSize: 80,
    marginTop: 0,
    color: '#e3e3e3',
  },
  size: {
    fontSize: 45,
  },
  body: {
    justifyContent: 'center',
    color: '#e3e3e3',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  wrapBody: {
    position: 'relative',
    bottom: 20,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
