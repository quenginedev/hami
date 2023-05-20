import { AxiosResponse } from 'axios'
export const handleRequest = async <T>(fns: Promise<AxiosResponse<T, any>>) => {
    try {
        const { data } = await fns
        return { data }
    } catch (error) {
        return {error: { message: error.message }}
    }
}