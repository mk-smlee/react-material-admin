
export const convertEnumToLabel = <T extends Record<number, string>>(
  enumLabels: T,
  value: number
): string => enumLabels[value] ?? 'none';