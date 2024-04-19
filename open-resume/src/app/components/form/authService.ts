import axiosInstance from "./axiosInstance";
import { ResumeEducation } from "lib/redux/types";

  interface educations{
    educations:ResumeEducation[]
  }
interface TokenPayload {
    exp: number;
    username: string;
    role: string;
    id: number;
    // Add other properties if necessary
}

interface ResumeData {
  userId: string;
  resumeName: string;
}
const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

const getToken = (): string | null => {
    const token = localStorage.getItem('token');
    return token ? token : null;
};

const login = (userData: any) => {
    return axiosInstance.post("http://localhost:3001/api/v1/users/signin", userData);
};
const resumesave = (resumeData: any) => {
    
       return axiosInstance.post("http://localhost:3001/api/v1/resume/createresume", resumeData);
        
};

let resumeId: number;

const setResumeId = (id: number): void => {
    resumeId = id;
};

const getResumeId = (): number=> {
    return resumeId;
};
let counteducation: number;

const setcounteducation = (counteducation: number): void => {
    counteducation = counteducation;
};

const getcounteducation= (): number=> {
    return counteducation;
};
let educations: educations;

const seteducations = (educations: educations): void => {
    educations = educations;
};

const geteducations= (): educations=> {
    return educations;
};
let buttonClicked :number;
const setbuttonClicked = (Clicked: number):void=>{
    buttonClicked= Clicked;
}
const getbuttonClicked =():number=>{
    return buttonClicked;
}
const parseToken = (token: string): TokenPayload | null => {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return null; 
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload as TokenPayload;
};

const getUserName = (): string | null => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        return payload?.username ?? null
    }
    return null;
};
let fileUrl : string;

const setfileUrl =(fileUrl : string):void=>{
    fileUrl=fileUrl;
}
const getfileUrl =():string=>{
    return fileUrl;
}

const getUserRole = (): string | null => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        return payload?.role ?? null
    }
    return null;
};

const getUserId = (): number | null => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        return payload?.id ?? null
    }
    return null;
};


const isLoggedIn = (): boolean => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        const isLogin: boolean = Date.now() < (payload?.exp ?? 0) * 1000;
        return isLogin;
    }
    return false;
};

const logOut = (): void => {
    localStorage.clear();
};

export const authService = { logOut, getToken, setToken, login, getUserName, getUserRole, isLoggedIn, getUserId, getResumeId, setResumeId,resumesave,setbuttonClicked,getbuttonClicked, setcounteducation, getcounteducation,seteducations ,geteducations,setfileUrl, getfileUrl  };

