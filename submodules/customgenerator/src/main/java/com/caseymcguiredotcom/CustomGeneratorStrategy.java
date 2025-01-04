package com.caseymcguiredotcom;

import org.jooq.codegen.DefaultGeneratorStrategy;
import org.jooq.meta.Definition;

public class CustomGeneratorStrategy extends DefaultGeneratorStrategy {

    @Override
    public String getJavaClassName(Definition definition, Mode mode) {
        if (mode == Mode.POJO) {
            // Add "TableRow" suffix to POJOs
            return super.getJavaClassName(definition, mode) + "TableRow";
        }
        return super.getJavaClassName(definition, mode);
    }
}
