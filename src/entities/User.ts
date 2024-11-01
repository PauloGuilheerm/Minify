interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdon?: Date;
    updatedon?: Date;
}

export default User;