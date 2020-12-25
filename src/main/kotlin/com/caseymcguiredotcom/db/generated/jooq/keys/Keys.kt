/*
 * This file is generated by jOOQ.
 */
package generated.jooq.keys


import generated.jooq.tables.Posts
import generated.jooq.tables.Users
import generated.jooq.tables.records.PostsRecord
import generated.jooq.tables.records.UsersRecord

import org.jooq.ForeignKey
import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal



// -------------------------------------------------------------------------
// UNIQUE and PRIMARY KEY definitions
// -------------------------------------------------------------------------

val POSTS_PKEY: UniqueKey<PostsRecord> = Internal.createUniqueKey(Posts.POSTS, DSL.name("posts_pkey"), arrayOf(Posts.POSTS.ID), true)
val USERS_EMAIL_KEY: UniqueKey<UsersRecord> = Internal.createUniqueKey(Users.USERS, DSL.name("users_email_key"), arrayOf(Users.USERS.EMAIL), true)
val USERS_PKEY: UniqueKey<UsersRecord> = Internal.createUniqueKey(Users.USERS, DSL.name("users_pkey"), arrayOf(Users.USERS.ID), true)

// -------------------------------------------------------------------------
// FOREIGN KEY definitions
// -------------------------------------------------------------------------

val POSTS__FK_ID: ForeignKey<PostsRecord, UsersRecord> = Internal.createForeignKey(Posts.POSTS, DSL.name("fk_id"), arrayOf(Posts.POSTS.USER_ID), generated.jooq.keys.USERS_PKEY, arrayOf(Users.USERS.ID), true)
