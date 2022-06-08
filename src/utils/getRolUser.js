export const getRolUser = (user) =>{
    const {email} = user || {}
    return email?.split('@').includes('admin') ? 'admin' : 'user'
}