import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const Swagger = ({url}) => <SwaggerUI url={url} />

export default Swagger