import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor('text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
    fontFamily: 'PoppinsRegular'
  },
  defaultSemiBold: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 600,
    fontFamily: 'PoppinsSemiBold',
    color: 'rgba(48, 48, 48, 1)'
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: 600,
    color: 'rgba(48, 48, 48, 1)',
    fontFamily: 'PoppinsSemiBold'
  },
  subtitle: {
  },
});
