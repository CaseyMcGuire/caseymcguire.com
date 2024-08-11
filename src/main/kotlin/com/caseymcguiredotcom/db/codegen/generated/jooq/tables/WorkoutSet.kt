/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables


import generated.jooq.Public
import generated.jooq.keys.WORKOUT_SET_PKEY
import generated.jooq.keys.WORKOUT_SET__FK_WORKOUT
import generated.jooq.tables.records.WorkoutSetRecord

import java.time.LocalDateTime

import kotlin.collections.List

import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Identity
import org.jooq.Name
import org.jooq.Record
import org.jooq.Row9
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
class WorkoutSet(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, WorkoutSetRecord>?,
    aliased: Table<WorkoutSetRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<WorkoutSetRecord>(
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
         * The reference instance of <code>public.workout_set</code>
         */
        val WORKOUT_SET = WorkoutSet()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<WorkoutSetRecord> = WorkoutSetRecord::class.java

    /**
     * The column <code>public.workout_set.id</code>.
     */
    val ID: TableField<WorkoutSetRecord, Int?> = createField(DSL.name("id"), SQLDataType.INTEGER.nullable(false).identity(true), this, "")

    /**
     * The column <code>public.workout_set.workout_id</code>.
     */
    val WORKOUT_ID: TableField<WorkoutSetRecord, Int?> = createField(DSL.name("workout_id"), SQLDataType.INTEGER.nullable(false), this, "")

    /**
     * The column <code>public.workout_set.description</code>.
     */
    val DESCRIPTION: TableField<WorkoutSetRecord, String?> = createField(DSL.name("description"), SQLDataType.CLOB, this, "")

    /**
     * The column <code>public.workout_set.exercise_type</code>.
     */
    val EXERCISE_TYPE: TableField<WorkoutSetRecord, String?> = createField(DSL.name("exercise_type"), SQLDataType.CLOB.nullable(false), this, "")

    /**
     * The column <code>public.workout_set.num_reps</code>.
     */
    val NUM_REPS: TableField<WorkoutSetRecord, Int?> = createField(DSL.name("num_reps"), SQLDataType.INTEGER.nullable(false), this, "")

    /**
     * The column <code>public.workout_set.weight</code>.
     */
    val WEIGHT: TableField<WorkoutSetRecord, Int?> = createField(DSL.name("weight"), SQLDataType.INTEGER.nullable(false), this, "")

    /**
     * The column <code>public.workout_set.unit_of_mass</code>.
     */
    val UNIT_OF_MASS: TableField<WorkoutSetRecord, String?> = createField(DSL.name("unit_of_mass"), SQLDataType.VARCHAR(50).nullable(false), this, "")

    /**
     * The column <code>public.workout_set.created_at</code>.
     */
    val CREATED_AT: TableField<WorkoutSetRecord, LocalDateTime?> = createField(DSL.name("created_at"), SQLDataType.LOCALDATETIME(6).nullable(false), this, "")

    /**
     * The column <code>public.workout_set.updated_at</code>.
     */
    val UPDATED_AT: TableField<WorkoutSetRecord, LocalDateTime?> = createField(DSL.name("updated_at"), SQLDataType.LOCALDATETIME(6).nullable(false), this, "")

    private constructor(alias: Name, aliased: Table<WorkoutSetRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<WorkoutSetRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>public.workout_set</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>public.workout_set</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>public.workout_set</code> table reference
     */
    constructor(): this(DSL.name("workout_set"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, WorkoutSetRecord>): this(Internal.createPathAlias(child, key), child, key, WORKOUT_SET, null)
    override fun getSchema(): Schema = Public.PUBLIC
    override fun getIdentity(): Identity<WorkoutSetRecord, Int?> = super.getIdentity() as Identity<WorkoutSetRecord, Int?>
    override fun getPrimaryKey(): UniqueKey<WorkoutSetRecord> = WORKOUT_SET_PKEY
    override fun getKeys(): List<UniqueKey<WorkoutSetRecord>> = listOf(WORKOUT_SET_PKEY)
    override fun getReferences(): List<ForeignKey<WorkoutSetRecord, *>> = listOf(WORKOUT_SET__FK_WORKOUT)
    fun workout(): Workout = Workout(this, WORKOUT_SET__FK_WORKOUT)
    override fun `as`(alias: String): WorkoutSet = WorkoutSet(DSL.name(alias), this)
    override fun `as`(alias: Name): WorkoutSet = WorkoutSet(alias, this)

    /**
     * Rename this table
     */
    override fun rename(name: String): WorkoutSet = WorkoutSet(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): WorkoutSet = WorkoutSet(name, null)

    // -------------------------------------------------------------------------
    // Row9 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?> = super.fieldsRow() as Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?>
}