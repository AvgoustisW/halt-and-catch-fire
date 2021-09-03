
export const logout = async (e, router) => {
    
    const authResponse = await fetch('/api/auth/logout', {
        method: 'POST',
    })
    const res = await authResponse.status;
    if(res === 200){
        router.push('/')
    } else {
       console.error('Could not logout');
    }
  }