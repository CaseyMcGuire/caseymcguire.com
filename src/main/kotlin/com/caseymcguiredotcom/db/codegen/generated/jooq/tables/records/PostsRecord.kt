/*
 * This file is generated by jOOQ.
 */
package generated.jooq.tables.records


import generated.jooq.tables.Posts
import generated.jooq.tables.pojos.PostsTableRow

import java.time.LocalDate

import org.jooq.Record1
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class PostsRecord() : UpdatableRecordImpl<PostsRecord>(Posts.POSTS) {

    open var id: Int?
        set(value): Unit = set(0, value)
        get(): Int? = get(0) as Int?

    open var userId: Int?
        set(value): Unit = set(1, value)
        get(): Int? = get(1) as Int?

    open var title: String?
        set(value): Unit = set(2, value)
        get(): String? = get(2) as String?

    open var contents: String?
        set(value): Unit = set(3, value)
        get(): String? = get(3) as String?

    open var publishedDate: LocalDate?
        set(value): Unit = set(4, value)
        get(): LocalDate? = get(4) as LocalDate?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Int?> = super.key() as Record1<Int?>

    /**
     * Create a detached, initialised PostsRecord
     */
    constructor(id: Int? = null, userId: Int? = null, title: String? = null, contents: String? = null, publishedDate: LocalDate? = null): this() {
        this.id = id
        this.userId = userId
        this.title = title
        this.contents = contents
        this.publishedDate = publishedDate
        resetChangedOnNotNull()
    }

    /**
     * Create a detached, initialised PostsRecord
     */
    constructor(value: PostsTableRow?): this() {
        if (value != null) {
            this.id = value.id
            this.userId = value.userId
            this.title = value.title
            this.contents = value.contents
            this.publishedDate = value.publishedDate
            resetChangedOnNotNull()
        }
    }
}
