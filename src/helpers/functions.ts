import * as AWSCognito from 'amazon-cognito-identity-js';
import dayjs from 'dayjs';

export function cognitoUser(email: string) {
  const userPool = new AWSCognito.CognitoUserPool({
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    ClientId: process.env.COGNITO_CLIENT_ID!,
  });

  return new AWSCognito.CognitoUser({
    Username: email,
    Pool: userPool,
  });
}

export function formatCurrency(num: number) {
  if (!num) {
    return ' 0';
  }

  const formatter = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol',
  });

  return formatter
    .format(num)
    .replace(/(?=\d)/, ' ')
    .replace('.00', '');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function formatDate(date, emptyValue = '-') {
  if (!date) {
    return emptyValue;
  }

  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    return emptyValue;
  }

  return parsed.format('D MMM, YYYY');
}
export function formatDateTime(date: string | Date | undefined, emptyValue: string = '-'): string {
  if (!date) {
    return emptyValue;
  }

  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    return emptyValue;
  }

  return parsed.format('D MMM, YYYY h:mm A');
}