import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IcalcState } from '../redux/reducer/reducer';

export const InputNumber = () => {
  const number = useSelector(({ calc }: IcalcState) => {
    return calc.viewNumber;
  });

  const size =
    number.length < 7 ? styles.input : { ...styles.input, ...styles.size };

  return <Text style={size}>{number}</Text>;
};

const styles = StyleSheet.create({
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
});
