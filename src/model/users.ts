export type User = {
    id: number;
    userName: string;
};

let users: User[] = [{ id: 7, userName: "Bond" }];

export const getAllUsers = (): User[] => [...users];

export const getUserById = (id: number): User | null =>
    users.find((u) => u.id === id) ?? null;

export const addUser = (user: User): boolean => {
    if (users.some((u) => u.id === user.id)) return false;
    users.push(user);
    return true;
};

export const updateUser = (id: number, newName: string): boolean => {
    const u = users.find((u) => u.id === id);
    if (!u) return false;
    u.userName = newName;
    return true;
};

export const deleteUser = (id: number): User | null => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const [removed] = users.splice(index, 1);
    return removed;
};