
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getUserId } from '../../auth/utils'

//import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils';
// import { createTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("createTodo event: ", event)

    console.log('UserId:' + getUserId(event));

    //const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item

    return undefined
  })

handler.use(
  cors({
    credentials: true
  })
)

