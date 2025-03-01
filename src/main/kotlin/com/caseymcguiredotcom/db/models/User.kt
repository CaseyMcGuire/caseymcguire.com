package models

import generated.jooq.tables.pojos.UsersTableRow


data class User(
  private val users: UsersTableRow
) {

  fun getId(): Int = users.id!!

  fun getRole(): String? = users.role

  fun getPassWord(): String = users.password!!

  fun getEmail(): String = users.email!!

  fun isAdmin(): Boolean {
    return getRole() == Role.ADMIN.name
  }
}