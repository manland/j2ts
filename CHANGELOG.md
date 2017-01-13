* `1.3.0` :
  * Integrate code of `java-class-parser` because project is abandoned.
  * close #4 : enum with `_` in name
  * close #2 : add multiple generics (eg : java.util.Map...)
  * close #6 : add a cli, usage `j2ts --help`
* `1.2.0` :
  * add newline to generated files
  * add enum
  * **BREAKING** generate has interface (default)
  * generate `index.ts` exporting all generated files
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