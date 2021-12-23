
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("222222222222222222222222: " + (event.pathParameters.todoId))
    console.log("1111111111111111111111111: " + getUserId(event))

    await deleteTodo(getUserId(event), event.pathParameters.todoId)
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({  //TODO::: 8675309, need to check this..
        
      })
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
