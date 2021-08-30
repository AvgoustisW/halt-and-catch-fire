

//https://github.com/vercel/next.js/issues/11993
//https://github.com/vercel/next.js/issues/11993#issuecomment-712920048
//TODO find better solution (if possible);
export const fixUnserialized = (data) => {
    return JSON.parse(JSON.stringify(data));  
}