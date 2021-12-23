import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentPresignedUrl } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("222222222222222222222222: " + (event.pathParameters.todoId))
    console.log("1111111111111111111111111: " + getUserId(event))

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    
    const singedUrl = createAttachmentPresignedUrl(event.pathParameters.todoId)
    
    console.log("33333333333333333333333: " + singedUrl)
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        singedUrl
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
