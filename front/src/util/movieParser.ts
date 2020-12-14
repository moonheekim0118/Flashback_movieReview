export const titleParser = (title) => {
  let newTitle = title.replace(/<b>/g, '');
  newTitle = newTitle.replace(/[</b>]/g, '');
  return newTitle;
};

export const directorParser = (director) => {
  director = director.replace(/[|]/g, '');
  return director;
};
