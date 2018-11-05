import * as React from "react"
import { Ant } from "../../../components/Ant"

export interface AntProps {
  name: string
  company: string
}

export class _About extends React.Component<AntProps, {}> {
  render() {
    return (
      <Ant name="about1111" company="mobike" />
    )
  }
}
export const About = _About