import getGraphqlSchema from "./getCombinedGraphQLSchema";
import fs from "fs";
import { execSync } from 'child_process'

const existingSchemaFile = 'src/main/resources/relay/schema.graphql'

try {
  const combinedSchema = getGraphqlSchema()
  fs.writeFileSync(existingSchemaFile, combinedSchema)
  execSync("relay-compiler")
} catch (e) {
  console.error("Relay compilation failed with error: " + e)
}
finally {
  if (fs.existsSync(existingSchemaFile)) {
    fs.unlinkSync(existingSchemaFile)
  }
}
