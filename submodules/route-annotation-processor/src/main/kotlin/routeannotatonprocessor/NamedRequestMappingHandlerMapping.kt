package routeannotatonprocessor

import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.mvc.method.RequestMappingInfo
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping
import java.lang.reflect.Method

class NamedRequestMappingHandlerMapping : RequestMappingHandlerMapping() {
  override fun getMappingForMethod(method: Method, handlerType: Class<*>): RequestMappingInfo? {
    val namedMapping = method.getAnnotation(ReactRouterGetMapping::class.java)

    if (namedMapping != null) {
      val paths = namedMapping.routes.map { it.path }.toTypedArray()

      return RequestMappingInfo
        .paths(*paths)
        .methods(RequestMethod.GET)
        .build()
    }

    return super.getMappingForMethod(method, handlerType)
  }
}