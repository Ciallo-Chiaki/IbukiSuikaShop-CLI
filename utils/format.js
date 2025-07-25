import { commafy } from "xe-utils";

export const formatPrice = (price = 0, opts = {}) => {
  const { digits = 2 } = opts;
  return commafy(Number(price) / 100, { digits });
};
