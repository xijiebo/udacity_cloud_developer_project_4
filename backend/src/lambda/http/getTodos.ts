
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
// import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('getTodos event', event)
    //const todos = '...'

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items: []
      })
    }
})

handler.use(
  cors({
    credentials: true
  })
)
