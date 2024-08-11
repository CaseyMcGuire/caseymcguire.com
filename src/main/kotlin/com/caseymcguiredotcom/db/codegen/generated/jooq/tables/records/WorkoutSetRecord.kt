/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables.records


import generated.jooq.tables.WorkoutSet

import java.time.LocalDateTime

import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record9
import org.jooq.Row9
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
class WorkoutSetRecord() : UpdatableRecordImpl<WorkoutSetRecord>(WorkoutSet.WORKOUT_SET), Record9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?> {

    var id: Int?
        set(value) = set(0, value)
        get() = get(0) as Int?

    var workoutId: Int?
        set(value) = set(1, value)
        get() = get(1) as Int?

    var description: String?
        set(value) = set(2, value)
        get() = get(2) as String?

    var exerciseType: String?
        set(value) = set(3, value)
        get() = get(3) as String?

    var numReps: Int?
        set(value) = set(4, value)
        get() = get(4) as Int?

    var weight: Int?
        set(value) = set(5, value)
        get() = get(5) as Int?

    var unitOfMass: String?
        set(value) = set(6, value)
        get() = get(6) as String?

    var createdAt: LocalDateTime?
        set(value) = set(7, value)
        get() = get(7) as LocalDateTime?

    var updatedAt: LocalDateTime?
        set(value) = set(8, value)
        get() = get(8) as LocalDateTime?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Int?> = super.key() as Record1<Int?>

    // -------------------------------------------------------------------------
    // Record9 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?> = super.fieldsRow() as Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?>
    override fun valuesRow(): Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?> = super.valuesRow() as Row9<Int?, Int?, String?, String?, Int?, Int?, String?, LocalDateTime?, LocalDateTime?>
    override fun field1(): Field<Int?> = WorkoutSet.WORKOUT_SET.ID
    override fun field2(): Field<Int?> = WorkoutSet.WORKOUT_SET.WORKOUT_ID
    override fun field3(): Field<String?> = WorkoutSet.WORKOUT_SET.DESCRIPTION
    override fun field4(): Field<String?> = WorkoutSet.WORKOUT_SET.EXERCISE_TYPE
    override fun field5(): Field<Int?> = WorkoutSet.WORKOUT_SET.NUM_REPS
    override fun field6(): Field<Int?> = WorkoutSet.WORKOUT_SET.WEIGHT
    override fun field7(): Field<String?> = WorkoutSet.WORKOUT_SET.UNIT_OF_MASS
    override fun field8(): Field<LocalDateTime?> = WorkoutSet.WORKOUT_SET.CREATED_AT
    override fun field9(): Field<LocalDateTime?> = WorkoutSet.WORKOUT_SET.UPDATED_AT
    override fun component1(): Int? = id
    override fun component2(): Int? = workoutId
    override fun component3(): String? = description
    override fun component4(): String? = exerciseType
    override fun component5(): Int? = numReps
    override fun component6(): Int? = weight
    override fun component7(): String? = unitOfMass
    override fun component8(): LocalDateTime? = createdAt
    override fun component9(): LocalDateTime? = updatedAt
    override fun value1(): Int? = id
    override fun value2(): Int? = workoutId
    override fun value3(): String? = description
    override fun value4(): String? = exerciseType
    override fun value5(): Int? = numReps
    override fun value6(): Int? = weight
    override fun value7(): String? = unitOfMass
    override fun value8(): LocalDateTime? = createdAt
    override fun value9(): LocalDateTime? = updatedAt

    override fun value1(value: Int?): WorkoutSetRecord {
        this.id = value
        return this
    }

    override fun value2(value: Int?): WorkoutSetRecord {
        this.workoutId = value
        return this
    }

    override fun value3(value: String?): WorkoutSetRecord {
        this.description = value
        return this
    }

    override fun value4(value: String?): WorkoutSetRecord {
        this.exerciseType = value
        return this
    }

    override fun value5(value: Int?): WorkoutSetRecord {
        this.numReps = value
        return this
    }

    override fun value6(value: Int?): WorkoutSetRecord {
        this.weight = value
        return this
    }

    override fun value7(value: String?): WorkoutSetRecord {
        this.unitOfMass = value
        return this
    }

    override fun value8(value: LocalDateTime?): WorkoutSetRecord {
        this.createdAt = value
        return this
    }

    override fun value9(value: LocalDateTime?): WorkoutSetRecord {
        this.updatedAt = value
        return this
    }

    override fun values(value1: Int?, value2: Int?, value3: String?, value4: String?, value5: Int?, value6: Int?, value7: String?, value8: LocalDateTime?, value9: LocalDateTime?): WorkoutSetRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        this.value6(value6)
        this.value7(value7)
        this.value8(value8)
        this.value9(value9)
        return this
    }

    /**
     * Create a detached, initialised WorkoutSetRecord
     */
    constructor(id: Int? = null, workoutId: Int? = null, description: String? = null, exerciseType: String? = null, numReps: Int? = null, weight: Int? = null, unitOfMass: String? = null, createdAt: LocalDateTime? = null, updatedAt: LocalDateTime? = null): this() {
        this.id = id
        this.workoutId = workoutId
        this.description = description
        this.exerciseType = exerciseType
        this.numReps = numReps
        this.weight = weight
        this.unitOfMass = unitOfMass
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}