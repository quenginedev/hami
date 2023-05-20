import { useHami, ModelType, ModelDoc } from "./useHami"

const client = useHami()

export type NewUser = ModelType<'user'>
export type User = ModelDoc<NewUser>

const fetchAllUsers = () => client.user.findMany({query: {}})
export type FetchAllUsersData = Awaited<ReturnType<typeof fetchAllUsers>>['data']

const createUser = (newUser: NewUser) => client.user.createOne({
    body: newUser
})
export type CreateNewUserData = Awaited<ReturnType<typeof createUser>>['data']


export const useUser = () => {    
    return {
        actions: {
            fetchAllUsers,
            createUser
        }
    }
}