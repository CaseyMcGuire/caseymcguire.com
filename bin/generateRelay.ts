import getGraphqlSchema from "./createCombinedGraphQLSchema";
import fs from "fs";
import { execSync } from 'child_process'



const existingSchemaFile = 'src/main/resources/relay/schema.graphql'

const combinedSchema = getGraphqlSchema()
fs.writeFileSync(existingSchemaFile, combinedSchema)
execSync("relay-compiler")
fs.writeFileSync(existingSchemaFile, "\"\"\"\n" + combinedSchema + "\n\"\"\"")