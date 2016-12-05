* `1.2.0` :
  * add newline to generated files
  * add enum
  * **BREAKING** generate has interface (default)
* `1.1.0` :
  * add generics
  * add type :
    * void -> void
    * int, float, long, double -> number
    * boolean -> boolean
    * java.time.LocalDate, java.time.LocalDateTime -> string
    * java.util.Collection, java.util.List, java.util.ArrayList, java.util.Iterator, java.util.Set -> Array
  * remove usage of Object.values to be used by node v6
  * fix bug : methods without new field cause exception
* `1.0.0` : first version