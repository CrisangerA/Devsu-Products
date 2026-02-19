import React from 'react';
import {
  Pressable,
  PressableProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
// Types
import {
  ButtonVariant,
  ButtonSize,
  getButtonStyle,
} from '@theme/components/Button.styles';
import { BorderRadiusToken } from '@theme/borders';
import { useTheme, spacing } from '@theme/index';
// Theme
import { Text } from './Text';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  borderRadius?: BorderRadiusToken;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    borderRadius,
    title,
    leftIcon,
    rightIcon,
    style: customStyle,
    textStyle,
    onPress,
    ...pressableProps
  } = props;

  const theme = useTheme();
  const isDisabled = disabled || loading;
  //   const isStringChildren = typeof children === 'string';
  //   console.log('isStringChildren', isStringChildren, children);

  const styles = getButtonStyle({
    mode: theme.mode,
    variant,
    size,
    disabled: isDisabled,
    fullWidth,
    borderRadius,
  });

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.container,
        customStyle,
        pressed && !isDisabled && { opacity: 0.8 },
      ]}
      {...pressableProps}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={styles.text.color as string}
          style={baseStyle.loadingIndicator}
        />
      )}

      {leftIcon && <View style={baseStyle.leftIcon}>{leftIcon}</View>}

      <Text style={textStyle ? [styles.text, textStyle] : styles.text}>
        {title}
      </Text>

      {rightIcon && <View style={baseStyle.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
}

const baseStyle = StyleSheet.create({
  loadingIndicator: {
    marginRight: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});
