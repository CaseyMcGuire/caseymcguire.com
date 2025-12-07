package com.caseymcguiredotcom.lib

object LexoRank {
  private const val MIN_CHAR = 'a'
  private const val MAX_CHAR = 'z'

  // Calculate a rank between two existing ranks
  // Insert between "a" and "c" -> "b"
  // Insert between "a" and "b" -> "an"
  fun calculateMiddle(prev: String?, next: String?): String {
    val p = prev ?: (MIN_CHAR.toString())
    val n = next ?: (MAX_CHAR.toString().repeat(p.length + 1))

    var s = ""
    var i = 0
    while (true) {
      val charP = p.getOrElse(i) { MIN_CHAR }
      val charN = n.getOrElse(i) { MAX_CHAR }

      if (charP == charN) {
        s += charP
        i++
        continue
      }

      // Find middle character
      val midChar = ((charP.code + charN.code) / 2).toChar()

      // If we found a distinct middle char, we are done
      if (midChar > charP && midChar < charN) {
        return s + midChar
      }

      // If the middle is the same as P, we need to go deeper (append)
      if (midChar == charP) {
        s += charP
        // Force the next char to be high enough to be distinct
        // effectively appending 'n' (middle of alphabet)
        return s + 'n'
      }

      // Should be unreachable in simple alphabetical appends,
      // but handles edge cases safely
      return s + charP
    }
  }

  // Simplest use case: just put it at the end of the list
  fun calculateNext(last: String?): String {
    if (last == null) return MIN_CHAR.toString()

    val lastChar = last.last()
    return if (lastChar < MAX_CHAR) {
      // "a" -> "b"
      last.dropLast(1) + (lastChar + 1)
    } else {
      // "z" -> "za"
      last + MIN_CHAR
    }
  }
}