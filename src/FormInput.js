import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function FormInput({ label, value, onChangeText, placeholder, required, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}{required && <Text style={styles.required}>*</Text>}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#fff'}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#0870DF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#121314',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#C6CBCF',
  },
  required: {
    color:'#FF0000',
  },
});