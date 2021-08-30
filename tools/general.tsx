

// https://github.com/vercel/next.js/issues/11993
export const fixUnserialized = (data) => {
    return JSON.parse(JSON.stringify(data));  
}