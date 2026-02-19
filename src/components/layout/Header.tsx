import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@components/core';

import commonStyles from '@theme/common';
import { hScale } from '@theme/responsive';
import { colors } from '@theme/colors';

export function Header() {
  return (
    <View style={styles.root}>
      <Text variant="h6">🏦 BANCO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...commonStyles.center,
    height: hScale(60),
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
});
