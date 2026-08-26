# AWS Serverless Web Application

A serverless web application built on AWS using **Amazon S3, Amazon CloudFront, Amazon API Gateway, AWS Lambda, and Amazon DynamoDB**.

## 📌 Project Overview

This project demonstrates the design and implementation of a scalable, highly available serverless web application using managed AWS services.

The application separates the frontend presentation layer from the backend API and database layers, eliminating the need to manage traditional web servers.

## 🏗️ Architecture

```text
                         Internet
                            |
                            v
                    +---------------+
                    |  CloudFront   |
                    +-------+-------+
                            |
                    +-------+-------+
                    |               |
                    v               v
              +----------+   +-------------+
              |    S3    |   | API Gateway |
              | Frontend |   +------+------+
              +----------+          |
                                    v
                              +-----------+
                              |  Lambda   |
                              +-----+-----+
                                    |
                                    v
                              +-----------+
                              | DynamoDB  |
                              +-----------+
```
## CI/CD Architecture

```text
Developer
    |
    | git push
    v
GitHub Repository
    |
    v
GitHub Actions
    |
    | OIDC Authentication
    v
AWS IAM Role
    |
    | Temporary Credentials
    v
Amazon S3
    |
    v
Frontend Deployment
```
## ☁️ AWS Services Used

| AWS Service            | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| **Amazon S3**          | Hosts the static web application frontend                   |
| **Amazon CloudFront**  | Provides content delivery and caching                       |
| **Amazon API Gateway** | Provides the HTTP API endpoint                              |
| **AWS Lambda**         | Executes backend application logic without managing servers |
| **Amazon DynamoDB**    | Provides NoSQL database storage                             |
| **AWS IAM**            | GitHub OIDC Authentication                                  |

## 🔄 Application Flow

1. A user accesses the web application.
2. **Amazon CloudFront** receives the request and delivers the frontend content.
3. Static frontend files are hosted in **Amazon S3**.
4. Application requests requiring backend processing are sent to **Amazon API Gateway**.
5. API Gateway invokes the appropriate **AWS Lambda** function.
6. Lambda processes the request and interacts with **Amazon DynamoDB**.
7. DynamoDB returns the required data to Lambda.
8. Lambda returns the response through API Gateway to the frontend.

## 🔐 Security Considerations

The architecture uses managed AWS services to reduce infrastructure management overhead.

Security considerations include:

* IAM-based access control
* Least-privilege permissions
* HTTPS communication
* Controlled API access
* S3 access configuration
* CloudFront distribution controls
* DynamoDB access through Lambda rather than direct frontend access

## 📈 Scalability

The application uses AWS serverless services that can automatically scale based on demand.

Key benefits include:

* No web servers to manage
* Automatic Lambda scaling
* Managed API infrastructure
* Highly scalable DynamoDB storage
* CloudFront global content delivery
* S3 durable object storage

## 💰 Cost Optimization

Serverless architecture can reduce infrastructure costs because resources are generally charged based on usage rather than requiring continuously running application servers.

For development and learning environments, unused AWS resources should be deleted when testing is complete.

## 🛠️ Implementation

The initial version of this project was provisioned and configured using the **AWS Management Console**.

The implementation included:

### Amazon S3
Amazon S3 is used to host the static frontend application.
The frontend contains the HTML, CSS, and JavaScript required by the application.

### Amazon API Gateway
API Gateway provides the REST API interface between the frontend and the Lambda backend.
The API supports:
 * Method	Endpoint	Description
 * GET	/tasks	Retrieve all tasks
 * POST	/tasks	Create a new task
 * DELETE	/tasks	Delete a task

### AWS Lambda
The Lambda function is written in Python.
* Receives API Gateway requests
* Determines the HTTP method
* Processes task operations
* Reads and writes data in DynamoDB
* Generates unique task IDs
* Returns JSON responses
* Provides CORS headers

### Amazon DynamoDB
The application uses a DynamoDB

### Frontend
The frontend is a static web application hosted in Amazon S3.
It communicates with the backend through the API Gateway endpoint.
The frontend supports task operations such as:
  * Creating tasks
  * Viewing tasks
  * Deleting tasks
  * GitHub Actions CI/CD

GitHub Actions is used to automatically deploy frontend changes to Amazon S3.
The workflow is triggered when changes are pushed to the main branch affecting:
```text
  frontend/**
  .github/workflows/deploy-frontend.yml
```
### Deployment Process
  * Developer pushes code to GitHub.
  * GitHub Actions starts the deployment workflow.
  * GitHub Actions checks out the repository.
  * GitHub authenticates to AWS using OpenID Connect.
  * AWS IAM validates the GitHub identity.
  * GitHub Actions assumes the AWS IAM role.
  * The frontend files are synchronized to Amazon S3.

  The deployment uses:
```text
  aws s3 sync frontend/ s3://<S3-BUCKET>/
```
* S3 bucket configuration
* CloudFront distribution
* API Gateway configuration
* Lambda function
* DynamoDB table
* Integration between the frontend and backend components

### GitHub OIDC Authentication
The project uses GitHub OpenID Connect instead of storing long-lived AWS access keys in GitHub.
The GitHub Actions workflow assumes the following IAM role:
GitHubActionsServerlessFrontendDeploy

The authentication flow is:
``` text
GitHub Actions
      |
      | OIDC Token
      v
GitHub OIDC Provider
      |
      v
AWS IAM
      |
      | AssumeRoleWithWebIdentity
      v
GitHubActionsServerlessFrontendDeploy
      |
      v
Amazon S3
```
This provides temporary AWS credentials for the deployment process.

### CloudFront
Amazon CloudFront is included in the target architecture for:
    Global content delivery
    HTTPS
    Edge caching
    Improved frontend performance

CloudFront was not deployed in the current implementation because of AWS account/service limitations encountered during development.
The current working implementation therefore uses Amazon S3 directly for frontend hosting.

CloudFront remains part of the planned production architecture.

### Project Structure
```text
aws-serverless-web-application/
|
+-- architecture/
|   +-- aws-serverless-architecture.png
|
+-- frontend/
|   +-- index.html
|
+-- backend/
|   +-- lambda_function.py
|
+-- .github/
|   +-- workflows/
|       +-- deploy-frontend.yml
|
+-- README.md
```

## 📚 Technologies
* AWS Lambda.
* Amazon API Gateway.
* Amazon DynamoDB.
* Amazon S3.
* Amazon CloudFront.
* AWS IAM.
* GitHub Actions.
* GitHub OIDC.
* Python.
* HTML.
* JSON.
## Key Skills Demonstrated
* Serverless architecture.
* AWS cloud services.
* REST API development.
* AWS Lambda development.
* DynamoDB operations.
* Amazon S3 static website hosting.
* IAM security.
* GitHub Actions CI/CD.
* GitHub OIDC authentication.
* Temporary AWS credentials.
* Cloud architecture documentation.
* AWS and GitHub integration.
* Cloud troubleshooting.
## Project Status
### Completed
* AWS serverless architecture.
* Amazon S3 frontend.
* API Gateway.
* AWS Lambda.
* DynamoDB.
* GET /tasks.
* POST /tasks.
* DELETE /tasks.
* GitHub repository.
* Architecture diagram.
* GitHub Actions workflow.
* GitHub OIDC authentication.
* IAM role for GitHub Actions.
* Automated S3 deployment.
* CI/CD deployment test.
### Planned
* Amazon CloudFront distribution.
* Production HTTPS configuration.
* Additional application features.
### Lessons Learned
This project provided hands-on experience with:
*  Designing serverless AWS architectures.
*  Building REST APIs with API Gateway and Lambda.
*  Using DynamoDB for serverless data storage.
*  Hosting static applications with Amazon S3.
*  Implementing GitHub Actions CI/CD.
*  Configuring GitHub OIDC with AWS IAM.
*  Troubleshooting IAM trust relationships.
*  Using temporary AWS credentials instead of long-lived access keys.
*  Designing cloud architectures with future scalability in mind.

## 👤 Author

**Thilini Herath**

AWS Certified Solutions Architect – Associate

Interested in Cloud Infrastructure, Linux Administration, AWS, Automation, and DevOps.

