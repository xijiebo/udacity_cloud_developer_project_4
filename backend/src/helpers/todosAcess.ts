import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
//import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const userIdIndex = process.env.USER_ID_INDEX
//const logger = createLogger('TodosAccess')

export class TodosAccess {

    constructor(
      private readonly docClient: DocumentClient = createDynamoDBClient(),
      private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getTodosPerUser(userId: string): Promise<TodoItem[]> {
        console.log('Getting all todos for user ', userId)
    
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName : userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            },
            ScanIndexForward: false
          }).promise()
    
        const items = result.Items
        return items as TodoItem[]
      }
  
    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
      await this.docClient.put({
        TableName: this.todosTable,
        Item: todoItem
      }).promise()
  
      return todoItem
    }

    async deleteTodo(userId: string, todoId: string) {
        await this.docClient.delete({
          TableName: this.todosTable,
          Key: {
              "userId": userId,
              "todoId": todoId
          }
        }).promise()       
      }

      async updateTodo(userId: string, todoId: string, name: string, dueDate: string, done: boolean) {
        await this.docClient.update({
          TableName: this.todosTable,
          Key: {
            "userId": userId,
            "todoId": todoId
          },
          UpdateExpression: "set #nm = :name, dueDate=:dueDate, done=:done",
          ExpressionAttributeValues:{
            ":name": name,
            ":dueDate":dueDate,
            ":done":done
          },
          ExpressionAttributeNames:{
            "#nm": "name"
          }
        }).promise()
    
      }
  }

  function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log('Creating a local DynamoDB instance')
      return new XAWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      })
    }
  
    return new XAWS.DynamoDB.DocumentClient()
  }
