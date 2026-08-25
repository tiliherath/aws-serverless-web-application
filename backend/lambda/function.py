```python
import json
import boto3
import uuid


# Initialize the DynamoDB resource and Tasks table.
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Tasks")


def response(status_code, body):
    """
    Create a standard HTTP response for API Gateway.
    """
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(body)
    }


def lambda_handler(event, context):
    """
    Main AWS Lambda handler.

    Supports:
        GET    /tasks     - Retrieve all tasks
        POST   /tasks     - Create a new task
        DELETE /tasks     - Delete an existing task
    """

    # Log the incoming API Gateway event for troubleshooting.
    print("EVENT RECEIVED:")
    print(json.dumps(event))

    # Determine the HTTP method from the API Gateway HTTP API event.
    method = event.get(
        "requestContext", {}
    ).get(
        "http", {}
    ).get(
        "method", "GET"
    )

    print("HTTP METHOD:", method)
    print("BODY:", event.get("body"))

    # ---------------------------------------------------------
    # GET /tasks
    # Retrieve all tasks from DynamoDB.
    # ---------------------------------------------------------
    if method == "GET":

        result = table.scan()

        return response(
            200,
            result.get("Items", [])
        )

    # ---------------------------------------------------------
    # POST /tasks
    # Create a new task in DynamoDB.
    # ---------------------------------------------------------
    elif method == "POST":

        body = json.loads(
            event.get("body") or "{}"
        )

        title = body.get("title")

        if not title:
            return response(
                400,
                {
                    "message": "Title is required"
                }
            )

        task = {
            "taskId": str(uuid.uuid4()),
            "title": title,
            "completed": False
        }

        print("CREATING TASK:")
        print(json.dumps(task))

        table.put_item(Item=task)

        return response(
            201,
            task
        )

    # ---------------------------------------------------------
    # DELETE /tasks
    # Delete a task from DynamoDB using taskId.
    # ---------------------------------------------------------
    elif method == "DELETE":

        body = json.loads(
            event.get("body") or "{}"
        )

        task_id = body.get("taskId")

        if not task_id:
            return response(
                400,
                {
                    "message": "taskId is required"
                }
            )

        table.delete_item(
            Key={
                "taskId": task_id
            }
        )

        return response(
            200,
            {
                "message": "Task deleted",
                "taskId": task_id
            }
        )

    # ---------------------------------------------------------
    # Unsupported HTTP method
    # ---------------------------------------------------------
    return response(
        405,
        {
            "message": "Method not allowed"
        }
    )
```

