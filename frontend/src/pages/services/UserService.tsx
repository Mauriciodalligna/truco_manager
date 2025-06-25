import axios from "axios";
import UserInterface from "../interfaces/UserInterface";

const url = 'http://localhost:3002/api'

class UserService {
    async createUser(user: UserInterface) {
        return axios.post(`${url}/user`, user)
            .then((response) => response.status)
            .catch((error) => error)
    }

    async getAllUsers() {
        return axios.get(`${url}/users`)
            .then((response) => response.data)
            .catch((error) => error)
    }

    async deleteUser(id: number) {
        return axios.delete(`${url}/user/${id}`)
            .then((response) => response.status)
            .catch((error) => error)
    }

    async editUser(user: UserInterface) {
        console.log(user)
        return axios.put(`${url}/user/${user.id}`, user)
            .then((response) => response.status)
            .catch((error) => error)
    }
}

export default new UserService()