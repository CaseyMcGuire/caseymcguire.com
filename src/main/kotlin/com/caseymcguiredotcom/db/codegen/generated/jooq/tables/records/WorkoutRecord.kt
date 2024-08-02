/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables.records


import generated.jooq.tables.Workout

import java.time.LocalDateTime

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record5
import org.jooq.Row5
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
class WorkoutRecord() : UpdatableRecordImpl<WorkoutRecord>(Workout.WORKOUT), Record5<Int?, Int?, String?, LocalDateTime?, LocalDateTime?> {

    var id: Int?
        set(value) = set(0, value)
        get() = get(0) as Int?

    var userId: Int?
        set(value) = set(1, value)
        get() = get(1) as Int?

    var description: String?
        set(value) = set(2, value)
        get() = get(2) as String?

    var createdAt: LocalDateTime?
        set(value) = set(3, value)
        get() = get(3) as LocalDateTime?

    var updatedAt: LocalDateTime?
        set(value) = set(4, value)
        get() = get(4) as LocalDateTime?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Int?> = super.key() as Record1<Int?>

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row5<Int?, Int?, String?, LocalDateTime?, LocalDateTime?> = super.fieldsRow() as Row5<Int?, Int?, String?, LocalDateTime?, LocalDateTime?>
    override fun valuesRow(): Row5<Int?, Int?, String?, LocalDateTime?, LocalDateTime?> = super.valuesRow() as Row5<Int?, Int?, String?, LocalDateTime?, LocalDateTime?>
    override fun field1(): Field<Int?> = Workout.WORKOUT.ID
    override fun field2(): Field<Int?> = Workout.WORKOUT.USER_ID
    override fun field3(): Field<String?> = Workout.WORKOUT.DESCRIPTION
    override fun field4(): Field<LocalDateTime?> = Workout.WORKOUT.CREATED_AT
    override fun field5(): Field<LocalDateTime?> = Workout.WORKOUT.UPDATED_AT
    override fun component1(): Int? = id
    override fun component2(): Int? = userId
    override fun component3(): String? = description
    override fun component4(): LocalDateTime? = createdAt
    override fun component5(): LocalDateTime? = updatedAt
    override fun value1(): Int? = id
    override fun value2(): Int? = userId
    override fun value3(): String? = description
    override fun value4(): LocalDateTime? = createdAt
    override fun value5(): LocalDateTime? = updatedAt

    override fun value1(value: Int?): WorkoutRecord {
        this.id = value
        return this
    }

    override fun value2(value: Int?): WorkoutRecord {
        this.userId = value
        return this
    }

    override fun value3(value: String?): WorkoutRecord {
        this.description = value
        return this
    }

    override fun value4(value: LocalDateTime?): WorkoutRecord {
        this.createdAt = value
        return this
    }

    override fun value5(value: LocalDateTime?): WorkoutRecord {
        this.updatedAt = value
        return this
    }

    override fun values(value1: Int?, value2: Int?, value3: String?, value4: LocalDateTime?, value5: LocalDateTime?): WorkoutRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        return this
    }

    /**
     * Create a detached, initialised WorkoutRecord
     */
    constructor(id: Int? = null, userId: Int? = null, description: String? = null, createdAt: LocalDateTime? = null, updatedAt: LocalDateTime? = null): this() {
        this.id = id
        this.userId = userId
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
