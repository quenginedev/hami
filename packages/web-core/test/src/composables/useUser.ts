import { useHami } from "./useHami";

const client = useHami();

export const useUser = () => {

    const fetchAllUsers = () => client.user.findMany({ query: {} });
    const fetchUserById = (_id: string) =>
        client.user.findById({ param: { _id } });
    const createUser = (newUser: User) =>
        client.user.createOne({
            body: newUser,
        });
    const updateUserById = (_id: string, body: Partial<User>) =>
        client.user.updateById({
            param: { _id },
            body,
        });

    return {
        actions: {
            fetchAllUsers,
            fetchUserById,
            createUser,
            updateUserById,
        },
    };
};
