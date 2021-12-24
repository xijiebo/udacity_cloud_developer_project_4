
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo, getTodosPerTodoId } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {


    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const updateToDoRequest: UpdateTodoRequest = JSON.parse(event.body)

    if(!updateToDoRequest.name || !updateToDoRequest.dueDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'name and dueDate are required.'
        })
      }     
    }

    const item = await getTodosPerTodoId(getUserId(event), event.pathParameters.todoId)
    if(!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo item not found.'
        })
      };   
    }

    await updateTodo(getUserId(event), event.pathParameters.todoId, updateToDoRequest)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: ''
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  
