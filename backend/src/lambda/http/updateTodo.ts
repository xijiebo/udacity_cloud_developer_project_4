
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../helpers/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log("222222222222222222222222: " + (event.pathParameters.todoId))
    console.log("1111111111111111111111111: " + getUserId(event))

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const updateToDoRequest: UpdateTodoRequest = JSON.parse(event.body)

    await updateTodo(getUserId(event), event.pathParameters.todoId, updateToDoRequest)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({  //TODO::: 8675309, need to check this..
        
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  
