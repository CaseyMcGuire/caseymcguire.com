/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables


import generated.jooq.Public
import generated.jooq.keys.EXERCISE_PKEY
import generated.jooq.tables.records.ExerciseRecord

import kotlin.collections.List

import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Identity
import org.jooq.Name
import org.jooq.Record
import org.jooq.Row2
import org.jooq.Schema
import org.jooq.Table
import org.jooq.TableField
import org.jooq.TableOptions
import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType
import org.jooq.impl.TableImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
class Exercise(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, ExerciseRecord>?,
    aliased: Table<ExerciseRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<ExerciseRecord>(
    alias,
    Public.PUBLIC,
    child,
    path,
    aliased,
    parameters,
    DSL.comment(""),
    TableOptions.table()
) {
    companion object {

        /**
         * The reference instance of <code>public.exercise</code>
         */
        val EXERCISE = Exercise()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<ExerciseRecord> = ExerciseRecord::class.java

    /**
     * The column <code>public.exercise.id</code>.
     */
    val ID: TableField<ExerciseRecord, Int?> = createField(DSL.name("id"), SQLDataType.INTEGER.nullable(false).identity(true), this, "")

    /**
     * The column <code>public.exercise.name</code>.
     */
    val NAME: TableField<ExerciseRecord, String?> = createField(DSL.name("name"), SQLDataType.CLOB.nullable(false), this, "")

    private constructor(alias: Name, aliased: Table<ExerciseRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<ExerciseRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>public.exercise</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>public.exercise</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>public.exercise</code> table reference
     */
    constructor(): this(DSL.name("exercise"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, ExerciseRecord>): this(Internal.createPathAlias(child, key), child, key, EXERCISE, null)
    override fun getSchema(): Schema = Public.PUBLIC
    override fun getIdentity(): Identity<ExerciseRecord, Int?> = super.getIdentity() as Identity<ExerciseRecord, Int?>
    override fun getPrimaryKey(): UniqueKey<ExerciseRecord> = EXERCISE_PKEY
    override fun getKeys(): List<UniqueKey<ExerciseRecord>> = listOf(EXERCISE_PKEY)
    override fun `as`(alias: String): Exercise = Exercise(DSL.name(alias), this)
    override fun `as`(alias: Name): Exercise = Exercise(alias, this)

    /**
     * Rename this table
     */
    override fun rename(name: String): Exercise = Exercise(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): Exercise = Exercise(name, null)

    // -------------------------------------------------------------------------
    // Row2 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row2<Int?, String?> = super.fieldsRow() as Row2<Int?, String?>
}
