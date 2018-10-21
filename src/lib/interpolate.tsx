export const interpolate = (current: number, final: number, growth: number) => {
  if (current === final) {
    return final;
  }

  if (current < final) {
    const next = current + growth;
    if (next > final) {
      return final;
    }

    return next;
  }

  if (current > final) {
    const next = current - growth;
    if (next < final) {
      return final;
    }

    return next;
  }

  return final;
};
