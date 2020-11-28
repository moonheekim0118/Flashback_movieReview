export const titleParser = (title) =>{
    let newTitle = title.replace('<b>','');
    newTitle=newTitle.replace('</b>','');
    return newTitle
}

export const directorParser = (director)=>{
    director = director.replace('|','');
    return director;
}