import { BoundingBox } from '../view/battle/types';

export const intersects = (target: BoundingBox) => (hitbox: BoundingBox): boolean => {
  const [hx1, hy1, hx2, hy2] = hitbox;
  const [tx1, ty1, tx2, ty2] = target;

  return (
    (hx1 > tx1 && hy1 > ty1 && hx1 < tx2 && hy1 < ty2) ||
    (hx2 < tx2 && hy2 < ty2 && hx2 > tx1 && hy2 > ty1)
  );
};
