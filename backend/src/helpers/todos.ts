import { TodosAccess } from './todosAcess'
import { getUploadUrl } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess()

export async function getTodosPerUser(userId: string): Promise<TodoItem[]> {
    return todosAccess.getTodosPerUser(userId)
  }

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {

  const todoId = uuid.v4()

  return await todosAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false
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
