import queryString from 'query-string';
import { removeEmptyProps } from './removeEmptyProps';

export const formatQueryString = (params: unknown, isRemoveFalse = false) => {
  const str = queryString.stringify(removeEmptyProps(params, isRemoveFalse), {
    arrayFormat: 'bracket',
  });

  return str ? `?${str}` : '';
};
