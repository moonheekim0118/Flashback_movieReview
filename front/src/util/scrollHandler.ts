interface ScrollHandler {
  (dispatch: () => void, predicate: () => boolean): (
    this: Window,
    e: Event
  ) => any;
}

export const scrollHandler: ScrollHandler = (dispatch, predicate) => {
  return function (this, e) {
    if (
      window.pageYOffset + document.documentElement.clientHeight + 10 >=
      document.documentElement.scrollHeight
    ) {
      if (predicate()) {
        dispatch();
      }
    }
  };
};
