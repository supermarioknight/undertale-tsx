export const listenTo = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  document.addEventListener(type, listener, options);
  return () => document.removeEventListener(type, listener, options);
};
