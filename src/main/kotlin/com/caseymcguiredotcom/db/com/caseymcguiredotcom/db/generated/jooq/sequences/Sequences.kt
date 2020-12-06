/*
 * This file is generated by jOOQ.
 */
package com.caseymcguiredotcom.db.generated.jooq.sequences


import com.caseymcguiredotcom.db.generated.jooq.Public

import org.jooq.Sequence
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType



/**
 * The sequence <code>public.posts_id_seq</code>
 */
val POSTS_ID_SEQ: Sequence<Int> = Internal.createSequence("posts_id_seq", Public.PUBLIC, SQLDataType.INTEGER.nullable(false), null, null, null, null, false, null)

/**
 * The sequence <code>public.users_id_seq</code>
 */
val USERS_ID_SEQ: Sequence<Int> = Internal.createSequence("users_id_seq", Public.PUBLIC, SQLDataType.INTEGER.nullable(false), null, null, null, null, false, null)