import { onMounted, ref, watchEffect } from "vue";
import { useUser, FetchAllUsersData } from "./useUser";

const resetNewUserData: User = {
    address: {
        city: '',
        street: '',
        zipCode: ''
    },
    email: '',
    name: '',
    phone: '',
    username: ''
}

export const useApp = () => {
    const users = ref<FetchAllUsersData>([]);
    const loading = ref(false)

    const newUser = ref({ ...resetNewUserData })
    const selectedUserId = ref<string | null>(null)
    const {
        actions: { fetchAllUsers, createUser, fetchUserById },
    } = useUser();

    const selectedUser = ref<UserDoc | null>(null)
    const handleCreateUser = async () => {
        loading.value = true
        const { data } = await createUser(newUser.value)
        if (data) users.value?.push(data)
        newUser.value = { ...resetNewUserData }
        loading.value = false
    }

    const error = ref(null as any);
    onMounted(async () => {
        const { data, error: e } = await fetchAllUsers();
        if (data) users.value = data;
        if (e) error.value = e;
    });

    watchEffect(async () => {
        if (!selectedUserId.value) return selectedUser.value = null
        loading.value = true
        const { data: user } = await fetchUserById(selectedUserId.value as string)
        loading.value = false
        if (user) selectedUser.value = user
    })

    return {
        state: {
            users,
            newUser,
            loading,
            selectedUserId
        },
        actions: {
            handleCreateUser
        },
        computed: {
            selectedUser,
        }
    }
}