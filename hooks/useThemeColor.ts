import { Colors } from '@/constants/Colors';

export function useThemeColor(
  colorName: keyof typeof Colors.light
) {

  return Colors['light'][colorName];
}
