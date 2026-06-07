package com.caseymcguiredotcom.routes.configs

import com.caseymcguiredotcom.routes.SinglePageApplicationConfig
import com.caseymcguiredotcom.sparoutecontract.SpaApplicationDefinition
import com.caseymcguiredotcom.sparoutecontract.applications.MovieSpaApplication
import org.springframework.stereotype.Component

@Component
class MovieConfig : SinglePageApplicationConfig {
  override val application: SpaApplicationDefinition = MovieSpaApplication
}
