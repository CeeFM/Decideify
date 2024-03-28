# Decideify

Tired of wasting precious time endlessly scrolling through options? Introducing Decideify - a revolutionary content recommendation platform designed to revolutionize the way users discover movies, TV shows, books, and music! 

Stop wasting time deciding what content to consume. Start living with Decideify!

## Installation

To run this application locally, follow these steps:

### Prerequisites

- Node.js & npm installed on your machine
- .NET Core SDK installed on your machine
- SQL Server installed locally or connection to a SQL Server instance

### Clone the Repository

```bash
git clone https://github.com/CeeFM/Decideify.git
cd Decideify
```

### Back-end Setup
- Enter/run `dotnet restore` in your terminal to install back-end dependencies
- Open the Decideify.sln file
- Find your local machine in the SQL Server Object Explorer and add a new Database named Decideify
- Create a New Query for the Decideify database, and run the SQL scripts from the SQL folder of Decideify in this order:
  - Decideify_Create_DB.sql	
  - Decideify_Seed_Categories_DB.sql
  - Decideify_Seed_Reactions_DB.sql
  - Decideify_Seed_Users_DB.sql


### Front-end Setup

- cd into Decideify/client
- install front-end dependencies with `npm install`

## Walkthrough
Coming soon!

## Video Walkthrough
https://www.loom.com/share/c27912932e1f4d0bb442f34cb3f8530a?sid=06abbbbd-c8ce-4ef4-9b1d-c849e9af66a3
