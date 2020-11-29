
// alert open and close  
export const OPEN_ALERT="OPEN_ALERT";
export const CLOSE_ALERT="CLOSE_ALERT";

export type Action = 
{type: "OPEN_ALERT", data:string} |
{type: "CLOSE_ALERT"};