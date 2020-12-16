export const titleParser = (title: string): string => {
  let newTitle = title.replace(/<b>/g, '');
  newTitle = newTitle.replace(/[</b>]/g, '');
  return newTitle;
};

export const directorParser = (director: string): string => {
  director = director.replace(/[|]/g, '');
  return director;
};
