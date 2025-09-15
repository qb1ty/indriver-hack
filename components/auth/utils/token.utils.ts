import Storage from 'expo-sqlite/kv-store';

export const setToken = (key: string, value: string) => {
    Storage.setItemSync(key, value)
}

export const getToken = (key: string) => {
    return Storage.getItemSync(key)
}