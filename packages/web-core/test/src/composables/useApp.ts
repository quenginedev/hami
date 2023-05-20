import { computed, onMounted, ref } from "vue";
import { useUser, FetchAllUsersData, NewUser } from "./useUser";

export const useApp = () => {
    const users = ref<FetchAllUsersData>([]);
    const loading = ref(false)
    const resetNewUserData: NewUser = {
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
    const newUser = ref({ ...resetNewUserData })
    const selectedUserId = ref<string | null>(null)
    const selectedUser = computed(() => users.value?.find(user => user._id === selectedUserId.value))
    const {
        actions: { fetchAllUsers, createUser },
    } = useUser();
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