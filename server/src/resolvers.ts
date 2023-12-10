import { GraphQLError, validate } from "graphql";
import userDal from "./dal/userDal.js";
import userService from "./services/user-service.js";
import { UserInterface as User } from "./types/interfaces/UserInterface.js";
import { typeDefs } from "./schema.js";
import { registerUserValidation } from "./utils/validations/userValidation.js";

export const resolvers = {
    Query: {
        users: async () => {
            const users = await userService.getAllUsers();
            return users;
        },
        userByEmail: async (_: any, args: User) => {
            console.log(args);
            const user = await userDal.getUserByEmail(args.email);
            return user;
        },
    },
    Mutation: {
        registerUser: async (_: any, args: User) => {
            console.log(args);
            
            const validUser = registerUserValidation(args);
            console.log(validUser);
            
            if (!validUser) {
                throw new GraphQLError('Invalid registration user',{extensions:{http:{status: 500}}})};
            const newUser = await userService.registerUser(args);
            return newUser;
        },
        updateUser: async (_: any, user: User) => {
            const updatedUser = await userService.updateUser(user.id!, user);
            return updatedUser;
        },
        deleteUser: async (_: any, user: User) => {
            const deletedUser = await userService.deleteUser(user.id!);
            return deletedUser;
        },
    }
}
