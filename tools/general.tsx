

//https://github.com/vercel/next.js/issues/11993
//https://github.com/vercel/next.js/issues/11993#issuecomment-712920048
export const fixUnserialized = (data) => {
    return JSON.parse(JSON.stringify(data));  
}