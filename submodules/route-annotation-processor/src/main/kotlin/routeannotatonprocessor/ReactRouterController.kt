package routeannotatonprocessor

@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.CLASS)
annotation class ReactRouterController(val value: String)