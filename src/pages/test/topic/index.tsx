import * as React from "react"
import { Ant } from "../../../components/Ant"

export interface AntProps {
  name: string
  company: string
}

export class _Topics extends React.Component<{}, any> {
  render() {
    return (
        <Ant name="topics" company="mobike" />
    )
  }
}

export const Topics = _Topics