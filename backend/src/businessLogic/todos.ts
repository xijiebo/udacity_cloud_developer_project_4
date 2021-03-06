
import { TodosAccess } from '../dataLayer/todosAcess'
import { getUploadUrl } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'


const todosAccess = new TodosAccess()

export async function getTodosPerTodoId(userId: string, todoId: string): Promise<TodoItem> {
    return todosAccess.getTodosPerTodoId(userId, todoId)
  }

export async function getTodosPerUser(userId: string): Promise<TodoItem[]> {
    return todosAccess.getTodosPerUser(userId)
  }

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {

  return await todosAccess.createTodo({
    userId: userId,
    todoId: uuid.v4(),
    createdAt: new Date().toISOString(),
    done: false,
    ...createTodoRequest
  })
}

export async function deleteTodo(userId: string, todoId: string) {
    return todosAccess.deleteTodo(userId, todoId)
}

export async function updateTodo(
    userId: string, 
    todoId: string, 
    updateTodoRequest: UpdateTodoRequest
  ) {
    return await todosAccess.updateTodo(
        userId, todoId, updateTodoRequest.name, updateTodoRequest.dueDate,updateTodoRequest.done
    )
}

export function createAttachmentPresignedUrl(imageId: string): string {
    console.log("In createAttachmentPresignedUrl...")
    return getUploadUrl(imageId)
}
