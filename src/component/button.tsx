import React from 'react';
import { useDispatch } from 'react-redux';
import { clickButton } from '../redux/actions/actions';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IButton {
  icon: string;
  color?: string;
  className?: string;
  value?: string;
  press?: (value: string) => {};
}

const ButtonCalc = ({
  icon,
  color = '#333',
  className,
  value,
  press = clickButton,
}: IButton) => {
  const dispatch = useDispatch();

  const click = () => {
    dispatch(press(value ? value : icon));
  };

  const zeroButton = className
    ? { ...styles.button, ...styles.zero }
    : styles.button;

  return (
    <TouchableOpacity
      onPress={click}
      style={{ backgroundColor: color, ...zeroButton }}
      activeOpacity={0.7}
    >
      <View style={{ ...styles.button }}>
        <Text style={styles.simbol}>{icon}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    lineHeight: 0,
    margin: 10,
    fontWeight: 'bold',
  },
  simbol: {
    color: '#e3e3e3',
    fontSize: 25,
    lineHeight: 25,
    width: 70,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  zero: {
    width: 160,
    marginHorizontal: 0,
    left: 10,
    position: 'absolute',
  },
});

export { ButtonCalc };
