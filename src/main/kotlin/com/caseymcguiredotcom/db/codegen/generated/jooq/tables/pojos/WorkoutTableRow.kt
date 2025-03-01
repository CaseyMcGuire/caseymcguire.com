/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables.pojos


import java.io.Serializable
import java.time.LocalDateTime


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
data class WorkoutTableRow(
    val id: Int? = null,
    val userId: Int? = null,
    val description: String? = null,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
): Serializable {

    override fun equals(other: Any?): Boolean {
        if (this === other)
            return true
        if (other == null)
            return false
        if (this::class != other::class)
            return false
        val o: WorkoutTableRow = other as WorkoutTableRow
        if (this.id == null) {
            if (o.id != null)
                return false
        }
        else if (this.id != o.id)
            return false
        if (this.userId == null) {
            if (o.userId != null)
                return false
        }
        else if (this.userId != o.userId)
            return false
        if (this.description == null) {
            if (o.description != null)
                return false
        }
        else if (this.description != o.description)
            return false
        if (this.createdAt == null) {
            if (o.createdAt != null)
                return false
        }
        else if (this.createdAt != o.createdAt)
            return false
        if (this.updatedAt == null) {
            if (o.updatedAt != null)
                return false
        }
        else if (this.updatedAt != o.updatedAt)
            return false
        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var result = 1
        result = prime * result + (if (this.id == null) 0 else this.id.hashCode())
        result = prime * result + (if (this.userId == null) 0 else this.userId.hashCode())
        result = prime * result + (if (this.description == null) 0 else this.description.hashCode())
        result = prime * result + (if (this.createdAt == null) 0 else this.createdAt.hashCode())
        result = prime * result + (if (this.updatedAt == null) 0 else this.updatedAt.hashCode())
        return result
    }

    override fun toString(): String {
        val sb = StringBuilder("WorkoutTableRow (")

        sb.append(id)
        sb.append(", ").append(userId)
        sb.append(", ").append(description)
        sb.append(", ").append(createdAt)
        sb.append(", ").append(updatedAt)

        sb.append(")")
        return sb.toString()
    }
}
