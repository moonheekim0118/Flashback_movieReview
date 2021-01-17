interface ScrollHandler {
  (dispatch: () => void, predicate: () => boolean): (
    this: Window,
    e: React.MouseEvent<HTMLSpanElement>
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
