
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../../auth/utils'
import { getTodosPerUser } from '../../businessLogic/todos'

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('getTodos event', event)

  const todoItems = await getTodosPerUser(getUserId(event));

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: todoItems
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)


