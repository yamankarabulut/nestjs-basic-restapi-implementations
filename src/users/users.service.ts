import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    // an on memory database for the sake of simplicity
    private users = [
        { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', privateKey: '2a9c6b8a-87b5-4211-8daf-951fd3e9e50f', role: 'INTERN' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com', privateKey: '91093fa7-a62d-4794-a4f0-5872e045d9fa', role: 'ENGINEER' },
        { id: 3, name: 'Alice Johnson', email: 'alicejohnson@gmail.com', privateKey: '840c9bb0-44f3-4575-8436-a83bef679be9', role: 'ADMIN' },
        { id: 90, name: 'Nightrain', email: 'nt90@gmail.com', privateKey: '90909090-5a6d-90a3-bcf2-909090909090', role: 'ADMIN' },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return { count: this.users.length, users: this.users };
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: { name: string; email: string; privateKey: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const newUser = { id: this.users.length + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: { name?: string; email?: string; privateKey?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            // find the data by id and update it with ... spread operator
            this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
            return this.users[userIndex];
        }
        return null;
    }

    remove(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            const removedUser = this.users.splice(userIndex, 1);
            return removedUser[0];
        }
        return null;
    }
}
