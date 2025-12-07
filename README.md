

In order to start:
```
./gradlew bootRun
```

In order to run webpack in development mode:

```
./gradlew webpackDevelopment
```

In order to rebuild relay: 

```
./gradlew buildRelay
```

In order to rebuild database models:
```
./gradlew jooqCodegen
```

In order to regenerate DGS codegen:
```
./gradlew generateJava
```


## Installation
1) Set your environment variables by creating a `.env` file based on `.env.example`. 
2) Set up database by running `./bin/setup_database` from project root
