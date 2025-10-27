let users = [{ id: 7, userName: "Bond" }];
export const getAllUsers = () => [...users];
export const getUserById = (id) => { var _a; return (_a = users.find((u) => u.id === id)) !== null && _a !== void 0 ? _a : null; };
export const addUser = (user) => {
    if (users.some((u) => u.id === user.id))
        return false;
    users.push(user);
    return true;
};
export const updateUser = (id, newName) => {
    const u = users.find((u) => u.id === id);
    if (!u)
        return false;
    u.userName = newName;
    return true;
};
export const deleteUser = (id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1)
        return null;
    const [removed] = users.splice(index, 1);
    return removed;
};
