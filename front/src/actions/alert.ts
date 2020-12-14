
// alert open and close  
export const OPEN_ALERT="OPEN_ALERT" as const;
export const CLOSE_ALERT="CLOSE_ALERT" as const;

export const openAlertAction =(data:string)=>{
    return {
        type:OPEN_ALERT,
        data:data
    }
};

export const closeAlertAction=()=>{
    return {
        type:CLOSE_ALERT
    }
};


export type Action = 
| ReturnType<typeof openAlertAction>
| ReturnType<typeof closeAlertAction>;