import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@components/core';
import BankIcon from '@assets/icons/BankIcon.svg';

import commonStyles from '@theme/common';
import { hScale } from '@theme/responsive';
import { colors } from '@theme/colors';

export function Header() {
  return (
    <View style={styles.root}>
      <View style={styles.titleRow}>
        <BankIcon width={22} height={22} stroke={colors.light.text} testID="BankIcon" />
        <Text variant="h6"> BANCO</Text>
      </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
