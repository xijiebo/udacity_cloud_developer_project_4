
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo, getTodosPerTodoId} from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const item = await getTodosPerTodoId(getUserId(event), event.pathParameters.todoId)
    if(!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo item not found.'
        })
      };   
    }

    await deleteTodo(getUserId(event), event.pathParameters.todoId)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: ''
    }
  }


)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
