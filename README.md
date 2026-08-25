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

## ☁️ AWS Services Used

| AWS Service            | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| **Amazon S3**          | Hosts the static web application frontend                   |
| **Amazon CloudFront**  | Provides content delivery and caching                       |
| **Amazon API Gateway** | Provides the HTTP API endpoint                              |
| **AWS Lambda**         | Executes backend application logic without managing servers |
| **Amazon DynamoDB**    | Provides NoSQL database storage                             |

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

* S3 bucket configuration
* CloudFront distribution
* API Gateway configuration
* Lambda function
* DynamoDB table
* Integration between the frontend and backend components

## 📚 What I Learned

This project provided hands-on experience with:

* AWS serverless architecture
* Lambda-based application development
* API Gateway configuration
* DynamoDB fundamentals
* S3 static website hosting
* CloudFront distribution
* IAM permissions
* AWS service integration
* Cloud architecture and scalability
* Cost-aware AWS resource management

## 🚀 Future Improvements

Planned improvements include:

* Infrastructure as Code using AWS CloudFormation
* Automated deployment using GitHub Actions
* Improved API authentication and authorization
* CloudWatch monitoring and logging
* AWS WAF integration
* Custom domain using Amazon Route 53
* CI/CD pipeline
* Automated testing

## 👤 Author

**Thilini Herath**

AWS Certified Solutions Architect – Associate

Interested in Cloud Infrastructure, Linux Administration, AWS, Automation, and DevOps.

