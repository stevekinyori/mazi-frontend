export function amountDisplay(value: number): number {
  if (value > 1e6) {
    return Math.round(value / 1e6);
  }

  if (value > 1e3) {
    return Math.round(value / 1e3);
  }

  return value;
}

export function amountSuffix(value: number): string {
  if (value > 1e6) {
    return 'Million';
  }

  if (value > 1e3) {
    return 'K';
  }

  return '';
}

export function calcGrowth(currentValue: number, prevValue: number): { value: number; direction: 'up' | 'down' } {
  let num = parseFloat((((currentValue - prevValue) / prevValue) * 100).toFixed(1));

  if (Number.isNaN(num)) {
    num = 0;
  }

  return {
    direction: num < 0 ? 'down' : 'up',
    value: num,
  };
}
