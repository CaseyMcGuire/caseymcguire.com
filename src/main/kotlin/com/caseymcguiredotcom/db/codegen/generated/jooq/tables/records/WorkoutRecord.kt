/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables.records


import generated.jooq.tables.Workout
import generated.jooq.tables.pojos.WorkoutTableRow

import java.time.LocalDateTime

import org.jooq.Record1
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class WorkoutRecord() : UpdatableRecordImpl<WorkoutRecord>(Workout.WORKOUT) {

    open var id: Int?
        set(value): Unit = set(0, value)
        get(): Int? = get(0) as Int?

    open var userId: Int?
        set(value): Unit = set(1, value)
        get(): Int? = get(1) as Int?

    open var description: String?
        set(value): Unit = set(2, value)
        get(): String? = get(2) as String?

    open var createdAt: LocalDateTime?
        set(value): Unit = set(3, value)
        get(): LocalDateTime? = get(3) as LocalDateTime?

    open var updatedAt: LocalDateTime?
        set(value): Unit = set(4, value)
        get(): LocalDateTime? = get(4) as LocalDateTime?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Int?> = super.key() as Record1<Int?>

    /**
     * Create a detached, initialised WorkoutRecord
     */
    constructor(id: Int? = null, userId: Int? = null, description: String? = null, createdAt: LocalDateTime? = null, updatedAt: LocalDateTime? = null): this() {
        this.id = id
        this.userId = userId
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        resetChangedOnNotNull()
    }

    /**
     * Create a detached, initialised WorkoutRecord
     */
    constructor(value: WorkoutTableRow?): this() {
        if (value != null) {
            this.id = value.id
            this.userId = value.userId
            this.description = value.description
            this.createdAt = value.createdAt
            this.updatedAt = value.updatedAt
            resetChangedOnNotNull()
        }
    }
}
