import axios from "axios";

export const deleteTodo = async (id: string): Promise<void> => {
    try {
        await axios({
            method: 'DELETE',
            url: `http://localhost:8080/api/remove-todo/${id}`
        })
    } catch (error: any) {
        throw new Error(error)
    }
}