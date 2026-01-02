package com.caseymcguiredotcom.lib

object LexoRank {
  private const val MIN_CHAR = 'a'
  private const val MAX_CHAR = 'z'

  // Calculate a rank between two existing ranks
  // Insert between "a" and "c" -> "b"
  // Insert between "a" and "b" -> "an"
  fun calculateMiddle(prev: String?, next: String?): String {

    val p = prev ?: MIN_CHAR.toString()
    val n = next ?: MAX_CHAR.toString().repeat(p.length + 1)

    var s = StringBuilder()
    var i = 0

    // Flag to track if we are still constrained by the 'next' string.
    // Once we pick a character strictly < charN, the upper bound is lifted.
    var constrainedByNext = true

    while (true) {
      val charP = p.getOrElse(i) { MIN_CHAR }
      val charN = if (constrainedByNext) n.getOrElse(i) { MAX_CHAR } else MAX_CHAR

      if (charP == charN) {
        s.append(charP)
        i++
        continue
      }

      // Calculate middle
      val midChar = ((charP.code + charN.code) / 2).toChar()

      // If we found a gap strictly between P and N
      if (midChar > charP && midChar < charN) {
        s.append(midChar)
        return s.toString()
      }

      // If the middle falls on P (adjacent chars, e.g. 'a' and 'b')
      if (midChar == charP) {
        s.append(charP)
        // We picked 'charP', which is < 'charN'.
        // Therefore, for all subsequent chars, we are strictly < next.
        // We only need to ensure we eventually become > prev.
        constrainedByNext = false
        i++
        continue
      }

      // Handling edge case where midChar might == charN (unlikely with integer division floor)
      s.append(charP)
      i++
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