import { verify } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export default function requireAuthentication(getServerSideProps) {
    return async (context) => {
        const { req, res } = context;
        const token = extractAuthToken(req.headers.cookie); // Add logic to extract token from `req.headers.cookie`

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    statusCode: 302
                }
            };
        }

        if(!verifyToken(token)){
            return {
                redirect: {
                    destination: '/login',
                    statusCode: 302
                }
            };
        } else {
            return await getServerSideProps(context); // Continue on to call `getServerSideProps` logic
        }
    }
}


const verifyToken = (token) => {
    try {
        verify(token, secret);
        return true;
    } catch(e) {
       return false;
    }
}
const extractAuthToken = ( tokenString => {    
    let token = null;
    if(!tokenString) return null;

    if(!tokenString.includes(';')){
        if (tokenString.includes('authToken')) token = tokenString.split('=')[1];
    } else {
        let potential = tokenString.split(';').find( e => e.includes('authToken'));
        if (potential) token = potential.split('=')[1];
    }

    return token;
})