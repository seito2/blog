import { SITE_BASE_PATH } from "../consts";

export const getUrlFromOwn = (url: `/${string}`) => {
  return `${SITE_BASE_PATH}${url}`;
};
