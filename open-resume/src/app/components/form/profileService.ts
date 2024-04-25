let Profilename: string;

const setname = (name:string): void => {
    Profilename = name;
};

const getname = (): string=> {
    return Profilename;
};
export const profileService = {setname,getname}