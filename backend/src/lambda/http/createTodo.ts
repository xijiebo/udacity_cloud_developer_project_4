
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("createTodo event: ", event)

    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    if(!newTodo.name || !newTodo.dueDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'name and dueDate are required.'
        })
      }     
    }

    const item = await createTodo(newTodo, getUserId(event))
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item
      })
    }

  })

handler.use(
  cors({
    credentials: true
  })
)

