export const listenTo = <K extends keyof DocumentEventMap>(
  type: K | K[],
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  if (Array.isArray(type)) {
    type.forEach(typ => {
      document.addEventListener(typ, listener, options);
    });

    return () => {
      type.forEach(typ => {
        document.removeEventListener(typ, listener, options);
      });
    };
  } else {
    document.addEventListener(type, listener, options);
    return () => document.removeEventListener(type, listener, options);
  }
};
