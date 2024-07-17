import { UserInterface, User } from "../types/User";
import Storage from './Storage';

const UserProvider: UserInterface = {
    getUser: async (): Promise<User> => {
        const user = await Storage.getSecureItem("user").then(
            (user) => JSON.parse(user as any)).catch(
                (err) => console.warn(err));
        return user;
    },
    
    setUser: async (user: User): Promise<void> => {
        await Storage.setSecureItem("user", JSON.stringify(user));
    },
  
    deleteUser: async (): Promise<void> => {
        await Storage.deleteSecureItem("user");
    },

};
  
export default UserProvider;