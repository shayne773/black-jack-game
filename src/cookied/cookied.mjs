import {v4} from 'uuid';


// implement and export the following functions in this file:
// 1. parseCookies 
// 2. manageSession 


const sessions = {};

export const parseCookies = (req, res, next) => {
    const cookiesHeader = req.get("Cookie");
    let hwCookies = {};
    if(cookiesHeader!=undefined){
        cookiesHeader.split(";").forEach(cookie => {
            const [key, value] = cookie.trim().split("=");
            hwCookies[key] = value;
        });
    }
    req.hwCookies = hwCookies;
    next();
}

export const manageSession = (req, res, next) => {
    if(req.hwCookies.sessionId && sessions[req.hwCookies.sessionId]){
        console.log(`Session Already Exists: ${req.hwCookies.sessionId}`);
        const sessionId = req.hwCookies.sessionId;
        req.hwSession = sessions[sessionId];
        req.hwSession.sessionId = sessionId;

    }
    else{
        const newSessionId = v4();
        sessions[newSessionId] = {};
        req.hwSession = {sessionId : newSessionId};
        res.append("Set-Cookie", `sessionId=${newSessionId};HttpOnly`);
        console.log("Session Generated");
    }
    next();
}