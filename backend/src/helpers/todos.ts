import { TodosAccess } from './todosAcess'
//import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess()

//TODO::: 8675309
export async function getAllTodos(): Promise<TodoItem[]> {
  return todosAccess.getAllTodos()
}

export async function getTodosPerUser(userId: string): Promise<TodoItem[]> {
    return todosAccess.getTodosPerUser(userId)
  }

export async function createTodo(
  createGroupRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {

  const todoId = uuid.v4()

  return await todosAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    name: createGroupRequest.name,
    dueDate: createGroupRequest.dueDate,
    done: false
  })
}
