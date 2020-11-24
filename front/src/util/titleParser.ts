export const titleParser = (title) =>{
    let newTitle = title.replace('<b>','');
    newTitle=newTitle.replace('</b>','');
    return newTitle
}