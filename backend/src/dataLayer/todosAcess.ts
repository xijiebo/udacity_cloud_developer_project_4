import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'

const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)

const userIdIndex = process.env.USER_ID_INDEX

export class TodosAccess {

    constructor(
      private readonly docClient: DocumentClient = createDynamoDBClient(),
      private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getTodosPerTodoId(userId: string, todoId: string): Promise<TodoItem> {
        console.log('Getting todo by id ', userId, todoId)
    
        const result = await this.docClient.get({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            }
          }).promise()
    
        const item = result.Item
        return item as TodoItem
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
